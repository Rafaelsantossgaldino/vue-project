<template>
  <div>
    <h1>Nova Tarefa</h1>
    <TaskForm @task-added="handleTaskAdded" />
    <div class="button-group">
      <button @click="goBack">Voltar para Tarefas</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { TaskForm },
  setup() {
    const router = useRouter();

    const handleTaskAdded = () => {
      router.push('/tasks');
    };

    const goBack = () => {
      router.push('/tasks');
    };

    return { handleTaskAdded, goBack };
  },
});
</script>

<style scoped>
.button-group {
  margin-top: 10px; /* Margem acima dos botões */
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #6c757d;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #5a6268;
}
</style>