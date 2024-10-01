<template>
  <div class="update-task-container">
    <h1>Atualizar Tarefa</h1>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <h5>Título da Tarefa</h5>
        <input type="text" v-model="task.title" required />
      </div>
      <div class="form-group">
        <h5>Descrição</h5>
        <textarea v-model="task.description" required></textarea>
      </div>
      <div class="form-group">
        <h5>Status</h5>
        <select v-model="task.status" required>
          <option value="pendente">Pendente</option>
          <option value="em progresso">Em Progresso</option>
          <option value="concluída">Concluída</option>
        </select>
      </div>
      <div class="button-group">
        <button type="submit">Atualizar Tarefa</button>
        <button type="button" @click="resetForm">Limpar Formulário</button>
        <button type="button" @click="navigateBack">Voltar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const task = ref({ title: '', description: '', status: '' });
    const router = useRouter();
    const route = useRoute();

    // Pegando o uid da URL
    const uid = route.query.uid;

    const fetchTask = async () => {
      const taskId = route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/tasks/list_task/${taskId}`);
        task.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
      }
    };

    const updateTask = async () => {
      const taskId = route.params.id;
      try {
        await axios.put(`http://localhost:3000/tasks/update/${taskId}`, task.value);
        // Redireciona para a página de tarefas, mantendo o uid
        router.push({ path: '/tasks', query: { uid } });
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
      }
    };

    const navigateBack = () => {
      // Volta para a página de tarefas com o uid
      router.push({ path: '/tasks', query: { uid } });
    };

    const resetForm = () => {
      task.value = { title: '', description: '', status: '' };
    };

    onMounted(fetchTask);

    return { task, updateTask, navigateBack, resetForm };
  },
});
</script>

<style scoped>
.update-task-container {
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}

h5 {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #f1eeee;
}

.form-group {
  margin-bottom: 10px;
}

input[type="text"], select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus, select:focus, textarea:focus {
  border-color: #66afe9;
  outline: none;
}

textarea {
  resize: vertical; /* Permite o redimensionamento apenas na vertical */
  min-height: 120px; /* Altura mínima */
  max-height: 300px; /* Altura máxima */
  line-height: 1.5;
}

/* Estiliza os botões */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
}

.button-group {
  display: flex;
  justify-content: flex-start;
}

button + button {
  margin-left: 10px;
}
</style>