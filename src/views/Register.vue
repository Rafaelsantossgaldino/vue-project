<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('http://localhost:3000/register/created_user', {
          email: this.email,
          password: this.password,
        });
        // Redirecionar para a página de login após registro
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    },
  },
});
</script>