<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800 tracking-wide">Lista de Usuarios</h2>
        <button
          @click="abrirModalAgregar"
          class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-5 py-2 rounded-lg transition-all duration-200 shadow"
        >
          + agregar
        </button>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-1">Hotel:</label>
        <select
          v-model="hotelSeleccionado"
          @change="cargarUsuarios"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Selecciona un hotel</option>
          <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
            {{ hotel.nombre }}
          </option>
        </select>
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-3 px-4 font-semibold text-gray-700">Usuario</th>
            <th class="text-left py-3 px-4 font-semibold text-gray-700">Correo</th>
            <th class="text-left py-3 px-4 font-semibold text-gray-700">Rol</th>
            <th class="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in usuarios"
            :key="usuario.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td class="py-3 px-4 text-gray-800">{{ usuario.nombre }}</td>
            <td class="py-3 px-4 text-gray-500">{{ usuario.correo }}</td>
            <td class="py-3 px-4">
              <span
                :class="
                  usuario.rol === 'GERENTE' ? 'bg-blue-900 text-white' : 'bg-yellow-400 text-white'
                "
                class="px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ usuario.rol }}
              </span>
            </td>
            <td class="py-3 px-4 flex gap-2 justify-end">
              <button
                @click="abrirModalEditar(usuario)"
                class="text-gray-500 hover:text-blue-600 transition-colors"
                title="Editar"
              >
                <i class="pi pi-pencil text-lg"></i>
              </button>
              <button
                @click="confirmarEliminar(usuario)"
                class="text-red-500 hover:text-red-700 transition-colors"
                title="Eliminar"
              >
                <i class="pi pi-trash text-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="mostrarModalAgregar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModalAgregar"
    >
      <div class="relative w-full max-w-lg mx-4 animate-fadeIn">
        <button
          @click="cerrarModalAgregar"
          class="absolute top-4 right-4 text-white hover:text-yellow-300 text-xl z-10 transition-colors"
        >
          <i class="pi pi-times"></i>
        </button>
        <AgregarUsuario
          :hotelId="hotelSeleccionado"
          @cancelar="cerrarModalAgregar"
          @registrado="onUsuarioRegistrado"
        />
      </div>
    </div>

    <div
      v-if="mostrarModalEditar"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cerrarModalEditar"
    >
      <div class="relative w-full max-w-lg mx-4 animate-fadeIn">
        <button
          @click="cerrarModalEditar"
          class="absolute top-4 right-4 text-white hover:text-yellow-300 text-xl z-10 transition-colors"
        >
          <i class="pi pi-times"></i>
        </button>
        <EditarUsuario
          :usuario="usuarioSeleccionado"
          @cancelar="cerrarModalEditar"
          @actualizado="onUsuarioActualizado"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import AgregarUsuario from "./AgregarUsuario.vue";
import EditarUsuario from "./EditarUsuario.vue";
import api from "@/services/api";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const usuarios = ref([]);
const hoteles = ref([]);
const hotelSeleccionado = ref(authStore.hotelId);
const cargando = ref(false);
const mostrarModalAgregar = ref(false);
const mostrarModalEditar = ref(false);
const usuarioSeleccionado = ref(null);

async function cargarHoteles() {
  try {
    const response = await api.get("/admin/hoteles");
    hoteles.value = response.data.data;
  } catch (error) {
    Swal.fire("Error", "No se pudo cargar la lista de hoteles", "error");
  }
}

async function cargarUsuarios() {
  if (!hotelSeleccionado.value) return;
  cargando.value = true;
  try {
    const response = await api.get(`/admin/hotelusuarios?hotel=${hotelSeleccionado.value}`);
    usuarios.value = response.data.data.map((staff) => ({
      id: staff.id,
      nombre: staff.user.name,
      correo: staff.user.email ?? "—",
      rol: staff.rol,
      estado: staff.estado,
    }));
  } catch (error) {
    Swal.fire("Error", "No se pudo cargar la lista de usuarios", "error");
  } finally {
    cargando.value = false;
  }
}

onMounted(async () => {
  await cargarHoteles();
  await cargarUsuarios();
});

function abrirModalAgregar() {
  if (!hotelSeleccionado.value) {
    Swal.fire("Atención", "Selecciona un hotel primero.", "warning");
    return;
  }
  mostrarModalAgregar.value = true;
}
function cerrarModalAgregar() {
  mostrarModalAgregar.value = false;
}
function onUsuarioRegistrado() {
  cerrarModalAgregar();
  cargarUsuarios();
}

function abrirModalEditar(usuario) {
  usuarioSeleccionado.value = { ...usuario };
  mostrarModalEditar.value = true;
}
function cerrarModalEditar() {
  mostrarModalEditar.value = false;
  usuarioSeleccionado.value = null;
}
function onUsuarioActualizado(datosActualizados) {
  const idx = usuarios.value.findIndex((u) => u.id === usuarioSeleccionado.value.id);
  if (idx !== -1) {
    usuarios.value[idx] = { ...usuarios.value[idx], ...datosActualizados };
  }
  cerrarModalEditar();
}

async function confirmarEliminar(usuario) {
  const result = await Swal.fire({
    title: "¿Desactivar usuario?",
    text: `¿Estás seguro de desactivar a "${usuario.nombre}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e",
    cancelButtonColor: "#083b7e",
    confirmButtonText: "Sí, desactivar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/admin/hotelusuarios/${usuario.id}`);
      await cargarUsuarios();
      Swal.fire({
        icon: "success",
        title: "Desactivado",
        text: "El usuario fue desactivado.",
        confirmButtonColor: "#083b7e",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo desactivar el usuario", "error");
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
