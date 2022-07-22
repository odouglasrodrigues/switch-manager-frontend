<template>

  <q-dialog v-model="cardPortList" persistent>
    <q-card style=" max-width: 90vw; max-height: 90vh; ">
      <q-card-section>
        <div style="font-size:clamp(1.2em, 5vw, 2em);">{{ sw.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="loadingPorts" class="loading" align="center">
          <q-spinner-pie color="primary" size="8vw" />
          <div style="width: 50vw; font-size: 5vw;">
            Carregando...
          </div>
        </div>

        <div v-else>
          <q-splitter v-model="splitterModel" style="height: 70vh">

            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-teal">
                <q-tab name="1ge" icon="import_export" label="1 GB" />
                <q-tab name="10ge" icon="import_export" label="10 GB" />
                <q-tab name="40ge" icon="import_export" label="40 GB" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                transition-next="jump-up">
                <q-tab-panel name="1ge">
                  <div class="q-mb-md" style="font-size:clamp(1.5em, 6vw, 2em);">Portas de 1 Gbps</div>

                  <div class="q-pa-md row items-start q-gutter-md">
                    <q-card v-for="port in geInterfaces" :key="port" class="my-card text-white"
                      :style="`background: ${cardColor(port[Object.keys(port)[0]].status)}; max-width: 40vw;`">
                      <q-card-section>
                        <div class="text-h7">{{ Object.keys(port)[0] }}</div>
                        <div class="text-subtitle4">Descrição: {{ port[Object.keys(port)[0]].description }}</div>
                      </q-card-section>
                      <q-separator dark />
                      <q-card-actions vertical>
                        <q-btn flat @click="cardPortStatus = !cardPortStatus; GetPortStatus(Object.keys(port)[0])">
                          Status
                        </q-btn>
                        <PortStatus :cardPortStatus="cardPortStatus"
                          v-on:CloseCardPortStatus='cardPortStatus = !cardPortStatus' :loadingStatus="loadingStatus"
                          :portStatus="interfaceStatus" :interfaceName="interfacename" :sw="sw" />
                      </q-card-actions>
                    </q-card>
                  </div>

                </q-tab-panel>

                <q-tab-panel name="10ge">
                  <div class="q-mb-md" style="font-size:clamp(1.5em, 6vw, 2em);">Portas de 10 Gbps</div>

                  <div class="q-pa-md row items-start q-gutter-md">
                    <q-card v-for="port in XgeInterfaces" :key="Object.keys(port)[0]" class="my-card text-white"
                      :style="`background: ${cardColor(port[Object.keys(port)[0]].status)}; max-width: 40vw;`">
                      <q-card-section>
                        <div class="text-h7">{{ Object.keys(port)[0] }}</div>
                        <div class="text-subtitle4">Descrição: {{ port[Object.keys(port)[0]].description }}</div>
                      </q-card-section>
                      <q-separator dark />
                      <q-card-actions vertical>
                        <q-btn flat @click="cardPortStatus = !cardPortStatus; GetPortStatus(Object.keys(port)[0])">
                          Status
                        </q-btn>
                        <PortStatus :cardPortStatus="cardPortStatus"
                          v-on:CloseCardPortStatus='cardPortStatus = !cardPortStatus' :loadingStatus="loadingStatus"
                          :portStatus="interfaceStatus" :interfaceName="interfacename" :sw="sw" />
                      </q-card-actions>
                    </q-card>
                  </div>


                </q-tab-panel>

                <q-tab-panel name="40ge">
                  <div class="q-mb-md" style="font-size:clamp(1.5em, 6vw, 2em);">Portas de 40 Gbps</div>

                  <div class="q-pa-md row items-start q-gutter-md">
                    <q-card v-for="port in ge40Interfaces" :key="port" class="my-card text-white"
                      :style="`background: ${cardColor(port[Object.keys(port)[0]].status)}; max-width: 40vw;`">
                      <q-card-section>
                        <div class="text-h7">{{ Object.keys(port)[0] }}</div>
                        <div class="text-subtitle4">Descrição: {{ port[Object.keys(port)[0]].description }}</div>
                      </q-card-section>
                      <q-separator dark />
                      <q-card-actions vertical>
                        <q-btn flat @click="cardPortStatus = !cardPortStatus; GetPortStatus(Object.keys(port)[0])">
                          Status
                        </q-btn>
                        <PortStatus :cardPortStatus="cardPortStatus"
                          v-on:CloseCardPortStatus='cardPortStatus = !cardPortStatus' :loadingStatus="loadingStatus"
                          :portStatus="interfaceStatus" :interfaceName="interfacename" :sw="sw" />
                      </q-card-actions>
                    </q-card>
                  </div>


                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </div>


      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" @click="CloseCardPortsList" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { PostData } from '../methods/ApiCommunication'
import PortStatus from './PortStatus.vue'
export default defineComponent({
  name: "PortsList",
  props: {
    cardPortList: Boolean,
    sw: Object,
    loadingPorts: Boolean,
    interfaces: Array
  },
  setup() {
    return {
      tab: ref("10ge"),
      splitterModel: ref(20),
      cardPortStatus: ref(false),
      loadingStatus: ref(false)
    };
  },
  data() {
    return {
      interfaceStatus: {},
      swData: this.sw,
      interfacename: null
    };
  },
  methods: {
    CloseCardPortsList() {
      this.$emit("CloseCardPortsList");
    },
    cardColor(status) {
      if (status == "UP") {
        return "green";
      }
      return "red";
    },
    async GetPortStatus(interfaceName) {
      try {
        this.loadingStatus = true
        const tokenJwt = this.$q.localStorage.getItem('jwt')
        this.interfacename = interfaceName
        const datapost = {
          ip: this.sw.ip, user: this.sw.user, password: this.sw.password, port: this.sw.port, interface: interfaceName
        }
        const response = await PostData('/getinterfacedetail', JSON.stringify(datapost), tokenJwt)
        this.interfaceStatus = response.dados
        this.loadingStatus = false

      } catch (error) {
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
    geInterfaces: function () {
      return this.interfaces.filter(port => {
        let regex = /^Giga/gi;
        let name = Object.keys(port);
        if (regex.test(name)) {
          return port;
        }
      });
    },
    XgeInterfaces: function () {
      return this.interfaces.filter(port => {
        let regex = /^XGiga/gi;
        let name = Object.keys(port);
        if (regex.test(name)) {
          return port;
        }
      });
    },
    ge40Interfaces: function () {
      return this.interfaces.filter(port => {
        let regex = /^40G/gi;
        let name = Object.keys(port);
        if (regex.test(name)) {
          return port;
        }
      });
    },
  },
  components: { PortStatus }
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
