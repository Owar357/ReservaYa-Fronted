<template>
  <div class="form-container">
    <h1>Agregar un nuevo usuario</h1>
    <h2>Informacion del usuario</h2>

    <div class="form-group">
      <label for="nombre">Nombre del usuario:</label>
      <input v-model="form.nombre" type="text" id="nombre" placeholder="Nombre completo" />
    </div>
    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input v-model="form.password" type="password" id="password" placeholder="••••••••" />
    </div>
    <div class="form-group">
      <label for="correo">Correo Electrónico:</label>
      <input v-model="form.correo" type="email" id="correo" placeholder="correo@ejemplo.com" />
    </div>
    <div class="form-group">
      <label for="rol">Rol:</label>
      <select v-model="form.rol" id="rol">
        <option value="GERENTE">Gerente</option>
        <option value="RECEPCIONISTA">Recepcionista</option>
      </select>
    </div>

    <div class="form-buttons">
      <button type="button" class="btn-guardar" @click="registrar">
        Registrar Usuario
      </button>
      <button type="button" class="btn-cancelar" @click="emit('cancelar')">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  hotelId: {
    type: Number,
    required: true
  }
})

const authStore = useAuthStore()
const emit = defineEmits(['cancelar', 'registrado'])

const form = reactive({
  nombre: '',
  password: '',
  correo: '',
  rol: 'RECEPCIONISTA'
})

async function registrar() {
  if (!form.nombre || !form.correo || !form.password) {
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Nombre, correo y contraseña son obligatorios.',
      confirmButtonColor: '#083b7e'
    })
    return
  }

  try {
    await api.post('/admin/hotelusuarios', {
      hotel_id: props.hotelId,
      name: form.nombre,
      email: form.correo,
      password: form.password,
      rol: form.rol,
      fecha_asignacion: new Date().toISOString().split('T')[0]
    })

    Swal.fire({
      icon: 'success',
      title: '¡Registrado!',
      text: `El usuario ${form.nombre} fue agregado correctamente.`,
      confirmButtonColor: '#083b7e',
      timer: 2000,
      showConfirmButton: false
    })

    form.nombre = ''
    form.password = ''
    form.correo = ''
    form.rol = 'RECEPCIONISTA'

    emit('registrado')

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message ?? 'No se pudo registrar el usuario.',
      confirmButtonColor: '#083b7e'
    })
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  background: #083b7e;
  box-shadow: 0 4px 10px rgb(165, 156, 156);
  font-family: Arial, Helvetica, sans-serif;
  color: #ffff;
}
h1 {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #ffff;
  margin-bottom: 4px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
.form-group {
  margin-bottom: 18px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
}
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.btn-guardar {
  flex: 1;
  margin-right: 10px;
  background: #27ae60;
  color: #f5f3f3;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}
.btn-guardar:hover { background: #219a52; }
.btn-cancelar {
  flex: 1;
  margin-left: 10px;
  background: #c52626;
  color: #f8f8f8;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}
.btn-cancelar:hover { background: #a81f1f; }
</style>
