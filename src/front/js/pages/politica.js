import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pedidos.css';

export const PoliticaPrivacidad = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left ml-5 arrow-icon"></i>
            </div>
            <div className="politica-privacidad container text-start pb-5 w-75" style={{ overflow: "hidden" }}>
                <div>
                    <h1 className="mispedidos text-light text-center pt-5 pb-3 mb-3">Política de Privacidad</h1>
                </div>
                <div className="row p-4">
                    <div className="col-md-12 text-light fs-4">
                        <div className="text-start">
                            <h3 className="metodos mb-5"><strong>Tu privacidad es importante para nosotros</strong></h3>
                            <h4 className="metodos mb-5">En nuestra tienda online, valoramos tu privacidad y trabajamos para proteger tus datos personales. A continuación, te explicamos cómo recolectamos, usamos y protegemos tu información.</h4>

                            <h4 className="metodos mt-5 mb-3"><strong>¿Qué datos recolectamos?</strong></h4>
                            <ul>
                                <li>Recopilamos información personal cuando realizas una compra, te registras en nuestra web o te suscribes a nuestro boletín. Esta información incluye:</li>
                                <ul>
                                    <li>Nombre</li>
                                    <li>Dirección de correo electrónico</li>
                                    <li>Dirección de envío y facturación</li>
                                    <li>Información de pago (como número de tarjeta de crédito)</li>
                                </ul>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>¿Cómo usamos tus datos?</strong></h4>
                            <ul>
                                <li>Usamos tu información para:</li>
                                <ul>
                                    <li>Procesar y enviar tus pedidos.</li>
                                    <li>Mejorar nuestra tienda y servicios.</li>
                                    <li>Enviarte información relevante, como novedades, promociones y ofertas.</li>
                                    <li>Mejorar tu experiencia de compra en nuestra web.</li>
                                </ul>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>Protección de tus datos</strong></h4>
                            <ul>
                                <li>Implementamos medidas de seguridad para proteger tu información personal.</li>
                                <li>Utilizamos tecnologías como encriptación SSL para garantizar que tus datos de pago estén protegidos.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>Compartir información con terceros</strong></h4>
                            <ul>
                                <li>No compartimos tu información personal con terceros, excepto cuando sea necesario para completar tu pedido (por ejemplo, con empresas de envío o proveedores de pago como Stripe).</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>Tus derechos</strong></h4>
                            <ul>
                                <li>Tienes derecho a acceder, modificar o eliminar tus datos personales en cualquier momento. Si deseas actualizar tu información o ejercer tus derechos, puedes contactarnos a través de [correo electrónico de contacto].</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
