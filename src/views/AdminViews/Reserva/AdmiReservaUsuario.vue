

<template>
  <div class="lista-reservas">
    <div class="card">

      <div class="header">
        <h2 class="titulo">Lista de Reservas</h2>
      </div>

      <table class="tabla">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Hotel</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservas" :key="res.id">
            <td>{{ res.usuario }}</td>
            <td>{{ res.hotel }}</td>
            <td>{{ res.fechaInicio }}</td>
            <td>{{ res.fechaFin }}</td>
            <td class="acciones">
              <button class="btn-icono btn-confirmar" @click="confirmarReserva(res)" title="Confirmar">
                <i class="pi pi-check"></i>
              </button>
              <button class="btn-icono btn-eliminar" @click="confirmarEliminar(res.usuario)" title="Eliminar">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const reservas = ref([
  { usuario:'Carlos Méndez',hotel: 'Hotel Gran Villa', fechaInicio: '2025-06-01', fechaFin: '2025-06-05' },
  { usuario:'Ana Torres', hotel: 'Hotel La Vista',  fechaInicio: '2025-07-10', fechaFin: '2025-07-15' },
  { usuario: 'Luis Ramírez', hotel: 'Hotel Vistamonte',fechaInicio: '2025-08-20', fechaFin: '2025-08-25' },
  { usuario:'María González',hotel: 'Hotel del Mar',  fechaInicio:'2025-09-03', fechaFin: '2025-09-07' },
])

function confirmarReserva(res) {
  Swal.fire({
    title: 'Confirmar reserva',
    text: `¿Confirmas la reserva de "${res.usuario}"?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    confirmButtonColor: '#2d6472',
    cancelButtonColor: '#888',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Confirmada!',
        text: 'La reserva ha sido confirmada correctamente.',
        icon: 'success',
        confirmButtonColor: '#EF9F27',
      })
    }
  })
}

function confirmarEliminar(usuario) {
  Swal.fire({
    title: 'Eliminar reserva',
    text: `¿Estás seguro de eliminar la reserva de "${usuario}"?`,
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
        title: '¡Eliminada!',
        text: 'La reserva ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonColor: '#EF9F27',
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelado',
        text: 'La reserva está a salvo :)',
        icon: 'error',
        confirmButtonColor: '#888',
      })
    }
  })
}
</script>

<style scoped>
.lista-reservas {
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
  max-width: 900px;
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
.tabla {
  width: 100%;
  border-collapse: collapse;
}
.tabla thead th {
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #c5c3c3;
  padding: 0.5rem 0.75rem;
}
.tabla tbody tr {
  border-bottom: 1px solid #d3cfcf;
}
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
  background: transparent;
}
.btn-confirmar { color: #1a7a3a; border: 1px solid #8fd4a8; }
.btn-confirmar:hover { background: #e6f7ec; }
.btn-eliminar { color: #A32D2D; border: 1px solid #F09595; }
.btn-eliminar:hover { background: #FCEBEB; }
</style>