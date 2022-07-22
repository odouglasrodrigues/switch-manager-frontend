<template>

  <q-dialog v-model="cardTransceiverStatus" persistent>
    <q-card style="max-width: 90vw;">
      <q-card-section>
        <div style="font-size:clamp(1.2em, 5vw, 2em);">Sinal - {{ interfaceName }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="cardLoading" class="loading" align="center">
          <q-spinner-pie color="primary" size="8vw" />
          <div style="width: 50vw; font-size: 5vw;">
            Carregando...
          </div>
        </div>

        <div v-else-if="transceiverIsPresent == 'no'" class="fit row  justify-center items-center content-center">
          <div class="text-h6">
            <q-icon name="warning" color="yellow" />
            SFP Não está conectado!
          </div>

        </div>

        <div v-else class="q-pa-md row justify-center q-gutter-md">

          <q-card :class="cardSinalBackgroud + ' text-black'">
            <q-card-section style="font-weight: bold;">
              <div style="font-size:clamp(1em, 5vw, 1.5em);">RX - Sinal</div>
            </q-card-section>
            <q-separator inset color="white" />
            <q-card-section>
              Sinal: {{ rx.sinal }}
            </q-card-section>
            <q-card-section>
              Status: {{ cardSinalStatus }}
            </q-card-section>
            <q-card-section>
              Limite: {{ rx.low }}
            </q-card-section>
          </q-card>

        </div>

      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="CloseCardTransceiver" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { PostData } from '../methods/ApiCommunication'
export default defineComponent({
  name: 'TransceiverMonitoring',
  props: {
    cardTransceiverStatus: Boolean,
    loadingTransceiverStatus: Boolean,
    transceiverIsPresent: String,
    interfaceName: String,
  },
  setup() {
    return {
      tab: ref('1ge'),
      splitterModel: ref(20),
      loadingStatusPortChange: ref(false)
    }
  },
  data() {
    return {
      cardLoading: this.loadingTransceiverStatus,
      rx: {},
      tx: {},
      cardSinalBackgroud: '',
      cardSinalStatus: ''
    }
  }
  ,
  methods: {
    CloseCardTransceiver() {
      this.$emit('CloseCardTransceiver')
      this.cardLoading = true
    },
    cardColor(status) {
      if (status == "UP") {
        return 'green'
      }
      return 'red'
    },
    async TurnOnOffInterface(turnONOFF) {
      try {
        this.loadingStatusPortChange = true
        const tokenJwt = this.$q.localStorage.getItem('jwt')

        const datapost = {
          ip: this.sw.ip, user: this.sw.user, password: this.sw.password, port: this.sw.port, interface: this.interfaceName, turnonoff: turnONOFF
        }
        const response = await PostData('/turnonoffinterface', JSON.stringify(datapost), tokenJwt)
        console.log(response.dados)
        this.portStatus.interfaceStatus = response.dados.interfaceStatus
        this.loadingStatusPortChange = false

      } catch (error) {
        console.log('erro', error)
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
          icon: 'error',
        });
      }
    },
  },
  async created() {
    this.$socket.on('RunningMonitoring', msg => {
      this.cardLoading = false
      this.rx = msg.rx
      this.tx = msg.tx

      if (msg.rx.sinal < msg.rx.low) {
        this.cardSinalBackgroud = 'bg-red'
        this.cardSinalStatus = 'Péssimo'
      } else if (msg.rx.sinal >= (msg.rx.low + 6)){
        this.cardSinalBackgroud = 'bg-green'
        this.cardSinalStatus = 'Ótimo'
      } else if (msg.rx.sinal >= (msg.rx.low + 4))  {
        this.cardSinalBackgroud = 'bg-yellow'
        this.cardSinalStatus = 'Aceitável'
      } else if (msg.rx.sinal >= (msg.rx.low + 2)) {
        this.cardSinalBackgroud = 'bg-orange'
        this.cardSinalStatus = 'Ruim'


      }
    })
  },
  computed: {
  }
})
</script>

<style>
.text-subtitle4 {
  font-size: .9em;
}

.btn-action {
  font-size: .9em;
}
</style>
