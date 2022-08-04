<template>

  <div class="container fit row justify-start items-start content-start">
    <q-card v-for="sw in switches" :key="sw.ip" class="my-card bg-green text-white" :style="ScreenWidth">
      <q-card-section>
        <div style="font-size:clamp(1.1em, 3vw, 1.5em);">{{ sw.name }}</div>
        <div style="font-size:clamp(1em, 2vw, 1.2em);">IP: {{ sw.ip }}</div>
      </q-card-section>
      <q-separator dark />
      <q-card-actions vertical>
        <q-btn flat @click="selectedSwitch = sw; cardPortList = !cardPortList; GetPortList(sw)">Listar Portas</q-btn>
      </q-card-actions>
    </q-card>
    <PortsList :cardPortList="cardPortList" :sw="selectedSwitch" :loadingPorts="loadingPorts" :interfaces="interfaces"
      v-on:CloseCardPortsList="cardPortList = !cardPortList" />

  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { GetData, PostData } from '../methods/ApiCommunication'
import PortsList from 'src/components/PortsList.vue';
export default defineComponent({
  name: "SwitchesList",
  setup() {
    return {
      cardPortList: ref(false),
      loadingPorts: ref(false)
    };
  },
  data() {
    return {
      switches: [],
      selectedSwitch: null
    };
  },
  methods: {
    async GetSwitchList() {
      try {
        const tokenJwt = this.$q.localStorage.getItem("jwt");
        const response = await GetData("/listdevices", tokenJwt);
        const { SwitchList } = response.dados;
        this.switches = SwitchList;
      }
      catch (error) {
        swal({
          title: "Oops!",
          text: "Alguma coisa deu errado aqui!",
          icon: "error",
        });
      }
    },
    async GetPortList(sw) {
      try {
        this.loadingPorts = true
        const tokenJwt = this.$q.localStorage.getItem('jwt')

        const datapost = {
          ip: sw.ip, user: sw.user, password: sw.password, port: sw.port
        }
        const response = await PostData('/listinterfaces', JSON.stringify(datapost), tokenJwt)
        const { interfaces } = response.dados
        this.interfaces = interfaces
        this.loadingPorts = false

        if (response.status == 'erro') {
          this.loadingPorts = false
          this.cardPortList = !this.cardPortList
          this.$q.notify({
            type: 'negative',
            message: response.message
          })
          return
        }

      } catch (error) {
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
          icon: 'error',
        });
      }
    },
  },
  computed:{
    ScreenWidth : function(){
      if(this.$q.screen.xs){
        return "width: 40vw; margin:1em;"
      }
      if(this.$q.screen.sm){
        return "width: 28vw; margin:1em;"
      }
      if(this.$q.screen.md){
        return "width: 20vw; margin:1em;"
      }
    }
  },
  async created() {
    await this.GetSwitchList();
  },
  components: { PortsList }
})
</script>

<style>
.container {
  min-height: 100vh;
  padding-top: 1em;
  padding-left: 1.3em;



}
</style>
