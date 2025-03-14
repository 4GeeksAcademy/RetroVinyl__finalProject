import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/perfil.css";

export const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    sur_name: "",
    username: "",
    password: "",
    mobile_number: "",
    post_code: "",
    state: "",
    email: "",
    password: "",
    country: "",
    region_state: "",
    initials: "",
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    update_profile();
    navigate("/")
  }

  console.log(user);

 
  const getInitials = (name, sur_name) => {
    // Si los campos no están vacíos, usamos las iniciales
    const nameInitial = name ? name[0]?.toUpperCase() : "";
    
    const surNameInitial = sur_name ? sur_name[0]?.toUpperCase() : "";
  
    // Retornamos las iniciales concatenadas 
    return nameInitial + surNameInitial;
  };

   // Función para obtener las iniciales deforma dinámica
  useEffect(() => {
    const initials = getInitials(user.name, user.sur_name);
    setUser(prevUser => ({
      ...prevUser,
      initials,
    }));
  }, [user.name, user.sur_name]);


  useEffect(() => {
    get_profile();
  }, []);

  //GET
  const get_profile = async () => {

    const token = localStorage.getItem("token");
    

    const myHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/perfil`, requestOptions);

      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }

      const result = await response.json();
      console.log(result);
      const initials = getInitials(result.name, result.sur_name);

      setUser({ ...user, ...result, initials });
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // PUT
  const update_profile = async () => {
    const token = localStorage.getItem("token");
    console.log(token);


    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Agregamos el token en el header de autorización
    };

    const raw = JSON.stringify(user);  // Enviar el objeto de perfil directamente

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/perfil`, requestOptions);

      if (!response.ok) {
        const result = await response.json();
        console.error("Detalles del error:", result);  // Ver detalles del error
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);  // Manejo de errores
    }
  };

  return (
    <div className="bodyuser container rounded mt-5 mb-5">
      <div className="row input-group">
        <div className="col-md-6 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-1">
            <div className="rounded-circle mt-5" style={{ width: "300px", height: "300px" }}>
              {user.initials}
            </div>
            <span className="font-weight-bold text-light">{user.name} {user.sur_name}</span>
            <span className="text-light-50">{user.email}</span>
          </div>
        </div>
        <div className="col-md-6 border-right">
          <div className=" text-light py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="profile text-center">Mi Perfil</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  value={user.sur_name}
                  name="sur_name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre de Usuario"
                  value={user.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">N° de contacto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="teléfono"
                  value={user.mobile_number}
                  name="mobile_number"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Domicilio</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="domicilio"
                  value={user.state}
                  name="state"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Código Postal</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="código postal"
                  value={user.post_code}
                  name="post_code"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">País</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="país"
                  value={user.country}
                  name="country"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Provincia</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="provincia"
                  value={user.region_state}
                  name="region_state"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                className="btn btn-danger profile-button"
                type="button"
                onClick={handleSave} // Llamada a la función para guardar los datos
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
