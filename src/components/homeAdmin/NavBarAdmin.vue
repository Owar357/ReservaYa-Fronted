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
      <div class="flex align-items-center gap-2">
        <span class="font-medium text-white text-lg mt-4">{{ authStore.user?.name }}</span>
        <Avatar icon="pi pi-user" shape="circle" size="large" class="mt-2" />
      </div>
    </template>
  </Menubar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'  // ajusta la ruta

defineEmits(['toggleSidebar'])

const authStore = useAuthStore()

const windowWidth = ref(window.innerWidth)
const isDesktop = computed(() => windowWidth.value >= 768)
const updateWidth = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))
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