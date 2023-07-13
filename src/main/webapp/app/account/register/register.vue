<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 id="register-title" data-cy="registerTitle">Cadastro</h1>

        <div class="alert alert-success" role="alert" v-if="success">
          <strong>Cadastro realizado com sucesso!</strong> Favor verificar seu e-mail para confirmar a conta.
        </div>

        <div class="alert alert-danger" role="alert" v-if="error">
          <strong>Erro ao realizar o cadastro!</strong> Favor tentar novamente mais tarde.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorUserExists">
          <strong>Usuário já registrado!</strong> Favor escolher outro.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists">
          <strong>E-mail já está em uso!</strong> Por favor informe outro.
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" role="form" v-on:submit.prevent="register()" v-if="!success" no-validate>
          <div class="form-group">
            <label class="form-control-label" for="username">Usuário</label>
            <input
              type="text"
              class="form-control"
              v-model="v$.registerAccount.login.$model"
              id="username"
              name="login"
              :class="{ valid: !v$.registerAccount.login.$invalid, invalid: v$.registerAccount.login.$invalid }"
              required
              minlength="1"
              maxlength="50"
              pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              placeholder="Seu usuário"
              data-cy="username"
            />
            <div v-if="v$.registerAccount.login.$anyDirty && v$.registerAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.required">O usuário é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.minLength"
                >O usuário deve ter pelo menos 1 caractere.</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.maxLength"
                >O usuário não pode ter mais de 50 caracteres.</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.pattern">Your username is invalid.</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email">E-mail</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              :class="{ valid: !v$.registerAccount.email.$invalid, invalid: v$.registerAccount.email.$invalid }"
              v-model="v$.registerAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              placeholder="Seu e-mail"
              data-cy="email"
            />
            <div v-if="v$.registerAccount.email.$anyDirty && v$.registerAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.required">O e-mail é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.email">E-mail inválido.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.minLength"
                >O e-mail deve ter pelo menos 5 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.maxLength"
                >O e-mail não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstPassword">Nova senha</label>
            <input
              type="password"
              class="form-control"
              id="firstPassword"
              name="password"
              :class="{ valid: !v$.registerAccount.password.$invalid, invalid: v$.registerAccount.password.$invalid }"
              v-model="v$.registerAccount.password.$model"
              minlength="4"
              maxlength="50"
              required
              placeholder="Nova senha"
              data-cy="firstPassword"
            />
            <div v-if="v$.registerAccount.password.$anyDirty && v$.registerAccount.password.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.required">A senha é obrigatória.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.minLength"
                >A senha deve ter pelo menos 4 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.maxLength"
                >A senha não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secondPassword">Confirmação de nova senha</label>
            <input
              type="password"
              class="form-control"
              id="secondPassword"
              name="confirmPasswordInput"
              :class="{ valid: !v$.confirmPassword.$invalid, invalid: v$.confirmPassword.$invalid }"
              v-model="v$.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              placeholder="Confirme a nova senha"
              data-cy="secondPassword"
            />
            <div v-if="v$.confirmPassword.$dirty && v$.confirmPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.confirmPassword.required">A confirmação da senha é obrigatória.</small>
              <small class="form-text text-danger" v-if="!v$.confirmPassword.minLength"
                >A confirmação da senha deve ter pelo menos 4 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.confirmPassword.maxLength"
                >A confirmação da senha não pode ter mais de 50 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.confirmPassword.sameAsPassword"
                >A senha e sua confirmação devem ser iguais!</small
              >
            </div>
          </div>

          <button type="submit" :disabled="v$.$invalid" class="btn btn-primary" data-cy="submit">Cadastrar</button>
        </form>
        <p></p>
        <div class="alert alert-warning">
          <span>Se deseja </span>
          <a class="alert-link" v-on:click="openLogin()">entrar</a
          ><span
            >, utilize as seguintes contas padrões:<br />- Administrador (usuário="admin" and senha="admin") <br />- Usuário (usuário="user"
            e senha="user").</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>
