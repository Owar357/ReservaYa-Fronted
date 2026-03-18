<template>
  <div class="lista-habitaciones">
    <div class="card">

      <div class="header">
        <h2 class="titulo">Lista de Habitaciones</h2>
        <button class="btn-agregar" @click="abrirModalAgregar">
          <i class="pi pi-plus"></i> Agregar
        </button>
      </div>

      <!-- Selector de hotel -->
      <div class="selec">
        <label class="selec-input">Hotel:</label>
        <div class="select-wrap">
          <select v-model="hotelSeleccionado" class="hotel-select" @change="cargarHabitaciones">
            <option value="" disabled>Seleccionar hotel</option>
            <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
              {{ hotel.nombre }}
            </option>
          </select>
          <i class="pi pi-chevron-down chevron"></i>
        </div>
      </div>

      <!-- Estados -->
      <div v-if="store.loading" class="estado-msg">
        <i class="pi pi-spin pi-spinner"></i> Cargando habitaciones...
      </div>
      <div v-else-if="store.error" class="estado-msg error">
        <i class="pi pi-exclamation-triangle"></i> {{ store.error }}
      </div>
      <div v-else-if="!hotelSeleccionado" class="estado-msg">
        Selecciona un hotel para ver sus habitaciones.
      </div>
      <div v-else-if="store.habitaciones.length === 0" class="estado-msg">
        No hay habitaciones registradas para este hotel.
      </div>

      <!-- Tabla -->
      <table v-else class="tabla">
        <thead>
          <tr>
            <th>Habitación</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hab in store.habitaciones" :key="hab.id">
            <td class="nombre">{{ hab.nombre }}</td>
            <td class="descripcion">{{ hab.descripcion || '—' }}</td>
            <td class="acciones">
              <button class="btn-icono btn-editar" @click="abrirEditar(hab)" title="Editar">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="btn-icono btn-eliminar" @click="confirmarEliminar(hab)" title="Eliminar">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- ── Modal Agregar ── -->
    <div v-if="modalAgregar" class="modal-overlay" @click.self="modalAgregar = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-titulo">Agregar Habitación</h3>
          <button class="btn-cerrar" @click="modalAgregar = false">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="campo">
          <label>Nombre <span class="req">*</span></label>
          <input v-model="formAgregar.nombre" type="text" placeholder="Ej: Suite Presidencial" />
        </div>
        <div class="campo">
          <label>Descripción</label>
          <input v-model="formAgregar.descripcion" type="text" placeholder="Descripción opcional" />
        </div>
        <div class="campo">
          <label>Hotel <span class="req">*</span></label>
          <div class="select-wrap">
            <select v-model="formAgregar.hotel_id" class="hotel-select">
              <option value="" disabled>Seleccionar hotel</option>
              <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
                {{ hotel.nombre }}
              </option>
            </select>
            <i class="pi pi-chevron-down chevron"></i>
          </div>
        </div>
        <p v-if="formError" class="form-error">{{ formError }}</p>
        <div class="modal-botones">
          <button class="btn-accion btn-cancelar" @click="modalAgregar = false">
            <i class="pi pi-times"></i> Cancelar
          </button>
          <button class="btn-guardar" :disabled="guardando" @click="guardarNueva">
            <i :class="guardando ? 'pi pi-spin pi-spinner' : 'pi pi-check'"></i>
            {{ guardando ? 'Guardando...' : 'Agregar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Modal Editar ── -->
    <div v-if="modalEditar" class="modal-overlay" @click.self="modalEditar = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-titulo">Editar Habitación</h3>
          <button class="btn-cerrar" @click="modalEditar = false">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="campo">
          <label>Nombre <span class="req">*</span></label>
          <input v-model="formEditar.nombre" type="text" />
        </div>
        <div class="campo">
          <label>Descripción</label>
          <input v-model="formEditar.descripcion" type="text" />
        </div>
        <p v-if="formError" class="form-error">{{ formError }}</p>
        <div class="modal-botones">
          <button class="btn-accion btn-cancelar" @click="modalEditar = false">
            <i class="pi pi-times"></i> Cancelar
          </button>
          <button class="btn-guardar" :disabled="guardando" @click="guardarEdicion">
            <i :class="guardando ? 'pi pi-spin pi-spinner' : 'pi pi-check'"></i>
            {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useTipoHabitacionesStore } from '@/stores/TipoHabitacionStore'
import { useHotelStore } from '@/stores/hotelStore'

const store      = useTipoHabitacionesStore()
const hotelStore = useHotelStore()

const hoteles           = ref([])
const hotelSeleccionado = ref('')
const modalAgregar      = ref(false)
const modalEditar       = ref(false)
const guardando         = ref(false)
const formError         = ref('')
const habitacionEditando = ref(null)

const formAgregar = ref({ nombre: '', descripcion: '', hotel_id: '' })
const formEditar  = ref({ nombre: '', descripcion: '' })

onMounted(async () => {
  await hotelStore.fetchHoteles()
  hoteles.value = hotelStore.hoteles
})

async function cargarHabitaciones() {
  await store.fetchHabitaciones(hotelSeleccionado.value)
}

function abrirModalAgregar() {
  formAgregar.value = { nombre: '', descripcion: '', hotel_id: hotelSeleccionado.value || '' }
  formError.value   = ''
  modalAgregar.value = true
}

function abrirEditar(hab) {
  habitacionEditando.value = hab
  formEditar.value  = { nombre: hab.nombre, descripcion: hab.descripcion || '' }
  formError.value   = ''
  modalEditar.value = true
}

async function guardarNueva() {
  formError.value = ''
  if (!formAgregar.value.nombre.trim())  return (formError.value = 'El nombre es obligatorio.')
  if (!formAgregar.value.hotel_id)       return (formError.value = 'Debes seleccionar un hotel.')
  guardando.value = true
  try {
    await store.agregarHabitacion(formAgregar.value)
    modalAgregar.value = false
    if (formAgregar.value.hotel_id === hotelSeleccionado.value) {
      await store.fetchHabitaciones(hotelSeleccionado.value)
    }
    Swal.fire({ title: '¡Agregado!', text: 'Habitación creada correctamente.', icon: 'success', confirmButtonColor: '#2d6472' })
  } catch (err) {
    formError.value = err.response?.data?.message || 'No se pudo agregar la habitación.'
  } finally {
    guardando.value = false
  }
}

async function guardarEdicion() {
  formError.value = ''
  if (!formEditar.value.nombre.trim()) return (formError.value = 'El nombre es obligatorio.')
  guardando.value = true
  try {
    await store.editarHabitacion(habitacionEditando.value.id, formEditar.value)
    modalEditar.value = false
    Swal.fire({ title: '¡Actualizado!', text: 'Habitación actualizada correctamente.', icon: 'success', confirmButtonColor: '#2d6472' })
  } catch (err) {
    formError.value = err.response?.data?.message || 'No se pudo actualizar la habitación.'
  } finally {
    guardando.value = false
  }
}

function confirmarEliminar(hab) {
  Swal.fire({
    title: 'Eliminar habitación',
    text: `¿Estás seguro de eliminar "${hab.nombre}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true,
    confirmButtonColor: '#A32D2D',
    cancelButtonColor: '#888',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await store.eliminarHabitacion(hab.id)
        Swal.fire({ title: '¡Eliminado!', text: 'Habitación eliminada correctamente.', icon: 'success', confirmButtonColor: '#2d6472' })
      } catch (err) {
        const msg = err.response?.data?.message || 'No se pudo eliminar.'
        Swal.fire({ title: 'Error', text: msg, icon: 'error', confirmButtonColor: '#888' })
      }
    }
  })
}
</script>

<style scoped>
.lista-habitaciones {
  font-family: Arial, Helvetica, sans-serif;
  padding: 2rem;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 2rem;
  width: 100%;
  max-width: 750px;
}
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
.titulo { font-size: 20px; font-weight: 700; margin: 0; }
.btn-agregar {
  height: 38px; padding: 0 1.1rem; background: #30698a; border: none;
  border-radius: 8px; font-size: 13px; font-weight: 600; color: #fff;
  cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s;
}
.btn-agregar:hover { background: #4c5e68; }
.selec { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1.5rem; }
.selec-input { font-size: 15px; font-weight: 700; }
.select-wrap { position: relative; }
.hotel-select {
  appearance: none; border: 1px solid #c0bfbe; border-radius: 8px;
  padding: 0 2.2rem 0 0.85rem; height: 38px; font-size: 13px; cursor: pointer; width: 100%;
}
.hotel-select:focus { outline: none; border-color: #888; }
.chevron { position: absolute; right: 10px; top: 50%; font-size: 11px; }
.estado-msg {
  text-align: center; padding: 2rem 0; color: #888; font-size: 14px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.estado-msg.error { color: #A32D2D; }
.tabla { width: 100%; border-collapse: collapse; }
.tabla thead th {
  text-align: left; font-size: 14px; font-weight: 700;
  border-bottom: 1px solid #c5c3c3; padding: 0.5rem 0.75rem;
}
.tabla tbody tr { border-bottom: 1px solid #d3cfcf; }
.tabla tbody td { padding: 0.85rem 0.75rem; font-size: 14px; vertical-align: middle; }
.descripcion { color: #777; font-size: 13px; }
.acciones { display: flex; gap: 6px; justify-content: flex-end; }
.btn-icono {
  width: 44px; height: 44px; border-radius: 6px; cursor: pointer; background: transparent;
  display: flex; align-items: center; justify-content: center; font-size: 15px;
}
.btn-editar  { color: #185FA5; border: 1px solid #B5D4F4; }
.btn-editar:hover  { background: #E6F1FB; }
.btn-eliminar { color: #A32D2D; border: 1px solid #F09595; }
.btn-eliminar:hover { background: #FCEBEB; }
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 100;
}
.modal {
  background: #fff; border-radius: 12px; padding: 1.5rem;
  width: 100%; max-width: 420px; box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
.modal-titulo { font-size: 15px; font-weight: 600; margin: 0; }
.btn-cerrar {
  width: 28px; height: 28px; border: none; background: #f5f5f5; border-radius: 6px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #888; font-size: 11px; transition: background 0.15s;
}
.btn-cerrar:hover { background: #e5e5e5; }
.campo { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.campo label { font-size: 13px; font-weight: 500; }
.req { color: #A32D2D; }
.campo input {
  height: 36px; border: 1px solid #c0bfbe; border-radius: 8px;
  padding: 0 0.85rem; font-size: 13px; outline: none;
}
.campo input:focus { border-color: #888; }
.form-error { color: #A32D2D; font-size: 12px; margin: 0 0 0.75rem; }
.modal-botones { display: flex; justify-content: flex-end; gap: 8px; margin-top: 1.25rem; }
.btn-accion {
  height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #dfdcd9;
  cursor: pointer; display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 500; background: #fff;
}
.btn-cancelar { color: #555; }
.btn-cancelar:hover { background: #f5f5f5; }
.btn-guardar {
  height: 36px; padding: 0 1rem; background: #2d6472; border: none; border-radius: 8px;
  font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
  display: flex; align-items: center; gap: 6px; transition: background 0.15s;
}
.btn-guardar:hover:not(:disabled) { background: #1f4650; }
.btn-guardar:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
