import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pedidos.css';

export const TerminosCondiciones = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left ml-5 arrow-icon"></i>
            </div>
            <div className="terminos-condiciones container text-start pb-5 w-75" style={{ overflow: "hidden" }}>
                <div>
                    <h1 className="mispedidos text-light text-center pt-5 pb-3 mb-3">Términos y Condiciones</h1>
                </div>
                <div className="row p-4">
                    <div className="col-md-12 text-light fs-4">
                        <div className="text-start">
                            <h3 className="metodos mb-5"><strong>Bienvenido a RetroVinyl<i className="circle fa-solid fa-record-vinyl"></i></strong></h3>
                            <h4 className="metodos mb-5">Al acceder o utilizar nuestro sitio web y realizar una compra, aceptas los siguientes términos y condiciones. Te recomendamos leerlos cuidadosamente antes de continuar.</h4>

                            <h4 className="metodos mt-5 mb-3"><strong>1. Uso del sitio web</strong></h4>
                            <ul>
                                <li>Al acceder o utilizar nuestra tienda online, aceptas cumplir con estos términos y todas las leyes aplicables.</li>
                                <li>Nos reservamos el derecho de modificar estos términos en cualquier momento, por lo que te recomendamos revisarlos periódicamente.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>2. Productos y precios</strong></h4>
                            <ul>
                                <li>Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de retirar cualquier artículo de nuestro catálogo sin previo aviso.</li>
                                <li>Los precios están sujetos a cambios sin previo aviso. Nos esforzamos por ofrecerte precios actualizados y correctos, pero no podemos garantizar que los precios sean siempre exactos.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>3. Pagos y facturación</strong></h4>
                            <ul>
                                <li>Aceptamos los métodos de pago mencionados en la sección de Métodos de Pago.</li>
                                <li>Al realizar una compra, garantizas que la información que proporcionas es precisa y completa.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>4. Envíos y entregas</strong></h4>
                            <ul>
                                <li>Realizamos envíos a nivel nacional e internacional. Los plazos de entrega dependerán de tu ubicación y del método de envío seleccionado.</li>
                                <li>Los costos de envío y el tiempo estimado de entrega se calcularán durante el proceso de pago.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>5. Devoluciones y reembolsos</strong></h4>
                            <ul>
                                <li>Si no estás satisfecho con tu compra, puedes devolver los productos dentro de [X días] a partir de la fecha de recepción. Consulta nuestra Política de devoluciones para más detalles.</li>
                                <li>Los reembolsos se procesarán una vez que recibamos los productos devueltos en las condiciones originales.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>6. Propiedad intelectual</strong></h4>
                            <ul>
                                <li>Todos los contenidos de nuestro sitio web, incluidos textos, imágenes, logotipos y diseños, están protegidos por derechos de propiedad intelectual.</li>
                            </ul>

                            <h4 className="metodos mt-5 mb-3"><strong>7. Limitación de responsabilidad</strong></h4>
                            <ul>
                                <li>No somos responsables de daños indirectos, incidentales o consecuentes derivados de la compra de productos en nuestro sitio.</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
