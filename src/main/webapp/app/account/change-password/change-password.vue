<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h2 v-if="username" id="password-title">
          <span
            >Senha para [<strong>{{ username }}</strong
            >]</span
          >
        </h2>

        <div class="alert alert-success" role="alert" v-if="success"><strong>Senha alterada com sucesso!</strong></div>
        <div class="alert alert-danger" role="alert" v-if="error"><strong>Ocorreu um erro!</strong> A senha não pode ser alterada.</div>

        <div class="alert alert-danger" role="alert" v-if="doNotMatch">A senha e sua confirmação devem ser iguais!</div>

        <form name="form" role="form" id="password-form" v-on:submit.prevent="changePassword()">
          <div class="form-group">
            <label class="form-control-label" for="currentPassword">Senha atual</label>
            <input
              type="password"
              class="form-control"
              id="currentPassword"
              name="currentPassword"
              :class="{ valid: !v$.resetPassword.currentPassword.$invalid, invalid: v$.resetPassword.currentPassword.$invalid }"
              placeholder="Senha atual"
              v-model="v$.resetPassword.currentPassword.$model"
              required
              data-cy="currentPassword"
            />
            <div v-if="v$.resetPassword.currentPassword.$anyDirty && v$.resetPassword.currentPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.currentPassword.required">A senha é obrigatória.</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="newPassword">Nova senha</label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Nova senha"
              :class="{ valid: !v$.resetPassword.newPassword.$invalid, invalid: v$.resetPassword.newPassword.$invalid }"
              v-model="v$.resetPassword.newPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="newPassword"
            />
            <div v-if="v$.resetPassword.newPassword.$anyDirty && v$.resetPassword.newPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.required">A senha é obrigatória.</small>
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.minLength"
                >A senha deve ter pelo menos 4 caracteres</small
              >
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.maxLength"
                >A senha não pode ter mais de 50 caracteres</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="confirmPassword">Confirmação de nova senha</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              :class="{ valid: !v$.resetPassword.confirmPassword.$invalid, invalid: v$.resetPassword.confirmPassword.$invalid }"
              placeholder="Confirme a nova senha"
              v-model="v$.resetPassword.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="confirmPassword"
            />
            <div v-if="v$.resetPassword.confirmPassword.$anyDirty && v$.resetPassword.confirmPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.confirmPassword.sameAsPassword"
                >A senha e sua confirmação devem ser iguais!</small
              >
            </div>
          </div>

          <button type="submit" :disabled="v$.resetPassword.$invalid" class="btn btn-primary" data-cy="submit">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./change-password.component.ts"></script>
