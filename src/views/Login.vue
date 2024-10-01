<template>
  <div class="login-container">
    <h1 v-if="!isRegisterMode">Tela de Login</h1>
    <h1 v-else>Criar Conta</h1>
    
    <form @submit.prevent="isRegisterMode ? registerUser() : loginUser()">
      <h5>Informe seu E-mail</h5>
      <input v-model="email" type="email" placeholder="Email" required />
      
      <h5>Informe sua Senha</h5>
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit">{{ isRegisterMode ? 'Criar' : 'Entrar' }}</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <p v-if="!isRegisterMode">Ainda não tem uma conta? 
      <a href="#" @click.prevent="toggleRegisterMode">Criar uma conta</a>
    </p>
    <p v-else>Já tem uma conta? 
      <a href="#" @click.prevent="toggleRegisterMode">Fazer login</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { uidStore } from '../store/store';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isRegisterMode: false,  // Variável para alternar entre login e registro
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/login/login_user', {
          email: this.email,
          password: this.password,
        });
        const uid = response.data.uid;
        uidStore.value = uid;
        this.router.push({ path: '/tasks' });
        this.errorMessage = '';
      } catch (error: any) {
        if (error.response && error.response.data.error === 'Credenciais inválidas') {
          this.errorMessage = 'Credenciais inválidas';
        } else {
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
      }
    },
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/register/created_user', {
          email: this.email,
          password: this.password,
        });
        // Sucesso no registro
        this.errorMessage = 'Conta criada com sucesso. Agora você pode fazer login.';
        this.isRegisterMode = false; // Volta para o modo de login
      } catch (error: any) {
        if (error.response && error.response.data.error === 'Erro ao criar conta') {
          this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        } else {
          this.errorMessage = 'Erro ao registrar. Tente novamente.';
        }
      }
    },
    toggleRegisterMode() {
      this.isRegisterMode = !this.isRegisterMode;
      this.errorMessage = ''; // Limpa a mensagem de erro ao alternar modos
    },
  },
});
</script>

<style scoped>
/* Manter os mesmos estilos */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
input {
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  width: 100%;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-top: 10px;
}
a {
  color: #007bff;
  cursor: pointer;
}
a:hover {
  text-decoration: underline;
}
</style>