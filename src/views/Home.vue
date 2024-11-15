<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import { OrdersResult } from '../types';
import Orders from './Orders.vue';
import RestaurantSelect from './RestaurantSelect.vue';

const restaurantCode = ref<string | undefined>();
const restaurantError = ref<number | undefined>();

const orders = ref<Partial<OrdersResult['orders']>>({} as OrdersResult['orders']);

async function registerRestaurant(event: any) {
    event.preventDefault();
    axios
        .get<OrdersResult>(`http://localhost:3000/api/v1/orders?restaurant_code=${restaurantCode.value}`)
        .then((response) => {
            orders.value = response.data.orders;
            console.log(response.data.orders);
        })
        .catch((e) => (restaurantError.value = e.status));
}

const isRestaurantRegistered = computed(() => {
    console.log(Object.keys(orders.value));
    return Object.keys(orders.value).length > 0;
});
</script>

<template>
    <RestaurantSelect
        v-if="!isRestaurantRegistered"
        v-bind:registerRestaurant="registerRestaurant"
        v-model:restaurantCode="restaurantCode"
        :restaurantError="restaurantError"
    />
    <Orders v-else="isRestaurantRegistered" />
</template>
