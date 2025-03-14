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

  // Función para obtener las iniciales
  const getInitials = (name, sur_name) => {
    if (!name || !sur_name) return ""; // Si el fullname es vacío o nulo, devolvemos un string vacío

    const initials = name[0]?.toUpperCase() + sur_name[0]?.toUpperCase(); // Concatenamos la inicial del nombre y apellido
    return initials;
  };
   

  useEffect(() => {
    get_profile();
  }, []);


  //GET
  const get_profile = async () => {

    const token = localStorage.getItem("token");
    console.log(token);

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

      setUser({...user,...result, initials});
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
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-1">
            <div className="rounded-circle mt-5 " style={{ width: "140px", height: "140px" }}>
            {user.initials}
            </div>
            <span className="font-weight-bold text-light mt-5">{user.name} {user.sur_name}</span>
            <span className="text-light-50">{user.email}</span>
          </div>
        </div>

        <div className="col-md-5 border-right">
          <div className=" text-light py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  value={user.sur_name}
                  name="sur_name"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={user.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={user.mobile_number}
                  name="mobile_number"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter postcode"
                  value={user.post_code}
                  name="post_code"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter state"
                  value={user.state}
                  name="state"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter country"
                  value={user.country}
                  name="country"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Region/State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter region/state"
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
