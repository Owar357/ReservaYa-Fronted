<template>
  <div class="container">
    
    <div class="sidebar">
      <h3>Filtrar</h3>
      <div class="filter-group">
        <label>Fecha inicio</label>
        <input type="date" v-model="fechaInicio" />
      </div>
      <div class="filter-group">
        <label>Fecha final</label>
        <input type="date" v-model="fechaFin" />
      </div>
    </div>

  
    <div class="main-panel">
      <h3>Mis Reservas de hoteles</h3>

      <table>
        <thead>
          <tr class="thead-row">
            <th class="th">Usuario</th>
            <th class="th">Hotel</th>
            <th class="th">Fecha Inicio</th>
            <th class="th">Fecha Salida</th>
            <th class="th"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="fila">
            <td class="td">Carlos Reyes</td>
            <td class="td">Hotel Villa Izalco</td>
            <td class="td">10/01/2026</td>
            <td class="td">12/01/2026</td>
            <td class="td"><button class="btn-cancelar">Cancelar reserva</button></td>
          </tr>
          <tr class="fila">
            <td class="td">Carlos Reyes</td>
            <td class="td">Hotel Miramar</td>
            <td class="td">21/01/2026</td>
            <td class="td">24/01/2026</td>
            <td class="td"><button class="btn-cancelar">Cancelar reserva</button></td>
          </tr>
          <tr class="fila">
            <td class="td">Carlos Reyes</td>
            <td class="td">Hotel Costa de El Sol</td>
            <td class="td">27/01/2026</td>
            <td class="td">31/01/2026</td>
            <td class="td"><button class="btn-cancelar">Cancelar reserva</button></td>
          </tr>
          <tr class="fila">
            <td class="td">Carlos Reyes</td>
            <td class="td">Hotel Playa Paraíso</td>
            <td class="td">01/02/2026</td>
            <td class="td">06/02/2026</td>
            <td class="td"><button class="btn-cancelar">Cancelar reserva</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ReservasHoteles',
  data() {
    return {
      fechaInicio: '2026-01-01',
      fechaFin: '2026-03-07'
    }
  }
}
</script>

<style scoped>

.container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  font: optional;
}


.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 140px;
}

.sidebar h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 15px;
  color: #0c0a0a;
}

.filter-group input[type="date"] {
  background: #94cae4;
  border: none;
  padding: 6px 10px;
  font-size: 15px;
  border-radius: 4px;
}


.main-panel {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.main-panel h3 {
  margin: 0 0 1rem;
  font-size: 18px;
  font-weight: 700;
}


table {
  width: 100%;
  border-collapse: collapse;
}

.thead-row {
  border-bottom: 2px solid #181717;
}

.th {
  padding: 12px 16px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: #030303;
}

.fila {
  border-bottom: 1px solid #141518;
}

.td {
  padding: 14px 16px;
  font-size: 14px;
  color: #111827;
}

.btn-cancelar {
  background: #e53e3e;
  color: #f3eded;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.btn-cancelar:hover {
  background: #c53030;
}
</style>