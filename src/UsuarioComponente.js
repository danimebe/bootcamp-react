import React from "react";

const UsuarioComponente = ({
  indice,
  nombre = "vacio",
  email = "vacio",
  telefono = "vacio",
  seleccionar = () => { },
  eliminar = () => { }
}) => (
    <tr>
      <td>{nombre}</td>
      <td>{email}</td>
      <td>{telefono}</td>
      <td id="btn">
        <button onClick={() => seleccionar({ nombre, email, telefono }, {indice})}>
          editar
      </button>
        <button onClick={() => eliminar(indice)}>Eliminar</button>
      </td>
    </tr>
  );

export default UsuarioComponente;
