<template>
  <div class="p-6 min-h-screen bg-gray-50">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Lista de Usuarios</h1>
      <Button label="Agregar Usuario" icon="pi pi-plus" @click="abrirModalAgregar"
        class="!bg-slate-900 !border-slate-900 !font-bold !text-base !px-6 !py-3" />
    </div>

    <!-- Selector de hotel -->
    <div class="mb-6 flex items-center gap-3">
      <label class="text-sm font-semibold text-gray-700">
        <i class="pi pi-building mr-1"></i> Hotel:
      </label>
      <select v-model="hotelSeleccionado" @change="cargarUsuarios"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-52">
        <option value="">Selecciona un hotel</option>
        <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
          {{ hotel.nombre }}
        </option>
      </select>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl shadow-md overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="text-left py-4 px-6 font-semibold text-gray-700">Usuario</th>
            <th class="text-left py-4 px-6 font-semibold text-gray-700">Correo</th>
            <th class="text-left py-4 px-6 font-semibold text-gray-700">Rol</th>
            <th class="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="usuarios.length === 0">
            <td colspan="4" class="text-center py-20 text-gray-400">
              <i class="pi pi-users text-5xl mb-4 block"></i>
              <p class="text-lg">No hay usuarios registrados</p>
            </td>
          </tr>
          <tr v-for="usuario in usuarios" :key="usuario.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="py-4 px-6 font-medium text-gray-800">{{ usuario.nombre }}</td>
            <td class="py-4 px-6 text-gray-500">{{ usuario.correo }}</td>
            <td class="py-4 px-6">
              <span class="px-3 py-1 rounded-full text-xs font-bold"
                :class="usuario.rol === 'GERENTE' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'">
                {{ usuario.rol }}
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex gap-2 justify-end">
                <button @click="abrirModalEditar(usuario)"
                  class="w-9 h-9 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">
                  <i class="pi pi-pencil"></i>
                </button>
                <button @click="confirmarEliminar(usuario)"
                  class="w-9 h-9 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Agregar -->
    <div v-if="mostrarModalAgregar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModalAgregar">
      <div class="relative w-full max-w-lg mx-4">
        <button @click="cerrarModalAgregar"
          class="absolute top-4 right-4 text-white hover:text-gray-300 text-xl z-10 transition-colors">
          <i class="pi pi-times"></i>
        </button>
        <AgregarUsuario :hotelId="hotelSeleccionado" @cancelar="cerrarModalAgregar"
          @registrado="onUsuarioRegistrado" />
      </div>
    </div>

    <!-- Modal Editar -->
    <div v-if="mostrarModalEditar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModalEditar">
      <div class="relative w-full max-w-lg mx-4">
        <button @click="cerrarModalEditar"
          class="absolute top-4 right-4 text-white hover:text-gray-300 text-xl z-10 transition-colors">
          <i class="pi pi-times"></i>
        </button>
        <EditarUsuario :usuario="usuarioSeleccionado" @cancelar="cerrarModalEditar"
          @actualizado="onUsuarioActualizado" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Swal from "sweetalert2"
import AgregarUsuario from "./AgregarUsuario.vue"
import EditarUsuario from "../Usuarios/EditarUsuario.vue"
import api from "@/services/api"
import { useAuthStore } from "@/stores/authStore"

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const authStore = useAuthStore()
const usuarios = ref([])
const hoteles = ref([])
const hotelSeleccionado = ref(authStore.hotelId)
const cargando = ref(false)
const mostrarModalAgregar = ref(false)
const mostrarModalEditar = ref(false)
const usuarioSeleccionado = ref(null)

async function cargarHoteles() {
  try {
    const response = await api.get("/admin/hoteles")
    hoteles.value = response.data.data
  } catch {
    Toast.fire({ icon: 'error', title: 'No se pudo cargar los hoteles' })
  }
}

async function cargarUsuarios() {
  if (!hotelSeleccionado.value) return
  cargando.value = true
  try {
    const response = await api.get(`/admin/hotelusuarios?hotel=${hotelSeleccionado.value}`)
    usuarios.value = response.data.data.map((staff) => ({
      id: staff.id,
      nombre: staff.user.name,
      correo: staff.user.email ?? "—",
      rol: staff.rol,
      estado: staff.estado,
    }))
  } catch {
    Toast.fire({ icon: 'error', title: 'No se pudo cargar los usuarios' })
  } finally {
    cargando.value = false
  }
}

onMounted(async () => {
  await cargarHoteles()
  await cargarUsuarios()
})

function abrirModalAgregar() {
  if (!hotelSeleccionado.value) {
    Toast.fire({ icon: 'warning', title: 'Selecciona un hotel primero' })
    return
  }
  mostrarModalAgregar.value = true
}

function cerrarModalAgregar() {
  mostrarModalAgregar.value = false
}

function onUsuarioRegistrado() {
  cerrarModalAgregar()
  cargarUsuarios()
  Toast.fire({ icon: 'success', title: 'Usuario registrado correctamente' })
}

function abrirModalEditar(usuario) {
  usuarioSeleccionado.value = { ...usuario }
  mostrarModalEditar.value = true
}

function cerrarModalEditar() {
  mostrarModalEditar.value = false
  usuarioSeleccionado.value = null
}

function onUsuarioActualizado(datosActualizados) {
  const idx = usuarios.value.findIndex((u) => u.id === usuarioSeleccionado.value.id)
  if (idx !== -1) {
    usuarios.value[idx] = { ...usuarios.value[idx], ...datosActualizados }
  }
  cerrarModalEditar()
  Toast.fire({ icon: 'success', title: 'Usuario actualizado correctamente' })
}

async function confirmarEliminar(usuario) {
  const result = await Swal.fire({
    title: "¿Desactivar usuario?",
    text: `¿Estás seguro de desactivar a "${usuario.nombre}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Sí, desactivar",
    cancelButtonText: "Cancelar",
  })

  if (result.isConfirmed) {
    try {
      await api.delete(`/admin/hotelusuarios/${usuario.id}`)
      await cargarUsuarios()
      Toast.fire({ icon: 'success', title: 'Usuario desactivado correctamente' })
    } catch {
      Toast.fire({ icon: 'error', title: 'No se pudo desactivar el usuario' })
    }
  }
}
</script>