<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h2 v-if="username" id="settings-title">
          <span
            >Configurações para o usuário [<strong>{{ username }}</strong
            >]</span
          >
        </h2>

        <div class="alert alert-success" role="alert" v-if="success"><strong>Configurações salvas com sucesso!</strong></div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists">
          <strong>E-mail já está em uso!</strong> Por favor informe outro.
        </div>

        <form name="form" id="settings-form" role="form" v-on:submit.prevent="save()" v-if="settingsAccount" novalidate>
          <div class="form-group">
            <label class="form-control-label" for="firstName">Nome</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="Seu nome"
              :class="{ valid: !v$.settingsAccount.firstName.$invalid, invalid: v$.settingsAccount.firstName.$invalid }"
              v-model="v$.settingsAccount.firstName.$model"
              minlength="1"
              maxlength="50"
              required
              data-cy="firstname"
            />
            <div v-if="v$.settingsAccount.firstName.$anyDirty && v$.settingsAccount.firstName.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.required">O nome é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.minLength"
                >O nome deve ter pelo menos 1 caractere</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.maxLength"
                >O nome não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="lastName">Sobrenome</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              placeholder="Seu sobrenome"
              :class="{ valid: !v$.settingsAccount.lastName.$invalid, invalid: v$.settingsAccount.lastName.$invalid }"
              v-model="v$.settingsAccount.lastName.$model"
              minlength="1"
              maxlength="50"
              required
              data-cy="lastname"
            />
            <div v-if="v$.settingsAccount.lastName.$anyDirty && v$.settingsAccount.lastName.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.required">O sobrenome é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.minLength"
                >O sobrenome deve ter pelo menos 1 caractere</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.maxLength"
                >O sobrenome não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email">E-mail</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Seu e-mail"
              :class="{ valid: !v$.settingsAccount.email.$invalid, invalid: v$.settingsAccount.email.$invalid }"
              v-model="v$.settingsAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              data-cy="email"
            />
            <div v-if="v$.settingsAccount.email.$anyDirty && v$.settingsAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.required">O e-mail é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.email">E-mail inválido.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.minLength"
                >O e-mail deve ter pelo menos 5 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.maxLength"
                >O e-mail não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <button type="submit" :disabled="v$.settingsAccount.$invalid" class="btn btn-primary" data-cy="submit">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./settings.component.ts"></script>
