import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer mt-5 text-center">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-5">
          <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-md-between">
            <li className="mb-3 mb-md-0"><a href="/pagos" className="text-light">Métodos de Pago</a></li>
            <li className="mb-3 mb-md-0"><a href="/politica" className="text-light">Política de Privacidad</a></li>
            <li className="mb-3 mb-md-0"><a href="/terminos" className="text-light">Términos y Condiciones</a></li>
            <li className="mb-3 mb-md-0"><a href="/faq" className="text-light">Preguntas Frecuentes (FAQ)</a></li>
            <li className="mb-3 mb-md-0 text-light">
              Contact us
              <p className="mb-0">retrovinyl@gmail.com</p>
            </li>
          </ul>
          <div className="row d-flex justify-content-center mt-3">
            <p>&copy; 2025 RetroVinyl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
