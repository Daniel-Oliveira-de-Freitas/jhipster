<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Nova senha</h1>

        <div class="alert alert-warning" v-if="!success">
          <p>Informe endereço de e-mail utilizado no cadastro</p>
        </div>

        <div class="alert alert-success" v-if="success">
          <p>Verifique seu e-mail para detalhes sobre a criação de uma nova senha.</p>
        </div>

        <form v-if="!success" name="form" role="form" v-on:submit.prevent="requestReset()">
          <div class="form-group">
            <label class="form-control-label" for="email">E-mail</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Seu e-mail"
              :class="{ valid: !v$.resetAccount.email.$invalid, invalid: v$.resetAccount.email.$invalid }"
              v-model="v$.resetAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              data-cy="emailResetPassword"
            />
            <div v-if="v$.resetAccount.email.$anyDirty && v$.resetAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.required">O e-mail é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.email">E-mail inválido.</small>
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.minLength">O e-mail deve ter pelo menos 5 caracteres</small>
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.maxLength"
                >O e-mail não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <button type="submit" :disabled="v$.resetAccount.$invalid" class="btn btn-primary" data-cy="submit">Criar nova senha</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reset-password-init.component.ts"></script>
