<script setup lang="ts">
const logoSrc = '/PaLeva_Logo.svg';
</script>

<template>
    <header class="site-header">
        <RouterLink to="/">
            <div class="w-20 lg:w-auto">
                <img :src="logoSrc" />
            </div>
        </RouterLink>

        <h1 class="flex-1 text-center text-2xl font-bold text-projectPurple">App Cozinha</h1>
    </header>
</template>
