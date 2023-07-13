<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Nova senha</h1>

        <div class="alert alert-danger" v-if="keyMissing">Chave de reestabelecimento não encontrada.</div>

        <div class="alert alert-danger" v-if="error">
          <p>Sua senha não pode ser trocada. Lembre-se, a requisição de troca de senha é válida apenas por 24 horas.</p>
        </div>

        <div class="alert alert-success" v-if="success">
          <span><strong>Sua senha foi alterada com sucesso.</strong> Por favor </span>
          <a class="alert-link" v-on:click="openLogin">entrar</a>
        </div>
        <div class="alert alert-danger" v-if="doNotMatch">
          <p>A senha e sua confirmação devem ser iguais!</p>
        </div>

        <div class="alert alert-warning" v-if="!success && !keyMissing">
          <p>Escolha uma nova senha</p>
        </div>

        <div v-if="!keyMissing">
          <form v-if="!success" name="form" role="form" v-on:submit.prevent="finishReset()">
            <div class="form-group">
              <label class="form-control-label" for="newPassword">Nova senha</label>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                name="newPassword"
                placeholder="Nova senha"
                :class="{ valid: !v$.resetAccount.newPassword.$invalid, invalid: v$.resetAccount.newPassword.$invalid }"
                v-model="v$.resetAccount.newPassword.$model"
                minlength="4"
                maxlength="50"
                required
                data-cy="resetPassword"
              />
              <div v-if="v$.resetAccount.newPassword.$anyDirty && v$.resetAccount.newPassword.$invalid">
                <small class="form-text text-danger" v-if="!v$.resetAccount.newPassword.required">A senha é obrigatória.</small>
                <small class="form-text text-danger" v-if="!v$.resetAccount.newPassword.minLength"
                  >A senha deve ter pelo menos 4 caracteres</small
                >
                <small class="form-text text-danger" v-if="!v$.resetAccount.newPassword.maxLength"
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
                :class="{ valid: !v$.resetAccount.confirmPassword.$invalid, invalid: v$.resetAccount.confirmPassword.$invalid }"
                placeholder="Confirme a nova senha"
                v-model="v$.resetAccount.confirmPassword.$model"
                minlength="4"
                maxlength="50"
                required
                data-cy="confirmResetPassword"
              />
              <div v-if="v$.resetAccount.confirmPassword.$anyDirty && v$.resetAccount.confirmPassword.$invalid">
                <small class="form-text text-danger" v-if="!v$.resetAccount.confirmPassword.sameAsPassword"
                  >A senha e sua confirmação devem ser iguais!</small
                >
              </div>
            </div>
            <button type="submit" :disabled="v$.resetAccount.$invalid" class="btn btn-primary" data-cy="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reset-password-finish.component.ts"></script>
