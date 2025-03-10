import React, { useState, useEffect } from "react";
import "../../styles/perfil.css";

export const Perfil = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [initials, setInitials] = useState("");

  const handleSave = () => {
    const userProfile = {
      name,
      surname,
      username,
      mobile,
      postcode,
      state,
      area,
      email,
      password,
      country,
      region,
      initials,
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
    setInitials(initials); // Actualizamos el estado de las iniciales
  }, [name, surname]);


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
