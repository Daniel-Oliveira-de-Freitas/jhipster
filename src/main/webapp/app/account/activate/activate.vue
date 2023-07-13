<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Ativação</h1>
        <div class="alert alert-success" v-if="success">
          <span><strong>Sua conta de usuário foi ativada com sucesso.</strong> Favor </span>
          <a class="alert-link" v-on:click="openLogin">entrar</a>.
        </div>
        <div class="alert alert-danger" v-if="error">
          <strong>Seu usuário não pode ser ativado.</strong> Favor utilizar o formulário de cadastro para criar uma nova conta.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./activate.component.ts"></script>
