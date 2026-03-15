<template>
    <div class="flex-1 flex flex-col gap-3">
        <div v-for="(hotel, index) in hotels" :key="hotel.id"
            class="flex items-center p-4 gap-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-[#d2e8ee] transition cursor-pointer">

            <div class="w-36 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img :src="hotel.imagen" :alt="hotel.nombre" class="w-full h-full object-cover" />
            </div>

            <div class="flex-1">
                <p class="text-sm text-gray-500">{{ hotel.direccion }}</p>
                <p class="font-semibold text-gray-800">{{ hotel.nombre }}</p>
            </div>

            <div class="flex flex-col items-end gap-3 flex-shrink-0">
                <div class="text-right">
                    <p class="text-xl font-bold">${{ hotel.habitaciones_min_precio ?? 'N/A' }}</p>
                    <p class="text-xs font-semibold">Precio/Noche desde</p>
                </div>
                <div class="flex gap-2 items-center">
                    <button @click="$emit('toggleFavorite', hotel)"
                        class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-red-400 hover:text-red-400 transition"
                        :class="{ 'border-red-400 text-red-400': hotel.favorite }">
                        <i :class="hotel.favorite ? 'pi pi-heart-fill' : 'pi pi-heart'" />
                    </button>
                    <button @click="$emit('verHabitaciones', hotel)"
                        class="px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition">
                        Ver Habitaciones
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    hotels: {
        type: Array,
        default: () => []
    }
})

defineEmits(['toggleFavorite', 'verHabitaciones'])
</script>