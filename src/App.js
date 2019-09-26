import React from "react";
import "./App.css";
import UsuarioComponente from "./UsuarioComponente";
import FormularioUsuario from "./FormularioUsuario";

class App extends React.Component {
  constructor() {
    super();
    this.seleccionarUsuarioAEditar = this.seleccionarUsuarioAEditar.bind(this);
    this.state = {
      usuarioAEditar: {
        nombre: "",
        email: "",
        telefono: ""
      },
      usuarios: [],
      valueBtnForm: 'Guardar',
      indiceAEditar: '',
    };
  }

  componentDidMount() {
    this.listarUsuarios();
  }

  async seleccionarUsuarioAEditar(usuario, indice) {
    await this.setState({ usuarioAEditar: usuario, valueBtnForm: 'Editar', indiceAEditar: indice });
  }

  onUsuarioChange = evento => {
    const namedelinput = evento.target.name;
    console.log("namedelinput", namedelinput);

    let { usuarioAEditar } = this.state;
    let newUsuario = { ...usuarioAEditar };

    const valordelinput = evento.target.value;
    console.log("valordelinput", valordelinput);

    newUsuario[namedelinput] = valordelinput;

    this.setState(estadoActual => ({
      ...estadoActual,
      usuarioAEditar: newUsuario
    }));

    console.log(this.state);
  };

  crearNuevoUsuario = evento => {
    evento.preventDefault();
    fetch('https://nodeco-dia3.danielmb0515.now.sh/usuarios', {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      //credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.usuarioAEditar) // body data type must match "Content-Type" header
    })
      .then(respuestaStream => respuestaStream.json())
      .then(usuarioRecienCreado => {
        let { usuarios } = this.state;
        let nuevosUsuarios = [...usuarios, usuarioRecienCreado];
        this.setState({
          usuarios: nuevosUsuarios
        });
      })
      .catch(error => console.log(error));
  };

  listarUsuarios = async () => {
    try {
      const users = await fetch('https://nodeco-dia3.danielmb0515.now.sh/usuarios', {
        method: "GET"
      });

      this.setState({
        usuarios: await users.json()
      });
    } catch (err) {
      console.log(err);
    }
  }

  editarUsuario = async (indice) => {
    
    try {
      console.log(indice);
      const updatedUserStream = await fetch(`https://nodeco-dia3.danielmb0515.now.sh/usuarios/${indice}`, {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache",
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.usuarioAEditar)
      });
      let updatedUser = await updatedUserStream.json();
      let { usuarios } = this.state;
      let nuevoUsersArray = [...usuarios];
      nuevoUsersArray[indice] = updatedUser;
      alert('Usuario actualizado exitosamente');
      this.setState({
        usuarios: nuevoUsersArray,
        indiceAEditar: '',
        valueBtnForm: 'Guardar',
        usuarioAEditar: {
          nombre: "",
          email: "",
          telefono: ""
        }
      })
    } catch (err) {
      console.error(err);
    }
  }

  eliminarUsuario = async (indice) => {
    try {
      const deletedUser = await fetch(`https://nodeco-dia3.danielmb0515.now.sh/usuarios/${indice}`, {
        method: "DELETE"
      });
      console.log(await deletedUser.json());
      const newUsersArray = this.state.usuarios;
      newUsersArray.splice(indice, 1);
      console.log(newUsersArray);
      this.setState({
        usuarios: newUsersArray
      })
      alert('Usuario eliminado exitosamente');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Usuarios</h1>
        <div className="special-thanks">
          Estilos por nikhil8krishnan en{" "}
          <a
            href="https://codepen.io/nikhil8krishnan/pen/WvYPvv"
            target="_blank"
          >
            codepen
          </a>
        </div>
        <div className="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>email</th>
                <th>telefono</th>
                <th>Editar - Eliminar</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {this.state.usuarios.map((unUsuarioDelArray, indice) => (
                <UsuarioComponente
                  key={indice}
                  indice={indice}
                  {...unUsuarioDelArray}
                  seleccionar={this.seleccionarUsuarioAEditar}
                  eliminar={this.eliminarUsuario}
                />
              ))}
            </tbody>
          </table>
        </div>
        <FormularioUsuario
          {...this.state.usuarioAEditar}
          onUsuarioChange={this.onUsuarioChange}
          onUserCreate={this.crearNuevoUsuario}
          valueBtn={this.state.valueBtnForm}
          indice={this.state.indiceAEditar}
          onUpdateUser={this.editarUsuario}
        />
      </div>
    );
  }
}

export default App;
