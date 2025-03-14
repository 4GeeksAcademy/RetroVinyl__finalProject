import React, { useState, useContext, use } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/registro.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { actions, store } = useContext(Context)

  const sign_in = async (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión...");

    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error de respuesta:", errorData);
        setMessage(errorData.msg || "Hubo un error con el inicio de sesión.");
        return;
      }

      const data = await response.json(); // Convertimos la respuesta a JSON
      console.log("Datos de login exitoso:", data);

      localStorage.setItem("token", data.access_token);  // Guardamos el token en el localStorage
      actions.login(data.access_token);

      setMessage("¡Usuario logueado con éxito!");
      navigate("/");

    } catch (error) {
      console.error("Error al hacer la solicitud:", error); // Mostramos el error en la consola
      setMessage("Hubo un problema con la solicitud. Intenta nuevamente.");
    }
  };

  return (
    <div className="container py-3 mt-4">
      <div className="row">
        <div className="col-md-6 col-sm-8">
          <div className="cardshadow card">
            <div className="card-body">
              <h3 className="card-title2 text-center mt-2 mb-5">Iniciar Sesión</h3>
              <form onSubmit={sign_in}>
                <div className="label mb-5">
                  <label htmlFor="inputEmail3" className="form-label">Email</label>
                  <input type="email"
                    className="form-control"
                    id="inputEmail3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="label mb-5">
                  <label htmlFor="inputPassword3" className="form-label">Contraseña</label>
                  <input type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <button type="submit" className="btn btn-danger mt-2 mb-5 w-100">
                  Inciar Sesión
                </button>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <h6 className="registrarse text-white text-center mb-3"> ¿No tienes una cuenta? Registrate</h6>
                </Link>
              </form>
              {message && <p>{message}</p>} {/* Mostrar el mensaje de respuesta */}
            </div>
          </div>
        </div>
        <div className="registro col-md-6 col-sm-4">
          <div className="row">
            <div className="col-md-4 ">
              <Carousel speed={3000} />
            </div>
            <div className="col-md-4">
              <Carousel speed={4000} />
            </div>
            <div className="col-md-4">
              <Carousel speed={5000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;