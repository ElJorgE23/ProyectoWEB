import React, { useState, useEffect } from "react";

function MiComponente() {
  // Estado para almacenar los datos
  const [datos, setDatos] = useState([]);
  const [nuevoDato, setNuevoDato] = useState("");
  const [editandoIndex, setEditandoIndex] = useState(null);

  useEffect(() => {
    try {
      const datosGuardados = JSON.parse(localStorage.getItem("misDatos"));
      setDatos(Array.isArray(datosGuardados) ? datosGuardados : []);
    } catch (error) {
      console.error("Error al cargar datos de localStorage:", error);
      setDatos([]);
    }
  }, []);
  

  // Guardar datos en localStorage
  const guardarEnLocalStorage = (datosActualizados) => {
    localStorage.setItem("misDatos", JSON.stringify(datosActualizados));
    setDatos(datosActualizados);
  };

  // Agregar nuevo dato
  const manejarAgregarDato = () => {
    if (!nuevoDato.trim()) return;
    const datosActualizados = [...datos, nuevoDato];
    guardarEnLocalStorage(datosActualizados);
    setNuevoDato("");
  };

  // Editar dato existente
  const manejarEditarDato = (index) => {
    setNuevoDato(datos[index]);
    setEditandoIndex(index);
  };

  // Guardar edición de un dato
  const manejarGuardarEdicion = () => {
    if (!nuevoDato.trim() || editandoIndex === null) return;
    const datosActualizados = datos.map((dato, index) =>
      index === editandoIndex ? nuevoDato : dato
    );
    guardarEnLocalStorage(datosActualizados);
    setNuevoDato("");
    setEditandoIndex(null);
  };

  // Eliminar un dato
  const manejarEliminarDato = (index) => {
    const datosActualizados = datos.filter((_, i) => i !== index);
    guardarEnLocalStorage(datosActualizados);
  };

  return (
    <div>
      <h2>Gestión de Datos</h2>
      <input
        type="text"
        value={nuevoDato}
        onChange={(e) => setNuevoDato(e.target.value)}
        placeholder="Ingrese un dato"
      />
      {editandoIndex !== null ? (
        <button onClick={manejarGuardarEdicion}>Guardar Edición</button>
      ) : (
        <button onClick={manejarAgregarDato}>Agregar</button>
      )}

      <ul>
        {datos.length > 0 ? (
          datos.map((dato, index) => (
            <li key={index}>
              {dato}
              <button onClick={() => manejarEditarDato(index)}>Editar</button>
              <button onClick={() => manejarEliminarDato(index)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay datos guardados</p>
        )}
      </ul>
    </div>
  );
}

export default MiComponente;
