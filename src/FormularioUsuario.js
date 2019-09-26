import React from "react";

const FormularioUsuario = ({
  nombre = "",
  email = "",
  telefono = "",
  onUsuarioChange = () => {},
  onUserCreate = () => {},
  valueBtn,
  indice = "",
  onUpdateUser = () => {}
}) => (
  <form>
    Nombre
    <input name="nombre" value={nombre} onChange={onUsuarioChange} />
    Email
    <input name="email" value={email} onChange={onUsuarioChange} />
    Telefono
    <input name="telefono" value={telefono} onChange={onUsuarioChange} />
    <button type={indice === '' ? 'submit': 'reset'} onClick={indice === '' ? onUserCreate : () => onUpdateUser(indice.indice)}>{valueBtn}</button>
  </form>
);

export default FormularioUsuario;
