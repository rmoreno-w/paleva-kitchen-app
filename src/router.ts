import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from './views/404NotFound.vue';
import HomeView from './views/Home.vue';
import OrderView from './views/Order.vue';
import OrdersView from './views/Orders.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/orders', component: OrdersView },
    { path: '/order/:code', component: OrderView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from) => {
//     if (to !== ) {
//       // initial navigation
//     }
//   })

export default router;
