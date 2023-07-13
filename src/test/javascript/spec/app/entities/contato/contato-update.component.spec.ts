/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import ContatoUpdate from '../../../../../../main/webapp/app/entities/contato/contato-update.vue';
import ContatoService from '../../../../../../main/webapp/app/entities/contato/contato.service';
import AlertService from '../../../../../../main/webapp/app/shared/alert/alert.service';

type ContatoUpdateComponentType = InstanceType<typeof ContatoUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const contatoSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<ContatoUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Contato Management Update Component', () => {
    let comp: ContatoUpdateComponentType;
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;

    beforeEach(() => {
      route = {};
      contatoServiceStub = sinon.createStubInstance<ContatoService>(ContatoService);

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          contatoService: () => contatoServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(ContatoUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.contato = contatoSample;
        contatoServiceStub.update.resolves(contatoSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(contatoServiceStub.update.calledWith(contatoSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        contatoServiceStub.create.resolves(entity);
        const wrapper = shallowMount(ContatoUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.contato = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(contatoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        contatoServiceStub.find.resolves(contatoSample);
        contatoServiceStub.retrieve.resolves([contatoSample]);

        // WHEN
        route = {
          params: {
            contatoId: '' + contatoSample.id,
          },
        };
        const wrapper = shallowMount(ContatoUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.contato).toMatchObject(contatoSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        contatoServiceStub.find.resolves(contatoSample);
        const wrapper = shallowMount(ContatoUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
