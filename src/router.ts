import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from './views/404NotFound.vue';
import CancelOrderView from './views/CancelOrder.vue';
import HomeView from './views/Home.vue';
import OrderView from './views/Order.vue';
import OrdersView from './views/Orders.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/orders', component: OrdersView, meta: { requiresRestaurantCode: true } },
    { path: '/order/:code', component: OrderView, meta: { requiresRestaurantCode: true } },
    { path: '/order/:code/cancel', component: CancelOrderView, meta: { requiresRestaurantCode: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _) => {
    const isRestaurantCodeSaved = localStorage.getItem('restaurantCode');

    if (to.meta.requiresRestaurantCode === true && !isRestaurantCodeSaved) {
        return {
            path: '/',
        };
    }

    if (to.path === '/' && isRestaurantCodeSaved) {
        return {
            path: '/orders',
        };
    }
});

export default router;
