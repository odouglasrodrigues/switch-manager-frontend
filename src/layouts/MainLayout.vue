<template>
  <q-layout view="hhh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98" align="center">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/icons/logo-white.png">
          </q-avatar>
          Switch Manager
        </q-toolbar-title>
        <q-btn color="primary" icon="logout" @click="Logout">
          <q-tooltip>
            Sair
          </q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Swicthes" />
        <q-route-tab to="/createswitch" label="Cadastrar Switch" />
        <q-route-tab to="/createuser" label="Cadastar Usuário" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {

    return {
    }
  },
  methods: {
    async Logout() {
      this.$q.localStorage.remove('jwt')
      this.$router.push('/login')
      this.$q.cookies.remove('jwt')
    },
  },
  async beforeMount() {
  }
}
)
</script>
