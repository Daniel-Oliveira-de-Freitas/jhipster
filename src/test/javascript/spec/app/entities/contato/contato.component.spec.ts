/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import Contato from '../../../../../../main/webapp/app/entities/contato/contato.vue';
import ContatoService from '../../../../../../main/webapp/app/entities/contato/contato.service';
import AlertService from '../../../../../../main/webapp/app/shared/alert/alert.service';

type ContatoComponentType = InstanceType<typeof Contato>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Contato Management Component', () => {
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;
    let mountOptions: MountingOptions<ContatoComponentType>['global'];

    beforeEach(() => {
      contatoServiceStub = sinon.createStubInstance<ContatoService>(ContatoService);
      contatoServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          contatoService: () => contatoServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        contatoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Contato, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(contatoServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.contatoes[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: ContatoComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Contato, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        contatoServiceStub.retrieve.reset();
        contatoServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        contatoServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeContato();
        await comp.$nextTick(); // clear components

        // THEN
        expect(contatoServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(contatoServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
