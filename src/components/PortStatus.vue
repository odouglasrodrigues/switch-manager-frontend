<template>

  <q-dialog v-model="cardPortStatus" persistent>
    <q-card style="width: 100%; min-width: 50vw;  ">
      <q-card-section>
        <div class="text-h6">Status</div>
      </q-card-section>

      <q-card-section class="q-pt-none">

        <div v-if="loadingStatus" class="loading" align="center">
          <q-spinner-pie color="primary" size="6em" />
          <h4>Carregando...</h4>
        </div>

        <div v-else>
          Porta Ligada:
          {{portStatus}}
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
    portStatus: Object
  },
  setup() {
    return {
      tab: ref('1ge'),
      splitterModel: ref(20)
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
    }
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
