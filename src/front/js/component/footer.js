import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-5 text-center">
    <div className="container">
      <div className="row ">
        <div className="col-12  mt-5">
          <ul className="list-unstyled d-flex justify-content-between">
            <li><a href="/pagos" className="text-light">Métodos de Pago</a></li>
            <li><a href="/politica" className="text-light">Política de Privacidad</a></li>
            <li><a href="/terminos" className="text-light">Términos y Condiciones</a></li>
            <li><a href="/faq" className="text-light">Preguntas Frecuentes (FAQ)</a></li>
            <li className="text-light">Contact us
              <p>retrovinyl@gmail.com</p>
            </li>
          </ul>
          <div className="row d-flex justify-content-center">
            <p>&copy; 2025 RetroVinyl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
