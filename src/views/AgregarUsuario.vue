<template>
    <div>
        <h1>Agregar un nuevo usuario</h1>
    </div>
  <div class="form-container">
    <h2>Informacion del usuario</h2>
    <p></p>

      <div class="form-group">
        <label for="nombre">Nombre del usuario:</label>
        <input type="text" id="nombre" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" />
      </div>
      <div class="form-group">
        <label for="correo">Correo Electrónico:</label>
        <input type="email" id="correo" />
      </div>


      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" />
      </div>
      <div class="form-group">
        <label for="rol">Rol:</label>
          <select id="rol">
           <option value="gerente">Gerente</option>
         <option value="recepcionista">Recepcionista</option>
  </select>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn-guardar">
           Registrar Usuario
        </button>
        <button type="button" class="btn-cancelar">
           Cancelar
        </button>
      </div>

  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  background: #083b7e;
  box-shadow: 0 4px 10px  rgb(165, 156, 156);
  font-family: Arial, Helvetica, sans-serif;
  color: #ffff;
}
h1{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    background-color: #083b7e;
    color:#ffff

}

h2 {
  text-align: center;
  margin-bottom: 5px;
  font-family: Arial, Helvetica, sans-serif;
}

.subtitle {
  text-align: center;
  color: #f0eaf0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
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
select{
  font-size: 18px;
  padding: 10px;
}


</style>
