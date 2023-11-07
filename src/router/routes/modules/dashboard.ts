import type { AppRouteModule } from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: import('/@/views/dashboard/layout.vue'),
  redirect: '/dashboard/certification',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '',
  },
  children: [
    {
      path: 'certification',
      name: 'Certification',
      component: () => import('/@/views/dashboard/certification/index.vue'),
      meta: {
        title: 'Host Certification',
      },
    },
    {
      path: 'hostAlbum',
      name: 'HostAlbum',
      component: () => import('/@/views/dashboard/hostAlbum/index.vue'),
      meta: {
        title: 'Host Album & Story',
      },
    },
    {
      path: 'userAlbum',
      name: 'UserAlbum',
      component: () => import('/@/views/dashboard/userAlbum/index.vue'),
      meta: {
        title: 'User Album & Story',
      },
    },
    {
      path: 'textContent',
      name: 'TextContent',
      component: () => import('/@/views/dashboard/textContent/index.vue'),
      meta: {
        title: 'Text Content',
      },
    },
    {
      path: 'feedback',
      name: 'Feedback',
      component: () => import('/@/views/dashboard/feedback/index.vue'),
      meta: {
        title: 'Feedback',
      },
    },
    {
      path: 'service',
      name: 'Service',
      component: () => import('/@/views/dashboard/service/index.vue'),
      meta: {
        title: 'Online Service',
      },
    },
  ],
};

export default dashboard;
