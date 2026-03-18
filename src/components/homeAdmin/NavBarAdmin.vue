<template>
  <Menubar class="navbar" :model="[]">
    <template #start>
      <div class="flex align-items-center gap-2">
        <Button 
          v-if="!isDesktop"
          icon="pi pi-bars" 
          @click="$emit('toggleSidebar')" 
          text 
        />
        <span class="font-bold text-3xl text-white mt-2">ReservaYa!</span>
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2 relative">
        <span class="font-medium text-white text-lg mt-4">{{ authStore.user?.name }}</span>
        
        <!-- Avatar con click -->
        <Avatar 
          icon="pi pi-user" 
          shape="circle" 
          size="large" 
          class="mt-2 cursor-pointer"
          @click="menuOpen = !menuOpen"
        />

        <!-- Dropdown -->
        <div v-if="menuOpen" class="absolute right-0 top-14 bg-white rounded-lg shadow-lg w-44 z-50">
          <div class="px-4 py-3 border-b">
            <p class="text-sm font-semibold text-gray-800">{{ authStore.user?.name }}</p>
            <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
          </div>
          <button 
            @click="logout"
            class="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2 transition">
            <i class="pi pi-sign-out" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

defineEmits(['toggleSidebar'])

const authStore = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)

const windowWidth = ref(window.innerWidth)
const isDesktop = computed(() => windowWidth.value >= 768)
const updateWidth = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

const logout = async () => {
  await authStore.logout()
  menuOpen.value = false
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: #0f172a;  /* mismo color oscuro del sidebar */
  border: none;
  border-radius: 0;
  padding: 1.75rem 1.5rem;
}

.navbar :deep(.p-menubar-start) {
  color: white;
}

.navbar :deep(.p-menubar-end) {
  color: white;
}


</style>