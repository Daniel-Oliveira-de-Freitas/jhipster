import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { IContato, Contato } from '@/shared/model/contato.model';
import ContatoService from './contato.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ContatoUpdate',
  setup() {
    const contatoService = inject('contatoService', () => new ContatoService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const contato: Ref<IContato> = ref(new Contato());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'pt-br'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const validations = useValidation();
    const validationRules = {
      name: {},
      fone: {},
      email: {},
    };
    const v$ = useVuelidate(validationRules, contato as any);
    v$.value.$validate();

    return {
      contatoService,
      alertService,
      contato,
      previousState,
      isSaving,
      currentLanguage,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.contato.id) {
        this.contatoService()
          .update(this.contato)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo('A Contato is updated with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.contatoService()
          .create(this.contato)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess('A Contato is created with identifier ' + param.id);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
