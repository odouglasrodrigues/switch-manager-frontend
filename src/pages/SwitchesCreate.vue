<template>

  <div class="q-pa-md column items-center q-gutter-xs">
    <h4>Cadastrar Switch</h4>
    <div class="form-control">
      <form class="q-gutter-xs">
        <q-input v-model="formControl.name" type="text" label="Nome do equipamento" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />
        <q-input v-model="formControl.ip" type="text" label="IP"
          :rules="[val => /^((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))$|^$/.test(val) || 'Informe um IP válido']" />
        <q-input v-model="formControl.user" type="text" label="Usuário" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />

        <q-input v-model="formControl.password" filled :type="isPwd ? 'password' : 'text'" label="Senha" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-input v-model="formControl.port" type="text" label="Porta (Padrão 23)" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />
        <q-input v-model="formControl.protocolo" type="text" label="Protocolo (Padrao Telnet)" readonly lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />
        <q-input v-model="formControl.type" type="text" label="Tipo" readonly lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />

        <div class="q-gutter-md">
          <q-btn label="Cadastrar" @click="CreateSwitch" color="primary" />
          <q-btn v-if="loadingtest" label="Testando ..." color="green">
            <q-spinner color="white" size="1em" :thickness="10" />
          </q-btn>
          <q-btn v-else label="Testar Conexão" @click="TestConnection" color="green" />
          <q-btn label="Limpar" color="red" @click="ClearForm" flat class="q-ml-sm" />
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { PostData } from '../methods/ApiCommunication'
export default defineComponent({
  name: "SwitchesCreate",
  setup() {
    return {
      isPwd: ref(true),
      loadingtest: ref(false)
    };
  },
  data() {
    return {
      formControl: {
        name: "",
        ip: "",
        user: "",
        password: "",
        port: "23",
        protocolo: "telnet",
        type: "Switch",
        active: true
      }
    };
  },
  methods: {
    async CreateSwitch() {
      try {

        if (this.formControl.name == "" || this.formControl.ip == "" || this.formControl.user == "" || this.formControl.password == "" || this.formControl.port == "") {
          this.$q.notify({
            type: 'warning',
            message: 'Todos os campos precisam ser preenchidos'
          })
          return
        }

        const tokenJwt = this.$q.localStorage.getItem('jwt')
        const datapost = this.formControl
        const response = await PostData('/newdevice', JSON.stringify(datapost), tokenJwt)

        if (response.status == "erro") {

          this.$q.notify({
            type: 'negative',
            message: response.message
          })
        }


        this.$q.notify({
            type: 'positive',
            message: 'Cadastro realizado com sucesso!'
          })

      } catch (error) {
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
          icon: 'error',
        });
      }
    },
    async TestConnection() {
      try {

        if (this.formControl.name == "" || this.formControl.ip == "" || this.formControl.user == "" || this.formControl.password == "" || this.formControl.port == "") {
          this.$q.notify({
            type: 'warning',
            message: 'Todos os campos precisam ser preenchidos'
          })
          return
        }
        this.loadingtest = true
        const tokenJwt = this.$q.localStorage.getItem('jwt')
        const datapost = this.formControl
        const response = await PostData('/testdeviceconnection', JSON.stringify(datapost), tokenJwt)

        if (response.status == "erro") {
          this.loadingtest = false
          this.$q.notify({
            type: 'negative',
            message: response.message
          })
          return
        }


        this.loadingtest = false
        this.$q.notify({
            type: 'positive',
            message: response.message
          })

      } catch (error) {
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
          icon: 'error',
        });
      }
    },
    ClearForm(){
      this.formControl.ip=""
      this.formControl.name=""
      this.formControl.password=""
      this.formControl.port=23
      this.formControl.user=""
    }
  },
  async created() {

  },
  components: {}
})
</script>

<style>
</style>
