<template>
  <div>
    <h2 id="page-heading" data-cy="ContatoHeading">
      <span id="contato-heading">Contatoes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Atualizar lista</span>
        </button>
        <router-link :to="{ name: 'ContatoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-contato"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Criar novo Contato</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && contatoes && contatoes.length === 0">
      <span>Nenhum Contato encontrado</span>
    </div>
    <div class="table-responsive" v-if="contatoes && contatoes.length > 0">
      <table class="table table-striped" aria-describedby="contatoes">
        <thead>
          <tr>
            <th scope="row"><span>Código</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"><span>Fone</span></th>
            <th scope="row"><span>Email</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contato in contatoes" :key="contato.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ContatoView', params: { contatoId: contato.id } }">{{ contato.id }}</router-link>
            </td>
            <td>{{ contato.name }}</td>
            <td>{{ contato.fone }}</td>
            <td>{{ contato.email }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ContatoView', params: { contatoId: contato.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">Visualizar</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ContatoEdit', params: { contatoId: contato.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Editar</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(contato)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Excluir</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="myApp.contato.delete.question" data-cy="contatoDeleteDialogHeading">Confirme a exclusão</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-contato-heading">Tem certeza de que deseja excluir Contato {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancelar</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-contato"
            data-cy="entityConfirmDeleteButton"
            v-on:click="removeContato()"
          >
            Excluir
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./contato.component.ts"></script>
