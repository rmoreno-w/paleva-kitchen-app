<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import FilteredOrderList from '../components/FilteredOrderList .vue';
import UnfilteredOrderList from '../components/UnfilteredOrderList.vue';
import { statusTranslations } from '../helpers/functions';
import { OrdersResult, statusKeys } from '../types';

const orders = ref<OrdersResult['orders']>({} as OrdersResult['orders']);
const currentFilter = ref<statusKeys | ''>('');
const restaurantCode = localStorage.getItem('restaurantCode') || '';

const translatedStatus = computed(() => {
    return currentFilter.value ? statusTranslations[currentFilter.value] : '';
});

onMounted(async () => {
    getOrders();
});

async function getOrders() {
    axios
        .get<OrdersResult>(`http://localhost:3000/api/v1/orders?restaurant_code=${restaurantCode}`)
        .then((response) => {
            orders.value = response.data.orders;
            console.log(response.data.orders);
        })
        .catch((e) => console.log(e.status));
}

async function filterByStatus(status: string) {
    currentFilter.value = status as statusKeys;
    axios
        .get<OrdersResult>(`http://localhost:3000/api/v1/orders?restaurant_code=${restaurantCode}&status=${status}`)
        .then((response) => {
            orders.value = response.data.orders;
            console.log(response.data.orders);
        })
        .catch((e) => console.log(e.status));
}

function isFilterActive(filter: string) {
    return currentFilter.value == filter;
}
</script>

<template>
    <nav class="my-10 border-y border-projectPurple p-2 flex justify-between items-center">
        <div class="flex flex-wrap gap-2 items-center">
            <span class="font-bold text-projectPurple">Filtrar:</span>
            <button :class="[isFilterActive('') ? 'tag_button' : 'tag_outline_button']" @click="filterByStatus('')">
                Todos
            </button>
            <button
                :class="[isFilterActive('waiting_kitchen_approval') ? 'tag_button' : 'tag_outline_button']"
                @click="filterByStatus('waiting_kitchen_approval')"
            >
                Esperando Aprovação da Cozinha
            </button>
            <button
                :class="[isFilterActive('preparing') ? 'tag_button' : 'tag_outline_button']"
                @click="filterByStatus('preparing')"
            >
                Preparando
            </button>
            <button
                :class="[isFilterActive('canceled') ? 'tag_button' : 'tag_outline_button']"
                @click="filterByStatus('canceled')"
            >
                Cancelado
            </button>
            <button
                :class="[isFilterActive('ready') ? 'tag_button' : 'tag_outline_button']"
                @click="filterByStatus('ready')"
            >
                Pronto
            </button>
            <button
                :class="[isFilterActive('delivered') ? 'tag_button' : 'tag_outline_button']"
                @click="filterByStatus('delivered')"
            >
                Entregue
            </button>
        </div>
    </nav>

    <UnfilteredOrderList v-if="!Array.isArray(orders)" :orders="orders" />

    <FilteredOrderList v-if="Array.isArray(orders)" :orders="orders" :filter="translatedStatus" />
    <p v-if="Array.isArray(orders) && orders.length == 0" class="flex items-center">
        <span class="text-xl pr-2">🕐</span> Ainda não há pedidos cadastrados
        <span v-if="currentFilter !== ''">&nbsp;com este filtro</span>.
    </p>
</template>
