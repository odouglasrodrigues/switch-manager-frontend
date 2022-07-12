<template>

  <q-dialog v-model="cardPortStatus" persistent>
    <q-card style="width: 100%; min-width: 50vw;  ">
      <q-card-section>
        <div class="text-h6">Status - {{interfaceName}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="loadingStatus" class="loading" align="center">
          <q-spinner-pie color="primary" size="6em" />
          <h4>Carregando...</h4>
        </div>

        <div v-else>
          <span v-if="portStatus.interfaceStatus == 'on'" class="port-status">Porta Ligada: </span>
          <span v-else class="port-status">Porta Desligada: </span>
          <q-btn v-if="loadingStatusPortChange" color="blue" label="Carregando... ">
            <q-spinner-gears left color="white" size="1em" />
          </q-btn>
          <q-btn v-else-if="portStatus.interfaceStatus == 'on'" color="red" label="Desligar"
            @click="TurnOnOffInterface('turnoff')" />
          <q-btn v-else-if="portStatus.interfaceStatus == 'off'" color="green" label="Ligar"
            @click="TurnOnOffInterface('turnon')" />
        </div>

      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="CloseCardPortStatus" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { PostData } from '../methods/ApiCommunication'
export default defineComponent({
  name: 'PortStatus',
  props: {
    cardPortStatus: Boolean,
    loadingStatus: Boolean,
    portStatus: Object,
    interfaceName: String,
    sw: Object
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
    CloseCardPortStatus() {
      this.$emit('CloseCardPortStatus')
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
