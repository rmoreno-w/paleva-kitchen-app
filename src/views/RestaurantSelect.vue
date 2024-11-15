<script setup lang="ts">
defineProps<{
    registerRestaurant: (event: any) => void;
    restaurantCode: string | undefined;
    restaurantError: number | undefined;
}>();

const restaurantCode = defineModel('restaurantCode');
</script>

<template>
    <h1>Selecionar Restaurante</h1>

    <form class="flex flex-col max-w-[50%] gap-4 mt-10">
        <input v-model="restaurantCode" class="input" />
        <button @click="registerRestaurant" class="form_button">Fixar Restaurante</button>
    </form>
    <div class="mt-4">
        <p class="font-medium text-projectRed" v-if="restaurantError == 404">Ops! :( Código de Restaurante inválido</p>
        <p class="font-medium text-projectRed" v-else-if="restaurantError">
            Ops! :( Houve um erro ao buscar por este restaurante
        </p>
    </div>
</template>
