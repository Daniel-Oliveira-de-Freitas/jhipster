import { defineComponent, inject, onMounted, ref, Ref, watch, watchEffect } from 'vue';

import { IContato } from '@/shared/model/contato.model';
import ContatoService from './contato.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Contato',
  setup() {
    const contatoService = inject('contatoService', () => new ContatoService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const contatoes: Ref<IContato[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveContatos = async () => {
      isFetching.value = true;
      try {
        const res = await contatoService().retrieve();
        contatoes.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveContatos();
    };

    onMounted(async () => {
      await retrieveContatos();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IContato) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeContato = async () => {
      try {
        await contatoService().delete(removeId.value);
        const message = 'A Contato is deleted with identifier ' + removeId.value;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveContatos();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      contatoes,
      handleSyncList,
      isFetching,
      retrieveContatos,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeContato,
    };
  },
});
