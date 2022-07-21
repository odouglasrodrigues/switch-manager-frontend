<template>

  <q-dialog v-model="cardTransceiverStatus" persistent>
    <q-card style="max-width: 70vw;">
      <q-card-section>
        <div class="text-h6">Sinal - {{ interfaceName }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="loadingTransceiverStatus" class="loading" align="center">
          <q-spinner-pie color="primary" size="6em" />
          <h4>Carregando...</h4>
        </div>

        <div v-else-if="transceiverIsPresent == 'no'" class="fit row  justify-center items-center content-center">
          <div class="text-h6">
            <q-icon name="warning" color="yellow" />
            SFP Não está conectado!
          </div>

        </div>

        <div v-else class="q-pa-md row items-start q-gutter-md">
          <h2>SFP Presente</h2>

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

    }
  }
  ,
  methods: {
    CloseCardTransceiver() {
      this.$emit('CloseCardTransceiver')
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
    this.$socket.emit('criado', 'Deu certo!')
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
