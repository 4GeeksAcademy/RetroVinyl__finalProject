import React, { useState } from "react";
import "../../styles/registro.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';


export const Register = () => {
  const [email, setEmail] = useState(""); // Guardamos el email
  const [password, setPassword] = useState(""); // Guardamos la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Guardamos la confirmación de contraseña
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sign_up = async () => {
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.msg) {
        setMessage(data.msg); // Si la respuesta tiene "msg", lo mostramos
      } else {
        setMessage("¡Usuario registrado con éxito!");
        navigate("/");
      }
    } catch (error) {
      setMessage("Hubo un problema con la solicitud. Intenta nuevamente."); // Si ocurre un error en la solicitud
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // para que no se recargue de la página
    sign_up();
  };


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    pauseOnHover: false,
    centerMode: true,   // Añadido para evitar esperas
    //waitForAnimate: false //me hace un efecto raro de caida* 
  };

  const Carousel = ({ speed = 3000 }) => (
    <div className="row slider-container" style={{ overflow: "hidden" }}>
      <Slider {...{ ...settings, speed }}>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/the-dark-side-of-the-moon.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://www.efeeme.com/wp-content/uploads/2016/08/velvet-underground-03-08-16-k.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/animals-pink-floyd.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/led-zeppelin-led-zeppelin.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/abbey-road-the-beatles.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/aladin-sane-david-bowie.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/atom-heart-mother-pink-floyd.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/nevermind-nirvana.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/ziggy-stardust-david-bowie.jpg" alt="image" className="slider-image" />
        </div>
      </Slider>
    </div>
  );

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-6 col-sm-8">
          <div className="cardshadow card">
            <div className="card-body">
              <h3 className="card-title1 text-center mb-4">Registrarse</h3>
              <form onSubmit={handleSubmit}>
                <div className="label mb-4">
                  <label htmlFor="inputEmail3" className="form-label">Email</label>
                  <input type="email"
                    className="form-control"
                    id="inputEmail3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="label mb-4">
                  <label htmlFor="inputPassword3" className="form-label">Contraseña</label>
                  <input type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <div className="label mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                </div>
                <div className="label mb-4">
                  <label className="form-label" >Términos y Condiciones</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="acceptTerms"
                      required
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      Aceptar
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Registrarse
                </button>
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

export default Register;