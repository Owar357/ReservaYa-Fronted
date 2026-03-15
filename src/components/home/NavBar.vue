<template>
    <nav class="w-full bg-[#2a9db0] px-6 py-3 flex items-center gap-4">
        <!-- Logo -->
        <span class="text-white font-bold text-xl whitespace-nowrap">ReservaYa!</span>
        
        <!-- Buscador centrado -->
        <div class="flex-1 flex justify-center">
            <InputText placeholder="Buscar Hotel..." type="text" class="w-full max-w-xl" />
        </div>
        
        <!-- Links a la derecha -->
        <div class="flex items-center gap-4 ml-auto">
            <router-link to="/hoteles" class="text-white font-medium whitespace-nowrap">Hoteles</router-link>
            <router-link 
                v-if="authStore.isAuthenticated && authStore.isUsuario"
                to="/mis-reservas" 
                class="text-white font-medium whitespace-nowrap">
                Mis Reservas
            </router-link>
            <Avatar icon="pi pi-user" shape="circle" class="bg-white cursor-pointer" />
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";


const authStore = useAuthStore();

const items = ref([
    { label: 'Hoteles', icon: 'pi pi-building' },
    { label: 'Mis Reservas', icon: 'pi pi-calendar' }
])
</script>


<style scoped>
:deep(a) {
    text-decoration: none;
}
</style>
