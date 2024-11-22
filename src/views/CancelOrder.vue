<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const route = useRoute();
const orderCode = route.params.code;
const restaurantCode = localStorage.getItem('restaurantCode');
const toast = useToast();

const annotation = ref('');

async function cancelOrder(e: any) {
    e.preventDefault();

    axios
        .post(`http://localhost:3000/api/v1/order/cancel?restaurant_code=${restaurantCode}&order_code=${orderCode}`, {
            annotation: annotation.value,
        })
        .then((response) => {
            console.log(response.data);

            toast.success(`Status alterado para "cancelado" com sucesso!`, {
                timeout: 2000,
            });

            router.back();
        })
        .catch((e) => {
            console.log(e.status);
            toast.error(`Ops! :( Erro ao tentar alterar o status no servidor`, {
                timeout: 2000,
            });
            router.back();
        });
}
</script>

<template>
    <button
        @click="router.back"
        class="h-fit w-fit underline decoration-2 underline-offset-8 decoration-projectPurple mb-10 font-bold"
    >
        <span class="text-projectPurple"><</span> Voltar para Pedido {{ orderCode }}
    </button>

    <h1>Cancelar Pedido:</h1>

    <form class="flex flex-col max-w-[50%] gap-4 mt-10">
        <label class="input_label">Descreva em poucas palavras a causa do cancelamento do pedido:</label>
        <input v-model="annotation" class="input" />
        <button @click="cancelOrder" class="form_button">Cancelar Pedido</button>
    </form>
</template>
