import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";

export const Perfil = () => {
  const { store, actions } = useContext(Context);

  // Establecer el estado para cada campo de entrada
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

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeSurname = (e) => setSurname(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeMobile = (e) => setMobile(e.target.value);
  const handleChangePostcode = (e) => setPostcode(e.target.value);
  const handleChangeState = (e) => setState(e.target.value);
  const handleChangeArea = (e) => setArea(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeCountry = (e) => setCountry(e.target.value);
  const handleChangeRegion = (e) => setRegion(e.target.value);

  // Función para guardar los datos
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
    }};


    

  return (
    <div className="bodyuser container rounded mt-5 mb-5">
      <div className="row input-group">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-1">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
              <input type="file" id="changeAvatar" 
              />
            <span className="font-weight-bold text-light">{name}{surname}</span>
            <span className="text-light-50">{email}</span>
            <button className="btn btn-outline-danger mt-5">
              <i className="fa fa-plus"></i>&nbsp;Change photo
            </button>
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
