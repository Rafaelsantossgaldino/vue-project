<template>
  <div>
    <h1 style="display: inline-block; margin-right: 200px;">Todas as Tarefas</h1>
    <button @click="navigateToCreateTask">Criar tarefa</button>
    <TaskList :tasks="tasks" @task-updated="fetchTasks" @task-deleted="fetchTasks" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import TaskList from '../components/TaskList.vue';
import { useRouter } from 'vue-router';
import { uidStore } from '../store/store'; // Importar o arquivo de estado

export default defineComponent({
  components: { TaskList },
  setup() {
    const tasks = ref([]);
    const router = useRouter();

    const fetchTasks = async () => {
      const uid = uidStore.value; // Usar o uid da loja
      if (!uid) {
        console.error('UID não encontrado');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/tasks/list_user/${uid}`);
        tasks.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    const navigateToCreateTask = () => {
      router.push({ path: '/created_task' });
    };

    onMounted(fetchTasks);

    return { tasks, fetchTasks, navigateToCreateTask };
  },
});
</script>

<style scoped>
/* Estilos conforme necessário */
</style>