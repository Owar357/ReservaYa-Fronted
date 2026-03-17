<template>
  <div style="height: 100vh; display: flex;">

    <!-- Sidebar: visible en desktop, toggle en móvil -->
    <SideBarAdmin v-show="isDesktop || sidebarOpen" ref="sidebarRef" />

    <!-- Derecha -->
    <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
      <NavBarAdmin @toggleSidebar="sidebarOpen = !sidebarOpen" />
      <div style="flex: 1; padding: 1.5rem; overflow-y: auto;">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavBarAdmin from '@/components/homeAdmin/NavBarAdmin.vue'
import SideBarAdmin from '@/components/homeAdmin/SideBarAdmin.vue'

const sidebarOpen = ref(false)
const windowWidth = ref(window.innerWidth)
const isDesktop = computed(() => windowWidth.value >= 768)
const updateWidth = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))
</script>

<style scoped>
:deep(.p-menubar) {
  width: 100%;
  border-radius: 0;
}
</style>