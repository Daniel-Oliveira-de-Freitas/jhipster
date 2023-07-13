<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" v-if="userAccount">
        <h2 id="myUserLabel">Criar ou editar usuário</h2>
        <div>
          <div class="form-group" :hidden="!userAccount.id">
            <label>Código</label>
            <input type="text" class="form-control" name="id" v-model="userAccount.id" readonly />
          </div>

          <div class="form-group">
            <label class="form-control-label">Login</label>
            <input
              type="text"
              class="form-control"
              name="login"
              :class="{ valid: !v$.userAccount.login.$invalid, invalid: v$.userAccount.login.$invalid }"
              v-model="v$.userAccount.login.$model"
            />

            <div v-if="v$.userAccount.login.$anyDirty && v$.userAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.login.required">O campo é obrigatório.</small>

              <small class="form-text text-danger" v-if="!v$.userAccount.login.maxLength"
                >Este campo não pode ter mais de 50 caracteres.</small
              >

              <small class="form-text text-danger" v-if="!v$.userAccount.login.pattern"
                >Este campo só pode conter letras, números e e-mail.</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstName">Nome</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="Seu nome"
              :class="{ valid: !v$.userAccount.firstName.$invalid, invalid: v$.userAccount.firstName.$invalid }"
              v-model="v$.userAccount.firstName.$model"
            />
            <div v-if="v$.userAccount.firstName.$anyDirty && v$.userAccount.firstName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.firstName.maxLength"
                >Este campo não pode ter mais de 50 caracteres.</small
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
              :class="{ valid: !v$.userAccount.lastName.$invalid, invalid: v$.userAccount.lastName.$invalid }"
              v-model="v$.userAccount.lastName.$model"
            />
            <div v-if="v$.userAccount.lastName.$anyDirty && v$.userAccount.lastName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.lastName.maxLength"
                >Este campo não pode ter mais de 50 caracteres.</small
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
              :class="{ valid: !v$.userAccount.email.$invalid, invalid: v$.userAccount.email.$invalid }"
              v-model="v$.userAccount.email.$model"
              email
              required
            />
            <div v-if="v$.userAccount.email.$anyDirty && v$.userAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.email.required">O e-mail é obrigatório.</small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.email">E-mail inválido.</small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.minLength">O e-mail deve ter pelo menos 5 caracteres</small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.maxLength"
                >O e-mail não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-check">
            <label class="form-check-label" for="activated">
              <input
                class="form-check-input"
                :disabled="userAccount.id === null"
                type="checkbox"
                id="activated"
                name="activated"
                v-model="userAccount.activated"
              />
              <span>Ativo</span>
            </label>
          </div>

          <div class="form-group">
            <label>Perfis</label>
            <select class="form-control" multiple name="authority" v-model="userAccount.authorities">
              <option v-for="authority of authorities" :value="authority" :key="authority">{{ authority }}</option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancelar</span>
          </button>
          <button type="submit" :disabled="v$.userAccount.$invalid || isSaving" class="btn btn-primary">
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Salvar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./user-management-edit.component.ts"></script>
