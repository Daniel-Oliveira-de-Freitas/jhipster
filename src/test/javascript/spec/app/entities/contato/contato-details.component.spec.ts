/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import ContatoDetails from '../../../../../../main/webapp/app/entities/contato/contato-details.vue';
import ContatoService from '../../../../../../main/webapp/app/entities/contato/contato.service';
import AlertService from '../../../../../../main/webapp/app/shared/alert/alert.service';

type ContatoDetailsComponentType = InstanceType<typeof ContatoDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const contatoSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Contato Management Detail Component', () => {
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;
    let mountOptions: MountingOptions<ContatoDetailsComponentType>['global'];

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
          'router-link': true,
        },
        provide: {
          alertService,
          contatoService: () => contatoServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        contatoServiceStub.find.resolves(contatoSample);
        route = {
          params: {
            contatoId: '' + 123,
          },
        };
        const wrapper = shallowMount(ContatoDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.contato).toMatchObject(contatoSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        contatoServiceStub.find.resolves(contatoSample);
        const wrapper = shallowMount(ContatoDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
