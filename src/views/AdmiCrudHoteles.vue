<template>
  <div class="hotel">
    
    <div class="hotel-header">
      <h1 class="hotel-title">Lista de Hoteles</h1>
      <button class="btn-add" @click="openModal()">
        <i class="pi pi-plus"></i> Añadir Hoteles
      </button>
    </div>

    <div class="hotel-grid" v-if="hotels.length > 0">
      <div class="hotel-card" v-for="hotel in hotels" :key="hotel.id">
        <div class="hotel-image-wrap">
          <img :src="hotel.imagen || defaultImage" :alt="hotel.nombre" class="hotel-image" />
        </div>
        <div class="hotel-info">
          <div class="hotel-text">
            <p class="hotel-name">{{ hotel.nombre }}</p>
            <p class="hotel-location">
              <i class="pi pi-map-marker"></i> {{ hotel.ubicacion }}
            </p>
          </div>
          <div class="hotel-actions">
            <button class="btn-icon btn-delete" @click="confirmDelete(hotel)" title="Eliminar">
              <i class="pi pi-trash"></i>
            </button>
            <button class="btn-icon btn-edit" @click="openModal(hotel)" title="Editar">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>
            <i :class="editingHotel ? 'pi pi-pencil' : 'pi pi-plus'"></i>
            {{ editingHotel ? 'Editar Hotel' : 'Añadir Hotel' }}
          </h2>
          <button class="btn-close" @click="closeModal">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label><i class="pi pi-home"></i> Nombre del Hotel</label>
            <input type="text" v-model="form.nombre" placeholder="Hotel Villanueva" class="form-input" />
          </div>
          <div class="form-group">
            <label><i class="pi pi-map-marker"></i> Ubicación</label>
            <input type="text" v-model="form.ubicacion" placeholder="Chalatenango" class="form-input" />
          </div>

          
          <div class="form-group">
            <label><i class="pi pi-flag"></i> Departamento</label>
            <select v-model="form.departamento" class="form-input form-select">
              <option value="" disabled>Selecciona un departamento</option>
              <option v-for="depto in departamentos" :key="depto" :value="depto">
                {{ depto }}
              </option>
            </select>
          </div>

        
          <div class="form-group">
            <label><i class="pi pi-image"></i> Imagen del Hotel</label>
            <div class="file-upload-area" @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="onFileDrop">
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                style="display:none"
                @change="onFileChange"
              />
              <div v-if="!form.imagen" class="file-upload-placeholder">
                <i class="pi pi-cloud-upload"></i>
                <span>Haz clic para agregar la imagen</span>
              </div>
              <div v-else class="image-preview">
                <img :src="form.imagen" alt="Preview" />
                <button class="btn-remove-img" @click.stop="form.imagen = ''" title="Quitar imagen">
                  <i class="pi pi-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn-save"
            @click="editingHotel ? cloHotel() : closeModal()"
            :disabled="editingHotel && (!form.nombre || !form.ubicacion)"
          >
            <i :class="editingHotel ? 'pi pi-check' : 'pi pi-plus'"></i>
            {{ editingHotel ? 'Guardar Cambios' : 'Añadir Hotel' }}
          </button>
          <button class="btn-cancel" @click="closeModal">
            <i class="pi pi-times"></i> Cancelar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Swal from 'sweetalert2';
  export default {
  name: 'HotelList',
  data() {
    return {
      hotels: [
        {
          id: 1,
          nombre: 'Hotel Paris',
          ubicacion: 'Chalatenango',
          imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdUlfLxP5WhNt_iCgtb2SHcOgpAtYt5Pebg&s'
        },
        {
          id: 2,
          nombre: 'Hotel Villalta',
          ubicacion: 'Ahuachapan',
          imagen: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/703116341.jpg?k=f2f6972b339f2d5424c628d69ab04f172283773233975e1b2e50783be005770c&o='
        },
        {
          id: 3,
          nombre: 'Hotel Miramar',
          ubicacion: 'Sonsonate',
          imagen: 'https://i.pinimg.com/236x/4a/8c/fc/4a8cfcf08f831f867b7c572a732f7e12.jpg'
        },
      ],
      showModal: false,
      editingHotel: null,
      form: { nombre: '', ubicacion: '', departamento: '', imagen: '' },
      nextId: 4,
      defaultImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
      departamentos: [
        'Ahuachapán',
        'Cabañas',
        'Chalatenango',
        'Cuscatlán',
        'La Libertad',
        'La Paz',
        'La Unión',
        'Morazán',
        'San Miguel',
        'San Salvador',
        'San Vicente',
        'Santa Ana',
        'Sonsonate',
        'Usulután'
      ]
    };
  },
  methods: {
    openModal(hotel = null) {
      this.editingHotel = hotel;
      this.form = hotel
        ? { nombre: hotel.nombre,
         ubicacion: hotel.ubicacion
         , departamento: hotel.departamento || '', 
         imagen: hotel.imagen || '' }
        : { nombre: '', ubicacion: '',
         departamento: '', imagen: '' };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingHotel = null;
    },
    confirmDelete(hotel) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
     swalWithBootstrapButtons.fire({
         title: "Eliminar hotel",
         text: "Estas seguro de eliminar el hotel?",
           icon: "warning",
          showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((result) => {
           if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "el hotel a sido eliminado correctamente.",
         icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel) 
         { swalWithBootstrapButtons.fire({
           title: "Cancelado",
         text: "El hotel esta a salvo :)",
          icon: "error"
          });
        }
      });
    },
  },
};
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.hotel {
  font-family: 'Lato', sans-serif;
  background: #f7f5f0;
  min-height: 100vh;
  padding: 32px;
}

.hotel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}
.hotel-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
  color: #1a1a1a;

}
.btn-add {
  background: #417886;
  color: #fff;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  
  align-items: center;

}
.btn-add:hover { background: #ff9305; }

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.hotel-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);

}
.hotel-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.14); }
.hotel-image-wrap { width: 100%; height: 180px; }
.hotel-image { width: 100%; height: 100%; }
.hotel-info {
  padding: 14px 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
}
.hotel-name { font-weight: 700; font-size: 15px; color: #1a1a1a; }
.hotel-location {
  font-size: 13px;
  color: #888;

  align-items: center;
  gap: 4px;
}
.hotel-location .pi { font-size: 12px; }
.hotel-actions { display: flex; gap: 8px; flex-shrink: 0; }
.btn-icon {
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 14px;
}
.btn-delete { color: #e53935; }
.btn-delete:hover { background: #ffeaea; border-color: #e53935; }
.btn-edit { color: #888; }
.btn-edit:hover { background: #f5f5f5; border-color: #aaa; }

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;

}
.modal {
  background: #0d3b8c;
  border-radius: 14px;
  width: 100%; max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  overflow: hidden;
  animation: slideUp 0.22s ease;
  position: relative;
}
.modal-header {
  display: flex; align-items: center; justify-content: center;
  gap: 10px;
  padding: 24px 24px 8px;
}
.modal-header h2 {
  font-size: 22px; font-weight: 800; color: #fff;
  display: flex; align-items: center; gap: 8px;
}
.btn-close {
  position: absolute; top: 16px; right: 20px;
  background: none; border: none;
  font-size: 18px; cursor: pointer;
  color: #fff; opacity: 0.7; transition: opacity 0.15s;
}
.btn-close:hover { opacity: 1; }
.modal-body { padding: 20px 28px; display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label {
  font-size: 14px; font-weight: 700; color: #fff;
  display: flex; align-items: center; gap: 6px;
}
.form-input {
  border: none; border-radius: 6px; padding: 11px 14px;
  font-size: 15px; background: #fff; color: #1a1a1a;
}
.form-input:focus { box-shadow: 0 0 0 3px rgba(255,255,255,0.4); }

.form-select {
  appearance: none;
  -webkit-appearance: none;
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
}
.form-select:focus { box-shadow: 0 0 0 3px rgba(255,255,255,0.4); }

.file-upload-area {
  border: 2px dashed rgba(255,255,255,0.4);
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}
.file-upload-area:hover { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.05); }
.file-upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px;
  color: rgba(255,255,255,0.75);
  text-align: center;
}
.file-upload-placeholder .pi { font-size: 28px; color: rgba(255,255,255,0.6); }
.file-upload-placeholder span { font-size: 14px; font-weight: 600; }
.file-upload-placeholder small { font-size: 12px; opacity: 0.6; }
.image-preview {
  position: relative;
  width: 100%;
  height: 150px;
}
.image-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.btn-remove-img {
  position: absolute; top: 6px; right: 6px;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; cursor: pointer;
  transition: background 0.15s;
}
.btn-remove-img:hover { background: #dc3545; }
.modal-footer { display: flex; gap: 12px; padding: 16px 28px 24px; }
.btn-save {
  flex: 1; padding: 12px; border: none; border-radius: 8px;
  background: #28a745; color: #fff;
}
.btn-save:hover:not(:disabled) { background: #1e7e34; }
.btn-save:disabled { background: #6abf7b; cursor: not-allowed; }
.btn-cancel {
  flex: 1; padding: 12px; border: none; border-radius: 8px;
  background: #dc3545; color: #fff;
  font-size: 15px; font-weight: 700; cursor: pointer;

}
.btn-cancel:hover { background: #b02a37; }
</style>