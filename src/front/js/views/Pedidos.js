import React, { useEffect } from "react";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pedidos.css';

export const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        getPedidos()
    }, [token])

    const getPedidos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/pedidos`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setPedidos(data);
    };

    // Función para eliminar un pedido
    const borarPedido = async (pedido_id) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/pedidos/${pedido_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Actualiza la lista eliminando el pedido eliminado
                setPedidos(pedidos.filter(pedido => pedido.id !== pedido_id));
            } else {
                console.error("Error al eliminar el pedido");
            }
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
        }
    };

    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left  ml-5 arrow-icon"></i></div>
            <div className="pedidos container text-center  pb-5 w-auto" style={{ overflow: "hidden" }}>
                <div>
                    <h1 className="mispedidos pt-5 pb-3">Mis Pedidos</h1>
                </div>
                {pedidos.map((album) => (
                    <li key={album.id}>
                        <div className="row p-4">
                            <div className="col-md-6">
                                <img className="img-container img-fluid object-cover" src={album.album_cover_image} style={{ height: '370px', width: '370px', overflow: 'hidden' }} />
                            </div>
                            <div className="col-md-6 text-light text-start fs-6">
                                <div className="d-flex justify-content-between mt-3">
                                    <h3>{album.album_title}</h3>
                                    <a data-bs-theme="dark" href="#!"><i className="fa-solid fa-trash fs-4 mt-1" style={{ cursor: "pointer", color : "red"}} onClick={() => { borarPedido(album.id) }}></i></a>
                                </div>
                                <p className="mt-4"><strong>País:</strong> {album.album_country}</p>
                                <p><strong>Año:</strong> {album.album_year} </p>
                                <p><strong>Cantidad:</strong> {album.cantidad} </p>
                                <p><strong>Fecha de compra:</strong> {album.fecha}</p>
                                <p><strong>Numero de ID de compra:</strong> {album.id}</p>
                                <p><strong>Dirección de envío:</strong> {album.shipping_address}</p>
                                <p><strong>Teléfono de contacto:</strong> {album.shipping_contactNumber}</p>
                                <button type="button" className="btn btn-outline-danger mt-3" disabled><strong>{album.album_genre}</strong></button>
                            </div>
                        </div>
                        <br className="espaciado"></br>
                    </li>
                ))}
            </div>
        </div>
    );
};