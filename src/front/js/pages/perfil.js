import React, { useState, useEffect } from "react";
import "../../styles/perfil.css";

export const Perfil = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [initials, setInitials] = useState("");
  const [profileExists, setProfileExists] = useState(false);

  const handleSave = () => {
    const userProfile = {
      name,
      sur_name: surname,
      username,
      mobile_number: mobile,
      post_code: postcode,
      state,
      email,
      password,
      country,
      region_state: region,
      initials,
    }
    if (profileExists) {
      update_profile(userProfile); // Si el perfil existe, actualizamos los datos.
    } else {
      create_profile(userProfile); // Si el perfil no existe, lo creamos.
    }
  };

  // Función para obtener las iniciales
  const getInitials = (fullname) => {
    if (!fullname) return ""; // Si el fullname es vacío o nulo, devolvemos un string vacío

    const words = fullname.split(" "); // Dividimos el nombre completo en palabras
    return words
      .filter(word => word.length > 0) // Filtramos palabras vacías (por si hay múltiples espacios)
      .map((word) => word[0]?.toUpperCase()) // Aseguramos que la primera letra existe antes de aplicar toUpperCase() que es el que devuelve la longitud de caracteres en mayúsucla
      .join(""); // Unimos las iniciales en un string
  };

  useEffect(() => {
    const fullname = `${name} ${surname}`;
    const initials = getInitials(fullname);
    setInitials(initials);// Actualizamos el estado de las iniciales 
    get_profile();
  }, [name, surname]);


  //GET
  const get_profile = async () => {

    const token = localStorage.getItem("token");
    console.log(token);

    const myHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // PORQUE NO LO TOMA?
    };

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/perfil`, requestOptions);

      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // PUT
  const update_profile = async (userProfile) => {
    const token = localStorage.getItem("token");
    console.log(token);


    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Agregamos el token en el header de autorización
    };

    const raw = JSON.stringify(userProfile);  // Enviar el objeto de perfil directamente

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


  // POST
  const create_profile = async (userProfile) => {
    const token = localStorage.getItem("token");
    console.log(token);


    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Agregamos el token en el header de autorización
    };

    const raw = JSON.stringify(userProfile);  // Enviar el objeto de perfil directamente

    const requestOptions = {
      method: "POST",
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
              {initials}
            </div>
            <span className="font-weight-bold text-light mt-5">{name} {surname}</span>
            <span className="text-light-50">{email}</span>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Region/State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter region/state"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
