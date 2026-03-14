<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-lg font-bold text-gray-800 mb-5">Estadísticas</h2>
      <div class="flex gap-4 mb-6">
        <div class="bg-white rounded-xl shadow px-6 py-4 flex items-center gap-4 min-w-[200px]">
          <div class="bg-blue-100 text-blue-600 rounded-full p-3">
            <i class="pi pi-dollar text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ingresos Totales</p>
            <p class="text-2xl font-bold text-gray-800">$23,450</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow px-6 py-4 flex items-center gap-4 min-w-[200px]">
          <div class="bg-blue-100 text-blue-600 rounded-full p-3">
            <i class="pi pi-check-square text-xl"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Reservas Totales</p>
            <p class="text-2xl font-bold text-gray-800">412</p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-3 mb-6">
        <Button icon="pi pi-chevron-left" text rounded size="small" />
        <span class="text-sm text-gray-600 font-medium">Período: Enero 2024 - Jun 2024</span>
        <Button icon="pi pi-chevron-right" text rounded size="small" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Ingresos Mensuales</h3>

          <div class="flex gap-2" style="height: 180px">
            <div
              class="flex flex-col justify-between text-xs text-gray-400 text-right pb-5"
              style="min-width: 36px"
            >
              <span>$20k</span>
              <span>$15k</span>
              <span>$10k</span>
              <span>$5k</span>
            </div>
            <div class="flex-1 flex items-end gap-2 border-b border-l border-gray-200 pb-5">
              <div
                v-for="bar in bars"
                :key="bar.mes"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <span class="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{{
                  bar.label
                }}</span>
                <div class="w-full bg-blue-500 rounded-t" :style="{ height: bar.heightPx }"></div>
                <span class="text-[10px] text-gray-500">{{ bar.mes }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-sm font-semibold text-gray-700 mb-4">Top 5 Habitaciones Más Rentadas</h3>

          <div class="flex flex-col gap-4">
            <div v-for="(hab, i) in habitaciones" :key="hab.nombre" class="flex flex-col gap-1">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700 font-medium">{{ i + 1 }}. {{ hab.nombre }}</span>
                <span class="text-xs text-gray-500">{{ hab.reservas }} reservas</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  :style="{ width: hab.porcentaje }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";

const bars = [
  { mes: "Ene", label: "$12,000", heightPx: "72px" },
  { mes: "Feb", label: "$15,500", heightPx: "93px" },
  { mes: "Mar", label: "$9,800", heightPx: "59px" },
  { mes: "Abr", label: "$11,200", heightPx: "67px" },
  { mes: "May", label: "$17,200", heightPx: "103px" },
  { mes: "Jun", label: "$14,300", heightPx: "86px" },
];

const habitaciones = [
  { nombre: "Suite Deluxe", reservas: 32, porcentaje: "100%" },
  { nombre: "Habitación 203", reservas: 28, porcentaje: "87%" },
  { nombre: "Habitación 305", reservas: 25, porcentaje: "78%" },
  { nombre: "Villa Premium", reservas: 21, porcentaje: "65%" },
  { nombre: "Habitación 102", reservas: 19, porcentaje: "59%" },
];
</script>
