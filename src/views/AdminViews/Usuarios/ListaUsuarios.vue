<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Tabla de usuarios -->
    <div class="bg-white rounded-2xl shadow-md p-6 max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 tracking-wide">Lista de Usuarios</h2>
        <button
          @click="abrirModalAgregar"
          class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-5 py-2 rounded-lg transition-all duration-200 shadow"
        >
          + agregar
        </button>
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
                  usuario.rol === 'Gerente' ? 'bg-blue-900 text-white' : 'bg-yellow-400 text-white'
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
        <AgregarUsuario @cancelar="cerrarModalAgregar" @registrado="onUsuarioRegistrado" />
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
import { ref } from "vue";
import Swal from "sweetalert2";
import AgregarUsuario from "./AgregarUsuario.vue";
import EditarUsuario from "./EditarUsuario.vue";

const usuarios = ref([
  {
    id: 1,
    nombre: "Juan Gonzalo",
    correo: "juan@go.com",
    rol: "Recepcionista",
    telefono: "7777-1111",
  },
  {
    id: 2,
    nombre: "Carlos Miranda",
    correo: "Carlos.mir@anda.com",
    rol: "Gerente",
    telefono: "7777-2222",
  },
  {
    id: 4,
    nombre: "marta duran",
    correo: "martajuli@gmil.com",
    rol: "Recepcionista",
    telefono: "7777-4444",
  },
]);

const mostrarModalAgregar = ref(false);
const mostrarModalEditar = ref(false);
const usuarioSeleccionado = ref(null);

function abrirModalAgregar() {
  mostrarModalAgregar.value = true;
}
function cerrarModalAgregar() {
  mostrarModalAgregar.value = false;
}
function onUsuarioRegistrado(nuevoUsuario) {
  usuarios.value.push({ id: Date.now(), ...nuevoUsuario });
  cerrarModalAgregar();
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
    title: "¿Eliminar usuario?",
    text: `¿Estás seguro de eliminar a "${usuario.nombre}"? Esta acción no se puede deshacer.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e53e3e",
    cancelButtonColor: "#083b7e",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    usuarios.value = usuarios.value.filter((u) => u.id !== usuario.id);
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "El usuario fue eliminado correctamente.",
      confirmButtonColor: "#083b7e",
      timer: 2000,
      showConfirmButton: false,
    });
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
