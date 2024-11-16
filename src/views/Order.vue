<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { formatCurrency, formatDate, statusTranslations } from '../helpers/functions';
import { Order } from '../types';

const route = useRoute();
const router = useRouter();
const orderCode = route.params.code;
const restaurantCode = localStorage.getItem('restaurantCode');
const toast = useToast();

const order = ref<Order>({} as Order);
const numberOfItems = computed(() => {
    return order.value.items ? order.value.items.length : 0;
});

async function getOrder() {
    axios
        .get<{ order: Order }>(
            `http://localhost:3000/api/v1/order?restaurant_code=${restaurantCode}&order_code=${orderCode}`
        )
        .then((response) => {
            order.value = response.data.order;
            console.log(response.data.order);
        })
        .catch((e) => {
            console.log(e.status);
            toast.error(`Ops! :( Houve um erro ao buscar o Pedido no servidor`, {
                timeout: 2000,
            });
        });
}

onMounted(async () => {
    getOrder();
});

async function changeStatus(action: string) {
    axios
        .post(`http://localhost:3000/api/v1/order/${action}?restaurant_code=${restaurantCode}&order_code=${orderCode}`)
        .then((response) => {
            console.log(response.data);

            const status = action == 'prepare' ? 'Preparando' : 'Pronto';
            toast.success(`Status alterado para "${status}" com sucesso!`, {
                timeout: 2000,
            });

            getOrder();
        })
        .catch((e) => {
            console.log(e.status);
            toast.error(`Ops! :( Erro ao tentar alterar o status no servidor`, {
                timeout: 2000,
            });
        });
}

function redirectBack() {
    router.back();
}
</script>

<template>
    <button
        @click="redirectBack"
        class="h-fit w-fit underline decoration-2 underline-offset-8 decoration-projectPurple mb-10 font-bold"
    >
        <span class="text-projectPurple"><</span> Voltar para Pedidos
    </button>
    <div class="flex justify-between">
        <div>
            <h1>Pedido - <span class="text-projectGreen">#</span>{{ orderCode }}</h1>
            <h2 class="mt-4 text-projectBlack">
                Data: <span class="text-projectPurple" v-if="order.date">{{ formatDate(order.date) }}</span> | Status:
                <span class="text-projectPurple">{{ statusTranslations[order.status] }}</span>
            </h2>
        </div>

        <nav class="flex flex-col items-center">
            <p class="font-bold">Alterar Status para</p>
            <div class="flex gap-4">
                <button class="form_button" v-if="order.status !== 'preparing'" @click="changeStatus('prepare')">
                    Preparando
                </button>
                <button class="form_button" v-if="order.status !== 'ready'" @click="changeStatus('mark_ready')">
                    Pronto
                </button>
            </div>
        </nav>
    </div>

    <p class="mt-10 mb-4" v-if="numberOfItems == 1">
        <span class="text-projectPurple font-bold">{{ numberOfItems }}</span>
        Item no Pedido:
    </p>

    <p class="mt-10 mb-4" v-else-if="numberOfItems > 1">
        <span class="text-projectPurple font-bold">{{ numberOfItems }}</span>
        Itens no Pedido:
    </p>

    <ul class="flex flex-col gap-2 border-2 border-projectPurple rounded-md p-2 bg-projectPaperWhite">
        <li class="grid grid-cols-5 border-b border-projectPurple pb-2 -mx-2">
            <span class="text-center font-bold text-projectPurple">Nome do Item</span>
            <span class="text-center font-bold text-projectPurple">Observações do Cliente</span>
            <span class="text-center font-bold text-projectPurple">Descrição da Porção</span>
            <span class="text-center font-bold text-projectPurple">Número de Porções</span>
            <span class="text-center font-bold text-projectPurple">Sub-Total</span>
        </li>

        <li
            class="grid grid-cols-5 border-b last:border-0 border-projectPurple border-dashed py-2"
            v-for="item in order.items"
        >
            <span class="text-center font-mono">{{ item.item_name }}</span>
            <span class="text-center font-mono">{{ item.customer_notes }}</span>
            <span class="text-center font-mono">{{ item.serving_description }}</span>
            <span class="text-center font-mono">{{ item.number_of_servings }}</span>
            <span class="text-center font-mono">{{ formatCurrency(item.subtotal) }}</span>
        </li>
    </ul>

    <div class="grid grid-cols-5 px-2 pt-4">
        <div class="col-start-5 px-2">
            <p class="font-bold text-lg text-center">Total do Pedido:</p>
            <p class="font-bold text-lg text-center text-projectPurple">{{ formatCurrency(order.total) }}</p>
        </div>
    </div>

    <hr class="my-10 border border-projectPurple border-dashed" />

    <section class="flex flex-col gap-2 text-lg">
        <h3 class="text-projectPurple">Dados do Cliente</h3>
        <p>
            <span class="font-bold">Nome: </span>
            {{ order.customer_name }}
        </p>
    </section>
</template>
