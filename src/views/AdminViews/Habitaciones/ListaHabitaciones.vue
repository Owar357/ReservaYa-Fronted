<template>
  <div class="p-6 min-h-screen bg-gray-50">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Lista de Habitaciones</h1>
      <Button label="Nueva Habitación" icon="pi pi-plus" @click="openModal()"
        class="!bg-slate-900 !border-slate-900 !font-bold !text-base !px-6 !py-3" />
    </div>

    <!-- Selector de hotel -->
    <div class="mb-6 flex items-center gap-3">
      <label class="text-sm font-semibold text-gray-700">
        <i class="pi pi-building mr-1"></i> Hotel:
      </label>
      <select v-model="hotel_id" @change="onHotelChange"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-52">
        <option value="" disabled>Selecciona un hotel</option>
        <option v-for="hotel in hotelStore.hoteles" :key="hotel.id" :value="hotel.id">
          {{ hotel.nombre }}
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="habitacionStore.loading" class="flex justify-center items-center h-48">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
    </div>

    <!-- Error -->
    <div v-else-if="habitacionStore.error" class="text-center text-red-500 py-10">
      <i class="pi pi-exclamation-triangle mr-2"></i> {{ habitacionStore.error }}
    </div>

    <!-- Grid -->
    <div v-else-if="habitacionStore.habitaciones.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="hab in habitacionStore.habitaciones" :key="hab.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img :src="hab.imagenes?.[0]?.url || defaultImage" :alt="hab.nombre" class="w-full h-48 object-cover" />
        <div class="p-4">
          <p class="font-bold text-gray-800 text-base mb-1">{{ hab.nombre }}</p>
          <p class="text-green-600 font-bold text-lg mb-3">${{ hab.precio }}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs px-2 py-1 rounded-full" :class="{
              'bg-green-100 text-green-700': hab.estado === 'DISPONIBLE',
              'bg-blue-100 text-blue-700': hab.estado === 'OCUPADO',
              'bg-yellow-100 text-yellow-700': hab.estado === 'MANTENIMIENTO',
              'bg-red-100 text-red-700': hab.estado === 'FUERA_DE_SERVICIO'
            }">{{ hab.estado }}</span>
            <div class="flex gap-2">
              <button @click="openModal(hab)"
                class="w-9 h-9 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click="confirmDelete(hab)"
                class="w-9 h-9 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin habitaciones -->
    <div v-else class="text-center text-gray-400 py-20">
      <i class="pi pi-th-large text-5xl mb-4 block"></i>
      <p class="text-lg">No hay habitaciones registradas</p>
    </div>

    <!-- Dialog -->
    <Dialog v-model:visible="showModal" :header="editingHab ? 'Editar Habitación' : 'Nueva Habitación'"
      :style="{ width: '650px' }" modal :draggable="false">
      <div class="flex gap-4 py-2">

        <!-- Formulario izquierda -->
        <div class="flex flex-col gap-3 flex-1">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700"><i class="pi pi-home mr-1"></i> Nombre</label>
            <InputText v-model="form.nombre" placeholder="Habitación Doble" class="w-full" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-gray-700"><i class="pi pi-dollar mr-1"></i> Precio</label>
              <InputText v-model="form.precio" placeholder="0.00" class="w-full" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-gray-700"><i class="pi pi-hashtag mr-1"></i> Número</label>
              <InputText v-model="form.num_habitacion" placeholder="101" class="w-full" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-gray-700"><i class="pi pi-users mr-1"></i> Capacidad</label>
              <InputText v-model="form.capacidad" placeholder="2" class="w-full" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-semibold text-gray-700"><i class="pi pi-tag mr-1"></i> Tipo</label>
              <select v-model="form.tipo_habitacion_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="" disabled>Selecciona un tipo</option>
                <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
              </select>
            </div>
          </div>
          <div v-if="editingHab" class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700"><i class="pi pi-info-circle mr-1"></i> Estado</label>
            <select v-model="form.estado"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="" disabled>Selecciona</option>
              <option value="DISPONIBLE">Disponible</option>
              <option value="OCUPADO">Ocupada</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="FUERA_DE_SERVICIO">Fuera de servicio</option>
            </select>
          </div>
        </div>

        <!-- Imágenes derecha -->
        <div class="flex flex-col gap-3 w-52">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-images mr-1"></i> Imágenes
          </label>

          <!-- AL CREAR -->
          <template v-if="!editingHab">
            <div class="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors p-4 text-center"
              @click="$refs.fileInput.click()">
              <input type="file" ref="fileInput" accept="image/*" multiple class="hidden" @change="onFileChange" />
              <div class="flex flex-col items-center gap-2 text-gray-400">
                <i class="pi pi-cloud-upload text-3xl"></i>
                <span class="text-xs font-medium">Clic para agregar imágenes</span>
                <span class="text-xs text-gray-300">Puedes subir varias</span>
              </div>
            </div>
            <div v-if="imagenesPreview.length > 0" class="grid grid-cols-2 gap-2">
              <div v-for="(img, index) in imagenesPreview" :key="index" class="relative">
                <img :src="img" class="w-full h-20 object-cover rounded-lg" />
                <button class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  @click.stop="removeImagen(index)">
                  <i class="pi pi-times" style="font-size: 8px;"></i>
                </button>
              </div>
            </div>
            <p class="text-xs text-gray-400 text-center">{{ imagenesFiles.length }} imagen(es) seleccionada(s)</p>
          </template>

          <!-- AL EDITAR -->
          <template v-else>
            <!-- Imágenes del backend -->
            <div v-if="imagenesActuales.length > 0" class="grid grid-cols-2 gap-2">
              <div v-for="img in imagenesActuales" :key="img.id" class="relative group">
                <img :src="img.url" class="w-full h-20 object-cover rounded-lg" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center" @click="triggerReplace(img)">
                    <i class="pi pi-refresh" style="font-size: 10px;"></i>
                  </button>
                  <button class="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center" @click="deleteImagen(img)">
                    <i class="pi pi-trash" style="font-size: 10px;"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Preview imágenes nuevas -->
            <div v-if="imagenesNuevasPreview.length > 0" class="grid grid-cols-2 gap-2 mt-2">
              <div v-for="(img, index) in imagenesNuevasPreview" :key="index" class="relative">
                <img :src="img" class="w-full h-20 object-cover rounded-lg opacity-80" />
                <button class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  @click.stop="removeImagenNueva(index)">
                  <i class="pi pi-times" style="font-size: 8px;"></i>
                </button>
              </div>
            </div>

            <!-- Upload nuevas -->
            <div class="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors p-4 text-center mt-2"
              @click="$refs.fileInputEditar.click()">
              <input type="file" ref="fileInputEditar" accept="image/*" multiple class="hidden" @change="onFileChangeEditar" />
              <div class="flex flex-col items-center gap-2 text-gray-400">
                <i class="pi pi-cloud-upload text-2xl"></i>
                <span class="text-xs font-medium">Agregar más imágenes</span>
              </div>
            </div>

            <input type="file" ref="fileReplace" accept="image/*" class="hidden" @change="onReplaceChange" />
          </template>

        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal"
          class="!bg-gray-200 !border-gray-200 !text-gray-700 !font-bold" />
        <Button
          :label="habitacionStore.loading ? 'Guardando...' : (editingHab ? 'Guardar Cambios' : 'Registrar Habitación')"
          :icon="habitacionStore.loading ? 'pi pi-spin pi-spinner' : (editingHab ? 'pi pi-check' : 'pi pi-plus')"
          @click="editingHab ? saveHab() : createHab()"
          :disabled="editingHab ? (!form.nombre || habitacionStore.loading) : (!form.nombre || !form.precio || !form.num_habitacion || !form.capacidad || !form.tipo_habitacion_id || habitacionStore.loading)"
          class="!bg-slate-900 !border-slate-900 !font-bold" />
      </template>
    </Dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useHabitacionStore } from '@/stores/habitacionStore'
import { useHotelStore } from '@/stores/hotelStore'
import tipoHabitacionService from '@/services/tipoHabitacionService'
import imagenHabitacionService from '@/services/imagenHabitacionService'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const habitacionStore = useHabitacionStore()
const hotelStore = useHotelStore()
const showModal = ref(false)
const editingHab = ref(null)
const imagenesFiles = ref([])
const imagenesPreview = ref([])
const imagenesActuales = ref([])
const imagenAReemplazar = ref(null)
const imagenesNuevasFiles = ref([])
const tipos = ref([])
const hotel_id = ref(null)
const defaultImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80'
const fileReplace = ref(null)
const imagenesNuevasPreview = ref([])

const form = reactive({
  nombre: '', precio: '', num_habitacion: '',
  capacidad: '', tipo_habitacion_id: '', estado: '', hotel_id: null
})

onMounted(async () => {
  await hotelStore.fetchHoteles()
  if (hotelStore.hoteles.length > 0) {
    hotel_id.value = hotelStore.hoteles[0].id
    form.hotel_id = hotel_id.value
    await habitacionStore.fetchHabitaciones(hotel_id.value)
    const { data } = await tipoHabitacionService.getTipos(hotel_id.value)
    tipos.value = data.data
  }
})

async function onHotelChange() {
  habitacionStore.habitaciones = []
  tipos.value = []
  form.hotel_id = hotel_id.value
  await habitacionStore.fetchHabitaciones(hotel_id.value)
  const { data } = await tipoHabitacionService.getTipos(hotel_id.value)
  tipos.value = data.data
}

function openModal(hab = null) {
  editingHab.value = hab
  imagenesFiles.value = []
  imagenesPreview.value = []
  imagenAReemplazar.value = null
  imagenesNuevasFiles.value = []
  imagenesNuevasPreview.value = [] 
  if (hab) {
    imagenesActuales.value = hab.imagenes ? [...hab.imagenes] : []
    Object.assign(form, {
      nombre: hab.nombre,
      precio: hab.precio,
      num_habitacion: hab.num_habitacion,
      capacidad: hab.capacidad,
      tipo_habitacion_id: hab.tipo_habitacion_id,
      estado: hab.estado,
      hotel_id: hab.hotel_id
    })
  } else {
    imagenesActuales.value = []
    Object.assign(form, {
      nombre: '', precio: '', num_habitacion: '',
      capacidad: '', tipo_habitacion_id: '', estado: '', hotel_id: hotel_id.value
    })
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingHab.value = null
}

function onFileChange(e) {
  const files = Array.from(e.target.files)
  files.forEach(file => {
    imagenesFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (ev) => imagenesPreview.value.push(ev.target.result)
    reader.readAsDataURL(file)
  })
  e.target.value = ''
}

function onFileChangeEditar(e) {
  const files = Array.from(e.target.files)
  files.forEach(file => {
    imagenesNuevasFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (ev) => imagenesNuevasPreview.value.push(ev.target.result)
    reader.readAsDataURL(file)
  })
  e.target.value = ''
}

function removeImagen(index) {
  imagenesFiles.value.splice(index, 1)
  imagenesPreview.value.splice(index, 1)
}

function triggerReplace(img) {
  imagenAReemplazar.value = img
  fileReplace.value.click()
}


async function onReplaceChange(e) {
  const file = e.target.files[0]
  if (!file || !imagenAReemplazar.value) return
  try {
    const { data } = await imagenHabitacionService.updateImagen(imagenAReemplazar.value.id, file)
    const nuevaUrl = data.data.url

    // Solo actualiza el preview local
    const index = imagenesActuales.value.findIndex(i => i.id === imagenAReemplazar.value.id)
    if (index !== -1) {
      imagenesActuales.value.splice(index, 1, { ...imagenesActuales.value[index], url: nuevaUrl })
    }

    Toast.fire({ icon: 'success', title: 'Imagen reemplazada correctamente' })
  } catch {
    Toast.fire({ icon: 'error', title: 'Error al reemplazar imagen' })
  }
  e.target.value = ''
}

async function deleteImagen(img) {
  try {
    await imagenHabitacionService.deleteImagen(img.id)
    imagenesActuales.value = imagenesActuales.value.filter(i => i.id !== img.id)
    Toast.fire({ icon: 'success', title: 'Imagen eliminada correctamente' })
  } catch {
    Toast.fire({ icon: 'error', title: 'Error al eliminar imagen' })
  }
}

async function createHab() {
  const result = await habitacionStore.createHabitacion(form, imagenesFiles.value)
  closeModal()
  if (result.success) {
    Toast.fire({ icon: 'success', title: 'Habitación registrada correctamente' })
  } else {
    Toast.fire({ icon: 'error', title: result.message })
  }
}

function removeImagenNueva(index) {
  imagenesNuevasFiles.value.splice(index, 1)
  imagenesNuevasPreview.value.splice(index, 1)
}

async function saveHab() {
  const result = await habitacionStore.updateHabitacion(editingHab.value.id, form)
  if (result.success) {
    // Si hay imágenes nuevas las sube
    if (imagenesNuevasFiles.value.length > 0) {
      await imagenHabitacionService.storeImagenes(editingHab.value.id, imagenesNuevasFiles.value)
    }
    closeModal()
    await habitacionStore.fetchHabitaciones(hotel_id.value)
    Toast.fire({ icon: 'success', title: 'Habitación actualizada correctamente' })
  } else {
    Toast.fire({ icon: 'error', title: result.message })
  }
}

function confirmDelete(hab) {
  Swal.fire({
    title: '¿Eliminar habitación?',
    text: `¿Estás seguro de eliminar "${hab.nombre}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await habitacionStore.deleteHabitacion(hab.id)
      if (res.success) {
        Toast.fire({ icon: 'success', title: 'Habitación eliminada correctamente' })
      } else {
        Toast.fire({ icon: 'error', title: res.message })
      }
    }
  })
}
</script>