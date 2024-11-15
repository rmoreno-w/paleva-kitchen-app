<script setup lang="ts">
import Orders from './Orders.vue';
import RestaurantSelect from './RestaurantSelect.vue';
const laPergunta = true;
</script>

<template>
    <RestaurantSelect v-if="laPergunta" />
    <Orders v-else="laPergunta" />
</template>
