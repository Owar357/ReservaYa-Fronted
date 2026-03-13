<template>
  <div>
    <h1 class="text-center" >Bienvenido a ReservaYa.
      <div></div>
       Reserva con confianza, viaja con tranquilidad.</h1>
  </div>

  <div class="page-layout">
    <aside class="sidebar">
      <h2 class="title">Filtra por</h2>
      <div v-for="group in filters" :key="group.id" class="group">
        <p class="group-title">{{ group.label }}:</p>
        <div class="options">
          <label
            v-for="opt in group.options"
            :key="opt"
            class="option-row"
            @click="toggle(group.id, opt)">
            <span class="option-label" :class="{ selected: isSelected(group.id, opt) }">
              {{ opt }}
            </span>
            <div class="checkbox" :class="{ active: isSelected(group.id, opt) }">
              <svg v-if="isSelected(group.id, opt)" width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 3.5L3.8 6.5L9 1" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </label>
        </div>
      </div>
    </aside>

    <main class="dataview-container">
      <div
        v-for="(hotel, index) in sortedHotels"
        :key="hotel.id"
        class="hotel-row"
        :class="{ 'border-top': index !== 0 }">

        <div class="hotel-img-wrap">
          <img src="https://i.pinimg.com/736x/45/af/0b/45af0bc8562f31ba586a29448c723517.jpg" :alt="hotel.name" />
        </div>

        <div class="hotel-info">
          <div class="hotel-direccion">{{ hotel.direccion }}</div>
          <div class="hotel-name">{{ hotel.name }}</div>
          <div class="rating-row"></div>
        </div>

        <div class="hotel-right">
          <div class="hotel-precio">
            ${{ hotel.precio }}
            <small>Precio/Noche desde</small>
          </div>
          <div class="actions">
            <button
              class="btn btn-outline"
              :class="{ active: hotel.favorite }"
              @click="toggleFavorite(hotel)"
              title="Guardar">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            <button class="btn btn-primary" @click="verHabitaciones(hotel)">
              Ver Habitaciones
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'

// FILTROS 
const filters = [
  {
    id: 'precio',
    label: 'Precio',
    options: [
      '$0.00 - $50.00',
      '$50.00 - $150.00',
      '$150.00 - $300.00',
      '$300.00 - $500.00',
    ],
  },
  {
    id: 'lugar',
    label: 'Lugar',
    options: [
      'San Salvador', 'Chalatenango', 'Cabañas', 'San Miguel',
      'Cuscatlán', 'La Paz', 'La Libertad', 'Sonsonate',
      'Ahuachapán', 'Santa Ana', 'Morazán', 'La Unión',
    ],
  },
]
const selected = ref({})

const isSelected = (groupId, value) => {
  return selected.value[groupId] === value
}

const toggle = (groupId, value) => {
  if (selected.value[groupId] === value) {
    selected.value[groupId] = null  
  } else {
    selected.value[groupId] = value  
  }
}


// HOTELES
const sortKey = ref('')

const hotels = ref([
  {
    id: 1,
    name: 'Hotel Villa Izalco',
   direccion: ' Ubicacion: Departamento La paz',
    image: 'https://via.placeholder.com/140x100',
    precio: 50,
  
  },
  {
    id: 2,
    name: 'Hotel Villa Dorada',
    direccion: 'Ubicacion: Departamento Sonsonate',
    image: 'https://via.placeholder.com/140x100',
    precio: 100,
  
  },
])

const toggleFavorite = (hotel) => {
  hotel.favorite = !hotel.favorite
}

const verHabitaciones = (hotel) => {
  alert(`Ver habitaciones de: ${hotel.name}`)
}

const sortedHotels = computed(() => {
  const list = [...hotels.value]
  if (sortKey.value === 'precio_asc')  return list.sort((a, b) => a.precio - b.p)
  if (sortKey.value === 'precio_desc') return list.sort((a, b) => b.precio - a.pr)
  return list
})

</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }


.page-layout {
  display: flex;
  gap: 24px;
  padding: 24px;
  align-items: flex-start;
  font-family: Arial, sans-serif;
  color: #2e2d2d;
}

.sidebar {
  width: 220px;
  min-width: 220px;
  background: #f5f5f5; 
  padding: 16px;
  align-self: auto;
  min-height: calc(100vh - 48px);
  height: auto;
}
.title { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 16px; }
.group { margin-bottom: 18px; }
.group-title { font-size: 13px; font-weight: 700; color: #111111; margin-bottom: 8px; }
.options { display: flex; flex-direction: column; gap: 4px; }
.option-row {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 3px 0; cursor: pointer;
}
.option-label { font-size: 13px; color: #252525; transition: color 0.15s; }
.option-label.selected { color: #661313; font-weight: 600; }
.checkbox {
  width: 15px; height: 15px;
  border: 1px solid #9bafc9; border-radius: 2px;
  background: #fff; display: flex;
  align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.15s;
}
.checkbox.active { background: #111; border-color: #111; }

/* Hoteles */
.dataview-container {
  flex: 1;
  background: transparent; 
  border: none;             
  border-radius: 8px;
  overflow: visible;        
  display: flex;
  flex-direction: column;
  gap: 0.75rem;             
}

.hotel-row {
  display: flex; align-items: center;
  padding: 1rem 1.25rem; gap: 1rem;
  transition: background 0.15s;
  background: #fff;                           
  border: 1px solid #e0e0e0;                  
  border-radius: 8px;                           
  box-shadow: 0 2px 8px rgba(197, 187, 187, 0.6); 
}

.hotel-row:hover { 
  background: #d2e8ee; 
  box-shadow: 0 4px 16px rgba(197, 187, 187, 0.9);
}

.border-top { border-top: none; } 

.hotel-img-wrap {
  position: relative;
  width: 140px; min-width: 140px; height: 100px;
  border-radius: 8px; overflow: hidden; flex-shrink: 0;
}
.hotel-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

.status-badge {
  position: absolute; top: 0; left: 0;
  padding: 0.22rem 0.5rem;
  font-size: 0.62rem; font-weight: 700;
  color: #be1c1c; border-radius: 0 0 8px 0;
}
 

.hotel-info { flex: 1; min-width: 0; }
.hotel-category { font-size: 0.78rem; color: #6c757d; }
.hotel-name { font-size: 1.05rem; font-weight: 600; color: #212529; margin: 0.15rem 0 0.4rem; }


.hotel-right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: 0.75rem; flex-shrink: 0;
}
.hotel-precio { font-size: 1.25rem; font-weight: 700; color: #212529; text-align: right; }
.hotel-precio small { font-size: 0.7rem; font-weight: 600; color: #0b1116; display: block; }

.actions { display: flex; gap: 0.5rem; align-items: center; }

.btn {
  cursor: pointer; border: none;
  font-size: 0.85rem; font-weight: 500;
  border-radius: 6px; transition: all 0.18s;
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.btn-outline {
  width: 38px; height: 38px; justify-content: center;
  background: transparent; border: 1px solid #ced4da !important; color: #6c757d;
}
.btn-outline:hover, .btn-outline.active { border-color: #ff6b6b !important; color: #ff6b6b; }
.btn-outline.active svg { fill: #ff6b6b; }
.btn-primary { padding: 0.55rem 1.1rem; background: #ff6b6b; color: #fff; }
.btn-primary:hover { background: #ff6b6b; }

.icon {
  width: 16px; height: 16px;
  fill: none; stroke: currentColor;
  stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
}
</style>