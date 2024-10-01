<template>
  <form @submit.prevent="createTask">
    <div class="form-group">
      <h5>Informe o titulo da tarefa</h5>
      <input v-model="title" placeholder="Digite o titulo" required />
    </div>
    <div class="form-group">
      <h5>Informe a descricao</h5>
      <input v-model="description" placeholder="Digite a descricao" required />
    </div>
    <div class="form-group">
      <h5>Informe o status</h5>
      <input v-model="status" placeholder="Qual o Status?" required />
    </div>
    <div class="form-group">
      <h5>Informe o ID do usuario</h5>
      <input v-model="uid" placeholder="Digite o ID do usuario" required />
    </div>
    <div class="button-group">
      <button type="submit">Salvar Tarefa</button>
      <button type="button" @click="resetForm">Limpar Formulario</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  data() {
    return {
      title: '',
      description: '',
      status: '',
      uid: '',
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const uid = route.query.uid;

    return { router, uid };
  },
  methods: {
    async createTask() {
      try {
        await axios.post('http://localhost:3000/tasks/created_task', {
          title: this.title,
          description: this.description,
          status: this.status,
          uid: this.uid,
        });

        this.router.push({ path: '/tasks', query: { uid: this.uid } });
        this.resetForm();
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    },
    resetForm() {
      this.title = '';
      this.description = '';
      this.status = '';
      this.uid = '';
    },
  },
});
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button-group {
  display: flex;
  gap: 10px;
}
button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>