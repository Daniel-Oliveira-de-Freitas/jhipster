import { defineComponent, inject, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IContato } from '@/shared/model/contato.model';
import ContatoService from './contato.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ContatoDetails',
  setup() {
    const contatoService = inject('contatoService', () => new ContatoService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const contato: Ref<IContato> = ref({});

    const retrieveContato = async contatoId => {
      try {
        const res = await contatoService().find(contatoId);
        contato.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.contatoId) {
      retrieveContato(route.params.contatoId);
    }

    return {
      alertService,
      contato,

      previousState,
    };
  },
});
