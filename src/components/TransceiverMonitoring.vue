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
  },
  async created() {
    this.$socket.on('RunningMonitoring', msg => {
      this.cardLoading = false
      this.rx = msg.msg.rx
      this.tx = msg.msg.tx


      if (msg.msg.rx.sinal < msg.msg.rx.low) {
        this.cardSinalBackgroud = 'bg-red'
        this.cardSinalStatus = 'Péssimo'
      } else if (msg.msg.rx.sinal >= (msg.msg.rx.low + 6)) {
        this.cardSinalBackgroud = 'bg-green'
        this.cardSinalStatus = 'Ótimo'
      } else if (msg.msg.rx.sinal >= (msg.msg.rx.low + 4)) {
        this.cardSinalBackgroud = 'bg-yellow'
        this.cardSinalStatus = 'Aceitável'
      } else if (msg.msg.rx.sinal >= (msg.msg.rx.low + 2)) {
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
