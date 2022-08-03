<template>

  <div class="q-pa-md column items-center q-gutter-xs">
    <h4>Cadastrar Usuário</h4>
    <div class="form-control">
      <form class="q-gutter-xs">
        <q-input v-model="formControl.name" type="text" label="Nome do Usuário" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />

        <q-input v-model="formControl.email" type="email" label="Email" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" />

        <q-input v-model="formControl.password" filled :type="isPwd ? 'password' : 'text'" label="Senha" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-select v-model="formControl.permissions" type="text" label="Permissão" lazy-rules
          :rules="[val => val.length > 0 || 'Campo obrigatório']" :options="permissionsList" />

        <q-btn-toggle v-model="formControl.active" push glossy :toggle-color="ActiveColor(formControl.active)" :options="[
          { label: 'Ativado', value: true},
          { label: 'Desativado', value: false}
        ]" />

        <div class="q-gutter-md" style="padding-top: 2em;">
          <q-btn label="Cadastrar" @click="CreateUser" color="primary" />
          <q-btn label="Limpar" color="red" @click="ClearForm" flat class="q-ml-sm" style="padding-left: 2em;"/>
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
  name: "UserCreate",
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
        password: "",
        email: "",
        permissions: "",
        active: true
      },
      permissionsList: ['Administrador', 'Operador', 'Estagiário']
    };
  },
  methods: {
    async CreateUser() {
      try {

        if (this.formControl.name == "" || this.formControl.email == "" || this.formControl.password== "" || this.formControl.permissions == "") {
          this.$q.notify({
            type: 'warning',
            message: 'Todos os campos precisam ser preenchidos'
          })
          return
        }

        const tokenJwt = this.$q.localStorage.getItem('jwt')
        const datapost = this.formControl
        const response = await PostData('/newuser', JSON.stringify(datapost), tokenJwt)

        if (response.status == "erro") {

          this.$q.notify({
            type: 'negative',
            message: response.message
          })
          return
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
    ClearForm() {
      this.formControl.name = ""
      this.formControl.password = ""
      this.formControl.permissions = ""
      this.formControl.email = ""
    },
    ActiveColor(status){
      return status ? 'teal' : 'red'
    }
  },
  async created() {

  },
  components: {}
})
</script>

<style>
</style>
