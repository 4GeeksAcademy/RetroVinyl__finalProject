import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pedidos.css';

export const FAQ = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left ml-5 arrow-icon"></i>
            </div>
            <div className="faq container text-start pb-5 w-75" style={{ overflow: "hidden" }}>
                <div>
                    <h1 className="mispedidos text-light text-center pt-5 pb-3 mb-3">Preguntas Frecuentes</h1>
                </div>
                <div className="row p-4">
                    <div className="col-md-12 text-light fs-4">
                        <div className="text-start">
                            <h3 className="metodos mb-5"><strong>Resuelve tus dudas aquí</strong></h3>
                            <h4 className="metodos mb-5">Aquí te dejamos algunas de las preguntas más frecuentes de nuestros clientes. Si no encuentras la respuesta a tu duda, no dudes en contactarnos.</h4>

                            <h4 className="metodos mt-5 mb-3"><strong>1. ¿Cómo puedo hacer un pedido?</strong></h4>
                            <ul>
                                <li>Para hacer un pedido, simplemente navega por nuestro catálogo, selecciona el producto que deseas y añádelo al carrito. Luego, dirígete al carrito para proceder con el pago y la finalización de la compra.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>2. ¿Cuáles son los métodos de pago disponibles?</strong></h4>
                            <ul>
                                <li>Aceptamos pagos mediante tarjetas de crédito y débito, Stripe, y PayPal. Puedes elegir el método de pago que prefieras al realizar el pago en el proceso de compra.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>3. ¿Cómo se calculan los costos de envío?</strong></h4>
                            <ul>
                                <li>Los costos de envío se calculan durante el proceso de compra, dependiendo de tu ubicación y del método de envío seleccionado.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>4. ¿Puedo devolver un vinilo si no me gusta?</strong></h4>
                            <ul>
                                <li>Sí, aceptamos devoluciones dentro de 3 días a partir de la recepción del producto. Para que la devolución sea válida, el vinilo debe estar en su estado original, sin abrir ni manipular. Escribenos y te contactaremos para ayudarte con el proceso.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>5. ¿Cuánto tiempo tardará mi pedido en llegar?</strong></h4>
                            <ul>
                                <li>El tiempo de entrega depende de tu ubicación y del método de envío elegido. Generalmente, los envíos nacionales tardan entre 7 y 10 días hábiles, mientras que los envíos internacionales pueden tardar un poco más.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>6. ¿Venden vinilos nuevos o de segunda mano?</strong></h4>
                            <ul>
                                <li>Ofrecemos una amplia variedad de vinilos, tanto nuevos como de segunda mano. Todos nuestros vinilos son cuidadosamente seleccionados para garantizar la mejor calidad de sonido posible.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>8. ¿Cómo contacto con atención al cliente?</strong></h4>
                            <ul>
                                <li>Si tienes alguna pregunta o problema, puedes contactarnos a través de retrovinyl@gmail.com o llamarnos a +549666523. Estaremos encantados de ayudarte.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
