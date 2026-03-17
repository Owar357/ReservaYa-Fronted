<template>
  <div class="p-6 min-h-screen bg-gray-50">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Lista de Hoteles</h1>
      <Button label="Añadir Hotel" icon="pi pi-plus" @click="openModal()"
        class="!bg-slate-900 !border-slate-900 !font-bold !text-base !px-6 !py-3" />
    </div>

    <!-- Loading -->
    <div v-if="hotelStore.loading" class="flex justify-center items-center h-48">
      <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
    </div>

    <!-- Error -->
    <div v-else-if="hotelStore.error" class="text-center text-red-500 py-10">
      <i class="pi pi-exclamation-triangle mr-2"></i> {{ hotelStore.error }}
    </div>

    <!-- Grid -->
    <div v-else-if="hotelStore.hoteles.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="hotel in hotelStore.hoteles" :key="hotel.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img :src="hotel.imagen || defaultImage" :alt="hotel.nombre" class="w-full h-48 object-cover" />
        <div class="p-4 flex items-center justify-between">
          <div>
            <p class="font-bold text-gray-800 text-base">{{ hotel.nombre }}</p>
            <p class="text-gray-400 text-sm flex items-center gap-1 mt-1">
              <i class="pi pi-map-marker text-xs"></i> {{ hotel.departamento }}
            </p>
          </div>
          <div class="flex gap-2">
            <button @click="confirmDelete(hotel)"
              class="w-9 h-9 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
              <i class="pi pi-trash"></i>
            </button>
            <button @click="openModal(hotel)"
              class="w-9 h-9 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin hoteles -->
    <div v-else class="text-center text-gray-400 py-20">
      <i class="pi pi-building text-5xl mb-4 block"></i>
      <p class="text-lg">No tienes hoteles registrados</p>
    </div>

    <!-- Dialog -->
    <Dialog v-model:visible="showModal" :header="editingHotel ? 'Editar Hotel' : 'Añadir Hotel'"
      :style="{ width: '480px' }" modal :draggable="false">
      <div class="flex flex-col gap-4 py-2">

        <!-- Nombre siempre visible -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-home mr-1"></i> Nombre del Hotel
          </label>
          <InputText v-model="form.nombre" placeholder="Hotel Villanueva" class="w-full" />
        </div>

        <!-- Solo visible al crear -->
        <template v-if="!editingHotel">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">
              <i class="pi pi-map-marker mr-1"></i> Dirección
            </label>
            <InputText v-model="form.direccion" placeholder="Av. Principal #123" class="w-full" />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">
              <i class="pi pi-flag mr-1"></i> Departamento
            </label>
            <select v-model="form.departamento"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="" disabled>Selecciona un departamento</option>
              <option v-for="depto in departamentos" :key="depto" :value="depto">{{ depto }}</option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">
              <i class="pi pi-envelope mr-1"></i> Email
            </label>
            <InputText v-model="form.email" placeholder="hotel@email.com" class="w-full" />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">
              <i class="pi pi-align-left mr-1"></i> Descripción
            </label>
            <textarea v-model="form.descripcion" placeholder="Descripción del hotel..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"></textarea>
          </div>
        </template>

        <!-- Teléfonos siempre visibles -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-phone mr-1"></i> Teléfono
          </label>
          <InputText v-model="form.telefono" placeholder="7777-7777" class="w-full" />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-phone mr-1"></i> Teléfono 2 <span class="text-gray-400 font-normal">(opcional)</span>
          </label>
          <InputText v-model="form.telefono2" placeholder="7777-7777" class="w-full" />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-phone mr-1"></i> Teléfono 3 <span class="text-gray-400 font-normal">(opcional)</span>
          </label>
          <InputText v-model="form.telefono3" placeholder="7777-7777" class="w-full" />
        </div>

        <!-- Imagen siempre visible -->
        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold text-gray-700">
            <i class="pi pi-image mr-1"></i> Imagen del Hotel
          </label>
          <div
            class="border-2 border-dashed border-gray-300 rounded-xl min-h-28 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            @click="$refs.fileInput.click()">
            <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="onFileChange" />
            <div v-if="!previewImagen" class="flex flex-col items-center gap-2 text-gray-400 p-6">
              <i class="pi pi-cloud-upload text-3xl"></i>
              <span class="text-sm font-medium">Haz click para agregar imagen</span>
            </div>
            <div v-else class="relative w-full h-36">
              <img :src="previewImagen" class="w-full h-full object-cover rounded-xl" />
              <button
                class="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors"
                @click.stop="previewImagen = ''; imagenFile = null">
                <i class="pi pi-times text-xs"></i>
              </button>
            </div>
          </div>
        </div>







      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal"
          class="!bg-gray-200 !border-gray-200 !text-gray-700 !font-bold" />

        <Button :label="hotelStore.loading ? 'Guardando...' : (editingHotel ? 'Guardar Cambios' : 'Añadir Hotel')"
          :icon="hotelStore.loading ? 'pi pi-spin pi-spinner' : (editingHotel ? 'pi pi-check' : 'pi pi-plus')"
          @click="editingHotel ? saveHotel() : createHotel()" :disabled="editingHotel
            ? (!form.nombre || hotelStore.loading)
            : (!form.nombre || !form.direccion || !form.departamento || !form.email || !form.telefono || hotelStore.loading)"
          class="!bg-slate-900 !border-slate-900 !font-bold" />
      </template>
    </Dialog>

  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { useHotelStore } from '@/stores/hotelStore'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

export default {
  name: 'HotelList',

  setup() {
    const hotelStore = useHotelStore()
    return { hotelStore }
  },

  data() {
    return {
      showModal: false,
      editingHotel: null,
      imagenFile: null,
      previewImagen: '',
      form: {
        nombre: '',
        direccion: '',
        departamento: '',
        descripcion: '',
        email: '',
        telefono: '',
        telefono2: '',
        telefono3: '',
        fecha_asignacion: new Date().toISOString().split('T')[0]
      },
      defaultImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
      departamentos: ['Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador', 'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután']
    }
  },

  mounted() {
    this.hotelStore.fetchHoteles()
  },

  methods: {
    openModal(hotel = null) {
      this.editingHotel = hotel
      this.imagenFile = null
      if (hotel) {
        this.form = {
          nombre: hotel.nombre,
          direccion: hotel.direccion || '',
          departamento: hotel.departamento || '',
          descripcion: hotel.descripcion || '',
          email: hotel.email || '',
          telefono: hotel.telefono || '',
          telefono2: hotel.telefono2 || '',
          telefono3: hotel.telefono3 || '',
          fecha_asignacion: hotel.fecha_asignacion || new Date().toISOString().split('T')[0]
        }
        this.previewImagen = hotel.imagen || ''
      } else {
        this.form = {
          nombre: '', direccion: '', departamento: '',
          descripcion: '', email: '', telefono: '',
          telefono2: '', telefono3: '',
          fecha_asignacion: new Date().toISOString().split('T')[0]
        }
        this.previewImagen = ''
      }
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.editingHotel = null
    },

    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.imagenFile = file
        const reader = new FileReader()
        reader.onload = (ev) => this.previewImagen = ev.target.result
        reader.readAsDataURL(file)
      }
    },

    async createHotel() {
      const result = await this.hotelStore.createHotel(this.form, this.imagenFile)
      this.closeModal()
      if (result.success) {
        Toast.fire({ icon: 'success', title: 'Hotel creado correctamente' })
      } else {
        Toast.fire({ icon: 'error', title: result.message })
      }
    },

    async saveHotel() {
      const result = await this.hotelStore.updateHotel(this.editingHotel.id, this.form, this.imagenFile)
      this.closeModal()
      if (result.success) {
        Toast.fire({ icon: 'success', title: 'Hotel actualizado correctamente' })
      } else {
        Toast.fire({ icon: 'error', title: result.message })
      }
    },

    confirmDelete(hotel) {
      Swal.fire({
        title: '¿Eliminar hotel?',
        text: `¿Estás seguro de eliminar "${hotel.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ef4444',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await this.hotelStore.deleteHotel(hotel.id)
          if (res.success) {
            Toast.fire({ icon: 'success', title: 'Hotel eliminado correctamente' })
          } else {
            Toast.fire({ icon: 'error', title: res.message })
          }
        }
      })
    }
  }
}
</script>