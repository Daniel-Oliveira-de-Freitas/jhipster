import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Contato = () => import('@/entities/contato/contato.vue');
const ContatoUpdate = () => import('@/entities/contato/contato-update.vue');
const ContatoDetails = () => import('@/entities/contato/contato-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'contato',
      name: 'Contato',
      component: Contato,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'contato/new',
      name: 'ContatoCreate',
      component: ContatoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'contato/:contatoId/edit',
      name: 'ContatoEdit',
      component: ContatoUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'contato/:contatoId/view',
      name: 'ContatoView',
      component: ContatoDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
