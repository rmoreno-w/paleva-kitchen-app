<script setup lang="ts">
import { formatCurrency, formatDate, statusTranslations } from '../helpers/functions';
import { OrdersResult, statusKeys } from '../types';

defineProps<{
    orders: Partial<OrdersResult['orders']>;
}>();
</script>

<template>
    <section
        v-for="[orderStatus, orderEntries] in Object.entries(orders)"
        :key="orderStatus"
        class="mb-10 last:mb-0 flex flex-col gap-6"
    >
        <h2>Pedidos com Status "{{ statusTranslations[orderStatus as statusKeys] }}"</h2>
        <ul class="flex flex-col gap-4">
            <li
                v-for="order in orderEntries"
                :key="order.code"
                class="hover:cursor-pointer border border-projectPurple p-4 rounded-lg w-fit"
            >
                <RouterLink :to="{ path: `/order/${order.code}` }">
                    <h3 class="">
                        Pedido - <span class="text-projectGreen">#</span
                        ><span class="text-projectPurple">{{ order.code }}</span>
                    </h3>
                    <p><span class="font-bold">Cliente: </span>{{ order.customer_name }}</p>
                    <p><span class="font-bold">Data: </span>{{ formatDate(order.date) }}</p>
                    <p><span class="font-bold">Total: </span>{{ formatCurrency(order.total) }}</p>
                </RouterLink>
            </li>
        </ul>
    </section>
</template>
