<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <router-view />
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #2c2c2c; /* Cor de fundo escura e suave */
  margin: 0;
  padding: 0;
  color: white; /* Para garantir que o texto fique legível em um fundo escuro */
}

h1, h2 {
  color: #fff; /* Definindo a cor dos títulos como branca para contraste */
}

form {
  margin: 20px 0;
}

input {
  padding: 10px;
  margin: 5px 0;
  width: 200px;
  border: 1px solid #fff; /* Borda branca para os campos de input */
  background-color: #444; /* Cor de fundo para o input */
  color: white; /* Texto branco dentro dos inputs */
}
</style>