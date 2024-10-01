<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
        <p>Usuário: {{ task.userId }}</p>
        <p>Data de criação: {{ task.createdAt }}</p>
        <div class="actions">
          <button @click="deleteTask(task.id)">Deletar</button>
          <button @click="navigateToUpdateTask(task.id)">Atualizar</button>
        </div>
      </li>
      <li v-if="tasks.length === 0" class="no-tasks">Nenhuma tarefa encontrada.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async deleteTask(id: string) {
      try {
        await axios.delete(`http://localhost:3000/tasks/delete/${id}`);
        this.$emit('task-deleted');
      } catch (error) {
        console.error('Erro ao excluir a tarefa:', error);
      }
    },
    navigateToUpdateTask(id: string) {
      this.$router.push(`/tasks/update/${id}`);
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none; /* Remove o estilo padrão da lista */
  padding: 0; /* Remove o preenchimento padrão */
}

.task-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0;
  background-color: #2c2c2c;
}

.actions {
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

button:last-child {
  margin-right: 0;
}

button:hover {
  background-color: #0056b3;
}

.no-tasks {
  text-align: center;
  font-style: italic;
}
</style>