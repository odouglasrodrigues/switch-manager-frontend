<template>

  <q-dialog v-model="cardPortStatus" persistent>
    <q-card style="width: 30vw;">
      <q-card-section>
        <div class="text-h6">Status - {{ interfaceName }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="loadingStatus" class="loading" align="center">
          <q-spinner-pie color="primary" size="6em" />
          <h4>Carregando...</h4>
        </div>

        <div v-else class="q-pa-md row justify-center q-gutter-md">
          <div class="port-status">
            <q-btn v-if="loadingStatusPortChange" color="blue" label="Carregando... ">
              <q-spinner-gears left color="white" size="1em" />
            </q-btn>
            <q-btn v-else-if="portStatus.interfaceStatus == 'on'" color="red" label="DESLIGAR PORTA"
              @click="TurnOnOffInterface('turnoff')" />
            <q-btn v-else-if="portStatus.interfaceStatus == 'off'" color="green" label="LIGAR PORTA"
              @click="TurnOnOffInterface('turnon')" />
          </div>
          <div class="port-status">
            <q-btn color="primary" label="MONITORAR SINAL" @click="MonitorarSinal" />
          </div>

        </div>

      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="CloseCardPortStatus" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <TransceiverMonitoring :cardTransceiverStatus="cardTransceiverStatus" :interfaceName="interfaceName"
    :transceiverIsPresent="portStatus.transceiverIsPresent" v-on:CloseCardTransceiver="cardTransceiverStatus = false" />

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { PostData } from '../methods/ApiCommunication'
import TransceiverMonitoring from './TransceiverMonitoring.vue';
export default defineComponent({
  name: "PortStatus",
  props: {
    cardPortStatus: Boolean,
    loadingStatus: Boolean,
    portStatus: Object,
    interfaceName: String,
    sw: Object
  },
  setup() {
    return {
      tab: ref("1ge"),
      splitterModel: ref(20),
      loadingStatusPortChange: ref(false),
      cardTransceiverStatus: ref(false)
    };
  },
  data() {
    return {};
  },
  methods: {
    CloseCardPortStatus() {
      this.$emit("CloseCardPortStatus");
    },
    async MonitorarSinal() {
      try {
        this.cardTransceiverStatus = true
        if(this.portStatus.transceiverIsPresent=='yes'){
          this.$socket.emit('StartMonitoring', `{ip:${this.sw.ip}, user:${this.sw.user}, pass:${this.sw.password}, port:${this.sw.port}, interface:${this.interfaceName}, tempo:10}`)
        }
      }
      catch (error) {

      }
    },
  },
  async created() {
    this.$socket.emit("criado", "Deu certo!");
  },
  computed: {},
  components: { TransceiverMonitoring }
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
