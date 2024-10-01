import { createRouter, createWebHistory } from 'vue-router';
import Login from './../views/Login.vue';
import Tasks from './../views/Tasks.vue';
import CreateTask from './../views/CreateTask.vue';
import UpdateTask from './../views/UpdateTask.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: { keepAlive: true },
  },
  {
    path: '/created_task',
    name: 'CreateTask',
    component: CreateTask,
  },
  {
    path: '/tasks/update/:id',
    component: UpdateTask,
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;