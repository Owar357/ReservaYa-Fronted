<template>
    <div class="w-64 h-screen flex flex-col p-6 flex-shrink-0" style="border-right: 1px solid #1e3a5f;">

        <div class="flex align-items-center gap-2 mb-4">
            <i class=" pi pi-home  mt-1 mr-0 text-primary text-2xl"></i>
            <span class="text-xl font-bold">AdminPanel</span>
        </div>

        <!-- Dashboard -->
        <!-- <div @click="activeItem = 'dashboard'" class="flex align-items-center p-3 border-round cursor-pointer mb-1"
            :class="activeItem === 'dashboard' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-chart-bar mr-2"></i>
            <span class="font-medium">Analíticas</span>
        </div> -->


        <hr class="my-3" />

        <!-- Label SISTEMA -->
        <p class="text-xs font-semibold text-500 mb-2">REGISTROS</p>

        <!-- Usuarios -->
        <div @click="navigate('/admin/usuarios')" class="flex align-items-center p-3 border-round cursor-pointer mb-1"
            :class="activeItem === 'usuarios' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-users mr-2"></i>
            <span class="font-medium">Usuarios</span>
        </div>


        <div @click="navigate('/admin/hoteles')" class="flex align-items-center p-3 border-round cursor-pointer mb-1"
            :class="activeItem === 'hoteles' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-building mr-2"></i>
            <span class="font-medium">Hoteles</span>
        </div>


        <div @click="navigate('/admin/habitaciones')"
            class="flex align-items-center p-3 border-round cursor-pointer mb-1"
            :class="activeItem === 'habitaciones' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-table mr-2"></i>
            <span class="font-medium">Habitaciones</span>
        </div>



        <!--   <div @click="activeItem = 'reservas'" class="flex align-items-center p-3 border-round cursor-pointer mb-1"
            :class="activeItem === 'reservas' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-inbox mr-2"></i>
            <span class="font-medium">Reservas</span>
        </div>
  -->



        <hr class="my-3" />

        
        <p class="text-xs font-semibold text-500 mb-2">SISTEMA</p>

        <div @click="navigate('/admin/reportes')" class="flex align-items-center p-3 border-round cursor-pointer"
            :class="activeItem === 'reportes' ? 'bg-primary text-white' : 'text-700 hover:surface-100'">
            <i class="pi pi-file-pdf mr-2"></i>
            <span class="font-medium">Reportes</span>
        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()  // ← faltaba esto

const activeItem = computed(() => {
    if (route.path.includes('usuarios')) return 'usuarios'
    if (route.path.includes('habitaciones')) return 'habitaciones'
    if (route.path.includes('hoteles')) return 'hoteles'
    if (route.path.includes('reservas')) return 'reservas'
    if (route.path.includes('reportes')) return 'reportes'
    return 'dashboard'
})

const navigate = (ruta) => {
    router.push(ruta)  // ← ya no necesitas activeItem.value aquí
}
</script>