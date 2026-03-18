<template>
  <div class="lista-habitaciones">
    <div class="card">

      <div class="header">
        <h2 class="titulo">Lista de Habitaciones</h2>
        <button class="btn-agregar" @click="modalAgregar = true">
          <i class="pi pi-plus"></i> agregar
        </button>
      </div>

      <div class="selec">
  <label class="selec-input">Hotel:</label>
  <div class="select-wrap">
    <select v-model="hotelSeleccionado" class="hotel-select">
      <option value="" disabled selected>Seleccionar hotel</option>
      <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
        {{ hotel.nombre }}
      </option>
    </select>
    <i class="pi pi-chevron-down chevron"></i>
  </div>
</div>
      <table class="tabla">
        <thead>
          <tr>
            <th>Habitación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hab in habitaciones" :key="hab.id">
            <td class="nombre">{{ hab.nombre }}</td>
            <td class="acciones">
              <button class="btn-icono btn-editar" @click="abrirEditar(hab)" title="Editar">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="btn-icono btn-eliminar" @click="confirmarEliminar(hab.nombre)" title="Eliminar">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div v-if="modalAgregar" class="modal-overlay" @click.self="modalAgregar = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-titulo">Agregar Habitación</h3>
          <button class="btn-cerrar" @click="modalAgregar = false">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="campo">
          <label>Nombre de la habitación</label>
          <input type="text" placeholder="Habitacion Suite Presidencial" />
        </div>
        <div class="campo">
          <label>Hotel</label>
          <div class="select-wrap">
            <select class="hotel-select">
              <option value="" disabled selected>Seleccionar hotel</option>
              <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
                {{ hotel.nombre }}
              </option>
            </select>
            <i class="pi pi-chevron-down chevron"></i>
          </div>
        </div>
        <div class="modal-botones">
          <button class="btn-accion btn-cancelar" @click="modalAgregar = false">
            <i class="pi pi-times"></i> Cancelar
          </button>
          <button class="btn-guardar">
            <i class="pi pi-check"></i> Agregar
          </button>
        </div>
      </div>
    </div>
    <div v-if="modalEditar" class="modal-overlay" @click.self="modalEditar = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-titulo">Editar Habitación</h3>
          <button class="btn-cerrar" @click="modalEditar = false">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="campo">
          <label>Nombre de la habitación</label>
          <input type="text" :value="habitacionSeleccionada?.nombre" />
          
        </div>
        <div class="campo">
          <label>Hotel</label>
          <div class="select-wrap">
            <select class="hotel-select" :value="habitacionSeleccionada?.hotelId">
              <option v-for="hotel in hoteles" :key="hotel.id" :value="hotel.id">
                {{ hotel.nombre }}
              </option>
            </select>
            <i class="pi pi-chevron-down chevron"></i>
          </div>
        </div>
        <div class="modal-botones">
          <button class="btn-accion btn-cancelar" @click="modalEditar = false">
            <i class="pi pi-times"></i> Cancelar
          </button>
          <button class="btn-guardar">
            <i class="pi pi-check"></i> Guardar cambios
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const hoteles = ref([
  { id:1, nombre: 'Hotel Gran Villa' },
  { id: 2,nombre:'Hotel La Vista' },
  { id:3, nombre: 'Hotel Vistamonte' },
  { id: 4, nombre:'Hotel del Mar' },
])

const habitaciones = ref([
  { id: 1,nombre:'Habitacion suite Presidencial', },
  { id:2, nombre: 'Habitación Doble Vista al Mar', },
  { id: 3, nombre:'Habitación Simple Estándar', },
  { id: 4,nombre:'Habitacion premiun', },
])

const modalAgregar = ref(false)
const modalEditar   = ref(false)
const hotelSeleccionado = ref('')
const habitacionSeleccionada = ref(null)

function abrirEditar(hab) {
  habitacionSeleccionada.value = hab
  modalEditar.value = true
}

function confirmarEliminar(nombre) {
  Swal.fire({
    title: 'Eliminar habitación',
    text: `¿Estás seguro de eliminar "${nombre}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true,
    confirmButtonColor: '#A32D2D',
    cancelButtonColor: '#888',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Eliminado!',
        text: 'La habitación ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonColor: '#EF9F27',
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelado',
        text: 'La habitación está a salvo :)',
        icon: 'error',
        confirmButtonColor: '#888',
      })
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
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.titulo {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.btn-agregar {
  height: 38px;
  padding: 0 1.1rem;
  background: #30698a;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s;
}
.btn-agregar:hover { background: #4c5e68; }
.selec {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1.5rem;
}
.selec-input {
  font-size: 15px;
  font-weight: 700;
}
.select-wrap { position: relative; }
.hotel-select {
  appearance: none;
  border: 1px solid #c0bfbe;
  border-radius: 8px;
  padding: 0 2.2rem 0 0.85rem;
  height: 38px;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
}
.hotel-select:focus {
  outline: none;
  border-color: #888;
}
.chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 11px;
}
.tabla {
  width: 100%;
  border-collapse: collapse;
}
.tabla thead th {
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #c5c3c3;
}
.tabla tbody tr { border-bottom: 1px solid #d3cfcf; }
.tabla tbody td {
  padding: 0.85rem 0.75rem;
  font-size: 14px;
  vertical-align: middle;
}
.acciones {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}
.btn-icono {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

}
.btn-editar { color: #185FA5; border: 1px solid #B5D4F4; }
.btn-editar:hover { background: #E6F1FB; }
.btn-eliminar { color: #A32D2D; border: 1px solid #F09595; }
.btn-eliminar:hover { background: #FCEBEB; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.modal-titulo {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}
.btn-cerrar {
  width: 28px;
  height: 28px;
  border: none;
  background: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 11px;
  transition: background 0.15s;
}
.btn-cerrar:hover { background: #e5e5e5; }

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1rem;
}
.campo label {
  font-size: 13px;
  font-weight: 500;
  color: #000000;
}
.campo input {
  height: 36px;
  border: 1px solid #c0bfbe;
  border-radius: 8px;
  padding: 0 0.85rem;
  font-size: 13px;
  outline: none;
}
.campo input:focus { border-color: #888; }
.modal-botones {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 1.25rem;
}
.btn-accion {
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #dfdcd9;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
}
.btn-cancelar { color: #555; }
.btn-cancelar:hover { background: #f5f5f5; }

.btn-guardar {
  height: 36px;
  padding: 0 1rem;
  background: #2d6472;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s;
}
.btn-guardar:hover { background: #1f4650; }
</style>