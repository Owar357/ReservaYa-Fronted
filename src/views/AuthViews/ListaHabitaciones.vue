<template>
  <div class="lista-page">

    <!-- Header -->
    <div class="lista-header">
      <h1 class="lista-titulo">Lista De Habitaciones</h1>
      <button class="btn-añadir" @click="mostrarModal = true">+ Nueva Habitación</button>
    </div>

    <!-- Grid de habitaciones -->
    <div class="habitaciones-grid">
      <div class="habitacion-card">
        <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" alt="Habitación" class="habitacion-img" />
        <div class="habitacion-body">
          <h3 class="habitacion-nombre">Habitación 2 personas</h3>
          <div class="habitacion-footer">
            <span class="habitacion-precio">$45.00</span>
            <div class="habitacion-acciones">
              <button class="btn-icono btn-editar" @click="abrirEditar('Habitación 2 personas', '45.00', 'Single', 'activa', '2 personas', '1', 'Villa del Mar', 'Habitación para dos personas.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80')">✏️</button>
              <button class="btn-icono btn-eliminar" @click="eliminarHabitacion">🗑</button>
            </div>
          </div>
        </div>
      </div>

      <div class="habitacion-card">
        <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80" alt="Habitación" class="habitacion-img" />
        <div class="habitacion-body">
          <h3 class="habitacion-nombre">Habitación 2 personas</h3>
          <div class="habitacion-footer">
            <span class="habitacion-precio">$75.00</span>
            <div class="habitacion-acciones">
              <button class="btn-icono btn-editar" @click="abrirEditar('Habitación 2 personas', '75.00', 'Single', 'activa', '2 personas', '2', 'Villa del Mar', 'Habitación para dos personas.', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80')">✏️</button>
              <button class="btn-icono btn-eliminar" @click="eliminarHabitacion">🗑</button>
            </div>
          </div>
        </div>
      </div>

      <div class="habitacion-card">
        <img src="https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80" alt="Habitación" class="habitacion-img" />
        <div class="habitacion-body">
          <h3 class="habitacion-nombre">Habitación 4 personas</h3>
          <div class="habitacion-footer">
            <span class="habitacion-precio">$100.00</span>
            <div class="habitacion-acciones">
              <button class="btn-icono btn-editar" @click="abrirEditar('Habitación 4 personas', '100.00', 'Doble', 'activa', '4 personas', '3', 'Villa del Mar', 'Habitación para cuatro personas.', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&q=80')">✏️</button>
              <button class="btn-icono btn-eliminar" @click="eliminarHabitacion">🗑</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Agregar -->
    <div v-if="mostrarModal" class="modal-overlay" @click.self="mostrarModal = false">
      <div class="modal">
        <h1 class="modal-titulo">Agregar Habitación</h1>

        <div class="modal-contenido">
          <div class="modal-form">
            <h3 class="form-titulo">Información de la habitación</h3>

            <div class="campo-full">
              <label>Nombre de la habitación</label>
              <input type="text" placeholder="Nombre de la habitación" />
            </div>

            <div class="campo-row">
              <div class="campo">
                <label>Precio</label>
                <input type="text" placeholder="$0.00" />
              </div>
              <div class="campo">
                <label>Tipo de habitación</label>
                <input type="text" placeholder="Tipo" />
              </div>
              <div class="campo">
                <label>Estado</label>
                <input type="text" placeholder="activa" />
              </div>
            </div>

            <div class="campo-row">
              <div class="campo">
                <label>Capacidad</label>
                <input type="text" placeholder="0" />
              </div>
              <div class="campo">
                <label>Número de la habitación</label>
                <input type="text" placeholder="0" />
              </div>
              <div class="campo">
                <label>Nombre del hotel</label>
                <input type="text" placeholder="Hotel" />
              </div>
            </div>

            <div class="campo-full">
              <label>Descripción</label>
              <textarea rows="4" placeholder="Descripción de la habitación" />
            </div>
          </div>

          <div class="modal-imagen">
            <div class="imagen-upload" @click="$refs.inputImagen.click()">
              <img v-if="imagenPreview" :src="imagenPreview" class="imagen-preview" />
              <template v-else>
                <span class="imagen-icono">🖼️</span>
                <p>Subir Imagen de la habitación</p>
              </template>
              <input ref="inputImagen" type="file" accept="image/*" style="display:none" @change="subirImagen" />
            </div>
            <button class="btn-guardar" @click="registrarHabitacion">💾 Registrar Habitación</button>
            <button class="btn-cancelar-modal" @click="cancelarHabitacion">✖ Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div v-if="mostrarModalEditar" class="modal-overlay" @click.self="mostrarModalEditar = false">
      <div class="modal">
        <h1 class="modal-titulo">Editar Habitación</h1>

        <div class="modal-contenido">
          <div class="modal-form">
            <h3 class="form-titulo">Información de la habitación</h3>

            <div class="campo-full">
              <label>Nombre de la habitación</label>
              <input type="text" :value="habitacionEditar.nombre" />
            </div>

            <div class="campo-row">
              <div class="campo">
                <label>Precio</label>
                <input type="text" :value="habitacionEditar.precio" />
              </div>
              <div class="campo">
                <label>Tipo de habitación</label>
                <input type="text" :value="habitacionEditar.tipo" />
              </div>
              <div class="campo">
                <label>Estado</label>
                <input type="text" :value="habitacionEditar.estado" />
              </div>
            </div>

            <div class="campo-row">
              <div class="campo">
                <label>Capacidad</label>
                <input type="text" :value="habitacionEditar.capacidad" />
              </div>
              <div class="campo">
                <label>Número de la habitación</label>
                <input type="text" :value="habitacionEditar.numero" />
              </div>
              <div class="campo">
                <label>Nombre del hotel</label>
                <input type="text" :value="habitacionEditar.hotel" />
              </div>
            </div>

            <div class="campo-full">
              <label>Descripción</label>
              <textarea rows="4" :value="habitacionEditar.descripcion" />
            </div>
          </div>

          <div class="modal-imagen">
            <div class="imagen-upload" @click="$refs.inputImagenEditar.click()">
              <img :src="imagenEditar || habitacionEditar.imagen" class="imagen-preview" />
              <div class="imagen-overlay">
                <span>📷 Cambiar imagen</span>
              </div>
              <input ref="inputImagenEditar" type="file" accept="image/*" style="display:none" @change="subirImagenEditar" />
            </div>
            <button class="btn-guardar" @click="editarHabitacion">✏️ Editar Habitacion</button>
            <button class="btn-cancelar-modal" @click="cancelarEditar">✖ Cancelar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'

const mostrarModal = ref(false)
const mostrarModalEditar = ref(false)
const imagenPreview = ref(null)
const imagenEditar = ref(null)

const habitacionEditar = reactive({
  nombre: '', precio: '', tipo: '', estado: '',
  capacidad: '', numero: '', hotel: '', descripcion: '', imagen: '',
})

function abrirEditar(nombre, precio, tipo, estado, capacidad, numero, hotel, descripcion, imagen) {
  habitacionEditar.nombre = nombre
  habitacionEditar.precio = precio
  habitacionEditar.tipo = tipo
  habitacionEditar.estado = estado
  habitacionEditar.capacidad = capacidad
  habitacionEditar.numero = numero
  habitacionEditar.hotel = hotel
  habitacionEditar.descripcion = descripcion
  habitacionEditar.imagen = imagen
  imagenEditar.value = null
  mostrarModalEditar.value = true
}

function subirImagen(event) {
  const file = event.target.files[0]
  if (file) imagenPreview.value = URL.createObjectURL(file)
}

function subirImagenEditar(event) {
  const file = event.target.files[0]
  if (file) imagenEditar.value = URL.createObjectURL(file)
}

function registrarHabitacion() {
  Swal.fire({ title: '¡Habitación Registrada!', icon: 'success', draggable: true })
  mostrarModal.value = false
  imagenPreview.value = null
}

function editarHabitacion() {
  Swal.fire({ title: '¡Habitación Editada!', icon: 'success', draggable: true })
  mostrarModalEditar.value = false
  imagenEditar.value = null
}

function eliminarHabitacion() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: '¡Eliminado!',
        text: 'La habitación fue eliminada correctamente.',
        icon: 'success'
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: 'Cancelado',
        text: 'La habitación está a salvo :)',
        icon: 'error'
      })
    }
  })
}

function cancelarHabitacion() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Se perderán los datos ingresados.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, continuar',
    reverseButtons: true,
    confirmButtonColor: '#8b1a1a',
    cancelButtonColor: '#083b7e',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'Cancelado', text: 'El registro fue cancelado.', icon: 'error' })
      mostrarModal.value = false
      imagenPreview.value = null
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({ title: 'Continuando', text: 'Puedes seguir llenando el formulario.', icon: 'success' })
    }
  })
}

function cancelarEditar() {
  Swal.fire({
    title: '¿Deseas descartar los cambios?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sí, descartar',
    denyButtonText: 'No, continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Cambios descartados', '', 'info')
      mostrarModalEditar.value = false
      imagenEditar.value = null
    } else if (result.isDenied) {
      Swal.fire('Puedes seguir editando', '', 'success')
    }
  })
}
</script>

<style scoped>
.lista-page {
  font-family: Arial, sans-serif;
  width: 100%;
  padding: 24px;
  background: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}

.lista-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.lista-titulo {
  font-size: 24px;
  font-weight: bold;
  color: #222;
}

.btn-añadir {
  background-color: #f5c518;
  color: #222;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-añadir:hover { background-color: #e0b015; }

.habitaciones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.habitacion-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}

.habitacion-card:hover { transform: translateY(-4px); }

.habitacion-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.habitacion-body { padding: 12px 16px 14px 16px; }

.habitacion-nombre {
  font-size: 15px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
}

.habitacion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habitacion-precio {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.habitacion-acciones { display: flex; gap: 8px; }

.btn-icono {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.btn-icono:hover { opacity: 0.8; }
.btn-editar { background-color: #f0f4ff; }
.btn-eliminar { background-color: #fff0f0; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 28px;
  width: 750px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  color: #222;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-titulo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
}

.modal-contenido {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 20px;
}

.modal-form {
  background: #1a2a6c;
  border-radius: 12px;
  padding: 20px;
}

.form-titulo {
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin-bottom: 16px;
}

.campo-full {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.campo-row {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.campo-full label,
.campo label { font-size: 12px; color: #ccc; }

.campo-full input,
.campo input,
.campo-full textarea {
  padding: 8px 10px;
  border: 1px solid #3a4a8c;
  border-radius: 6px;
  font-size: 13px;
  background: #1a2a6c;
  color: white;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}

.campo-full textarea { resize: none; }

.modal-imagen {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.imagen-upload {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  flex: 1;
  min-height: 120px;
  background: #fff8e0;
  border: 2px solid #f5c518;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.imagen-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.imagen-upload:hover .imagen-overlay { opacity: 1; }

.imagen-icono { font-size: 40px; margin-bottom: 8px; }
.imagen-upload p { font-size: 13px; color: #666; text-align: center; }

.imagen-preview {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

.btn-guardar {
  width: 100%;
  background: #f5c518;
  color: #222;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.btn-guardar:hover { background: #e0b015; }

.btn-cancelar-modal {
  width: 100%;
  background: #8b1a1a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.btn-cancelar-modal:hover { background: #6e1414; }

@media (max-width: 768px) {
  .habitaciones-grid { grid-template-columns: 1fr; }
  .modal { width: 90%; }
  .modal-contenido { grid-template-columns: 1fr; }
}
</style>

<style>
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin: 0 5px;
}

.btn-success {
  background: #e53935;
  color: white;
}

.btn-danger {
  background: #f5a623;
  color: white;
}
</style>