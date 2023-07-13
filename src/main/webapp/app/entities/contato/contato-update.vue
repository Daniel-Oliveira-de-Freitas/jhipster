<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="myApp.contato.home.createOrEditLabel" data-cy="ContatoCreateUpdateHeading">Criar ou editar Contato</h2>
        <div>
          <div class="form-group" v-if="contato.id">
            <label for="id">Código</label>
            <input type="text" class="form-control" id="id" name="id" v-model="contato.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="contato-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="contato-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="contato-fone">Fone</label>
            <input
              type="text"
              class="form-control"
              name="fone"
              id="contato-fone"
              data-cy="fone"
              :class="{ valid: !v$.fone.$invalid, invalid: v$.fone.$invalid }"
              v-model="v$.fone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="contato-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="contato-email"
              data-cy="email"
              :class="{ valid: !v$.email.$invalid, invalid: v$.email.$invalid }"
              v-model="v$.email.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancelar</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Salvar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./contato-update.component.ts"></script>
