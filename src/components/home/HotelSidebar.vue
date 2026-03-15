<template>
    <aside class="w-56 min-w-16 bg-gray-100 p-4 min-h-screen">
        <h2 class="font-bold text-sm mb-4">Filtra por</h2>

        <div v-for="group in filters" :key="group.id" class="mb-4">
            <p class="font-bold text-sm mb-2">{{ group.label }}:</p>

            <div class="flex flex-col gap-1">
                <label v-for="opt in group.options" :key="opt"
                    class="flex justify-between items-center cursor-pointer py-1 "
                    @click="$emit('toggle', group.id, opt)">
                    <span class="text-sm" :class="{ 'text-red-800 font-semibold': isSelected(group.id, opt) }">
                        {{ opt }}
                    </span>
                    <div style="border: 2px solid #666; background: white; width: 16px; height: 16px; border-radius: 3px; display: flex; align-items: center; justify-content: center;"
                        :style="isSelected(group.id, opt) ? 'background: lightblue; border-color: #111;' : ''">
                        <svg v-if="isSelected(group.id, opt)" width="10" height="8" viewBox="0 0 10 8" fill="none">
                        </svg>
                    </div>
                </label>
            </div>
        </div>
    </aside>
</template>


<script setup>
const props = defineProps({
    selected: {
        type: Object,
        default: () => ({})  // ← si no llega nada, usa objeto vacío
    }
})

defineEmits(['toggle'])

const filters = [  // ← datos estáticos aquí
    {
        id: 'precio',
        label: 'Precio',
        options: ['$0.00 - $50.00', '$50.00 - $150.00', '$150.00 - $300.00', '$300.00 - $500.00'],
    },
    {
        id: 'departamento',
        label: 'Lugar',
        options: ['San Salvador', 'Chalatenango', 'Cabañas', 'San Miguel', 'Cuscatlán', 'La Paz', 'La Libertad', 'Sonsonate', 'Ahuachapán', 'Santa Ana', 'Morazán', 'La Unión'],
    },
]

const isSelected = (groupId, value) => {
    return props.selected[groupId] === value
}
</script>