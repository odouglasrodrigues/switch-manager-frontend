<template>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="sw in switches" :key="sw.ip" class="my-card bg-green text-white">
      <q-card-section>
        <div class="text-h6">{{ sw.name }}</div>
        <div class="text-subtitle2">IP: {{ sw.ip }}</div>
      </q-card-section>
      <q-separator dark />
      <q-card-actions>
        <q-btn flat>Listar Portas</q-btn>
      </q-card-actions>
    </q-card>

  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import swal from 'sweetalert';
import { GetData } from '../methods/ApiCommunication'
export default defineComponent({
  name: 'SwitchesList',
  setup() {
    return {
    }
  },
  data() {
    return {
      switches: []
    }
  }
  ,
  methods: {
    async GetSwitchList() {
      try {
        const tokenJwt = this.$q.localStorage.getItem('jwt')
        const response = await GetData('/listdevices', tokenJwt)
        const { SwitchList } = response.dados
        this.switches = SwitchList

      } catch (error) {
        swal({
          title: 'Oops!',
          text: 'Alguma coisa deu errado aqui!',
          icon: 'error',
        });
      }
    }
  },
  async created() {
    await this.GetSwitchList()
  }
})
</script>

<style>
</style>
