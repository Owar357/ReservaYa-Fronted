<template>
  <div class="bg-white rounded-2xl shadow-xl p-6">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Editar Usuario</h1>
      <p class="text-sm text-gray-400 mt-1">Modifica los datos del usuario</p>
    </div>

    <!-- Formulario -->
    <div class="flex flex-col gap-4">

      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-gray-700">
          <i class="pi pi-user mr-1"></i> Nombre completo
        </label>
        <InputText v-model="form.nombre" placeholder="Nombre completo" class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-gray-700">
          <i class="pi pi-lock mr-1"></i> Contraseña <span class="text-gray-400 font-normal">(opcional)</span>
        </label>
        <InputText v-model="form.password" type="password" placeholder="••••••••" class="w-full" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold text-gray-700">
          <i class="pi pi-id-card mr-1"></i> Rol
        </label>
        <select v-model="form.rol"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="GERENTE">Gerente</option>
          <option value="RECEPCIONISTA">Recepcionista</option>
        </select>
      </div>

    </div>

    <!-- Botones -->
    <div class="flex gap-3 mt-6">
      <Button label="Cancelar" icon="pi pi-times" @click="emit('cancelar')"
        class="!bg-gray-200 !border-gray-200 !text-gray-700 !font-bold flex-1" />
      <Button label="Guardar Cambios" icon="pi pi-check" @click="guardar"
        :disabled="!form.nombre"
        class="!bg-slate-900 !border-slate-900 !font-bold flex-1" />
    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import Swal from 'sweetalert2'
import api from '@/services/api'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const props = defineProps({
  usuario: { type: Object, required: true }
})

const emit = defineEmits(['cancelar', 'actualizado'])

const form = reactive({
  nombre: '',
  password: '',
  rol: 'RECEPCIONISTA'
})

watch(() => props.usuario, (val) => {
  if (val) {
    form.nombre = val.nombre
    form.rol = val.rol
    form.password = ''
  }
}, { immediate: true })

async function guardar() {
  try {
    const payload = { name: form.nombre, rol: form.rol }
    if (form.password) payload.password = form.password

    await api.put(`/admin/hotelusuarios/${props.usuario.id}`, payload)

    Toast.fire({ icon: 'success', title: 'Usuario actualizado correctamente' })

    emit('actualizado', { nombre: form.nombre, rol: form.rol })

  } catch {
    Toast.fire({ icon: 'error', title: 'Ocurrió un error inesperado' })
  }
}
</script>