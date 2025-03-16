import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/pedidos.css';
import { useNavigate } from "react-router-dom";

export const Pedidos = () => {
    const { store, actions } = useContext(Context)
    const [pedidos, setPedidos] = useState([]);
    console.log(pedidos);


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
        console.log(data);
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
        <div className="pedidos container text-center mt-5 pb-5 w-75" style={{ overflow: "hidden" }}>
            <div>
                <h1 className="mispedidos pt-5 pb-3"><span className="text-danger">M</span>is Pedidos</h1>
            </div>
            {pedidos.map((album) => (
                <li key={album.id}>
                    <div className="row p-4">
                        <div className="col-md-6">
                            <img className="img-container img-fluid object-cover" src={album.album_cover_image} style={{ height: '370px', width: '370px', overflow: 'hidden' }} />
                        </div>
                        <div className="col-md-6 text-light text-start fs-4">
                            <div className="d-flex justify-content-between">
                            <h3>{album.album_title}</h3>
                            <a data-bs-theme="dark" href="#!"><i className="fa-regular fa-xmark" style={{color: "#e32400", cursor: "pointer",}} onClick={() => { borarPedido(album.id) }}></i></a>
                            </div>
                            <h5 className="mt-4">País: {album.album_country}</h5>
                            <h5>Año: {album.album_year} </h5>
                            <h5>Cantidad: {album.cantidad} </h5>
                            <h5>Fecha de compra: {album.fecha}</h5>
                            <h5>Numero de ID de compra: {album.id}</h5>
                            <h5>Dirección de envío: {album.shipping_address}</h5>
                            <h5>Teléfono de contacto: {album.shipping_contactNumber}</h5>
                            <button type="button" className="btn btn-outline-danger mt-3" disabled><strong>{album.album_genre}</strong></button>
                        </div>
                    </div>
                    <br className="espaciado"></br>
                </li>
            ))}                
        </div>
    );
};