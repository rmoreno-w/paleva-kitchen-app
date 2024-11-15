<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { OrdersResult } from '../types';
import RestaurantSelect from './RestaurantSelect.vue';

const route = useRoute();
const router = useRouter();

const restaurantCode = ref<string>((route.query.status as string) || '');
const restaurantError = ref<number | undefined>();

// const orders = ref<Partial<OrdersResult['orders']>>({} as OrdersResult['orders']);

async function registerRestaurant(event: any) {
    event.preventDefault();
    axios
        .get<OrdersResult>(`http://localhost:3000/api/v1/orders?restaurant_code=${restaurantCode.value}`)
        .then((response) => {
            localStorage.setItem('restaurantCode', restaurantCode.value);
            router.push('/orders');
            console.log(response.data.orders);
        })
        .catch((e) => (restaurantError.value = e.status));
}

const isRestaurantRegistered = computed(() => {
    const storedCode = localStorage.getItem('restaurantCode') || '';

    return storedCode;
});
</script>

<template>
    <RestaurantSelect
        v-if="!isRestaurantRegistered"
        v-bind:registerRestaurant="registerRestaurant"
        v-model:restaurantCode="restaurantCode"
        :restaurantError="restaurantError"
    />
    <!-- <Orders :orders="orders" v-else="isRestaurantRegistered" v-bind:filterByStatus /> -->
</template>
