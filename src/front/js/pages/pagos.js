import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import '../../styles/pedidos.css';

export const Pagos = () => {
    const navigate = useNavigate();



    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left  ml-5 arrow-icon"></i></div>
            <div className="pagos container text-start pb-5 w-75" style={{ overflow: "hidden" }}>
                <div>
                    <h1 className="mispedidos text-light text-center pt-5 pb-3 mb-3">Métodos de Pago</h1>
                </div>
                <div className="row p-4">
                    <div className="col-md-12 text-light fs-4">
                        <div className="text-start">
                            <h3 className="metodos mb-5"><strong>Métodos de Pago Aceptados</strong></h3>
                            <h4 className="metodos mb-5">En nuestra tienda online, ofrecemos opciones de pago seguras y convenientes para ti. Aceptamos los siguientes métodos de pago:</h4>

                            <ul>
                                <li>Tarjetas de crédito y débito: Visa, MasterCard, American Express, y otras tarjetas principales.</li>
                                <li>Stripe: Procesamos tus pagos de forma segura utilizando Stripe, uno de los proveedores de pago más confiables del mundo. Puedes pagar de manera rápida y segura con tu tarjeta o cuenta bancaria.</li>
                                <li>Otros métodos de pago: Dependiendo de tu ubicación, podríamos ofrecer métodos adicionales como transferencias bancarias directas o pagos en efectivo en puntos de venta locales.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3">Seguridad en los pagos</h4>
                            <h4>Tu seguridad es nuestra prioridad. Todos los pagos son procesados a través de sistemas encriptados y cumplen con los más altos estándares de seguridad en línea.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};