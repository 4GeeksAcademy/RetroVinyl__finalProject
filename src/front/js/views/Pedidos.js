import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/pedidos.css';
import { Link } from "react-router-dom";

export const Pedidos = () => {
    const { store, actions } = useContext(Context)
    const [newOrder, setNewOrder] = useState("");
    const [orderList, setOrderList] = useState([]);

    return (
        <div className="pedidos container text-center mt-5 pb-5 w-75">
            <div className="">
                <h1 className="mispedidos pt-5 pb-3"><span className="text-danger">M</span>is Pedidos</h1>
            </div>
            <div className="row justify-content-center p-4 ">
                <div className="col-md-5">
                    <img className="" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" style={{ height: '300px', width: '300px' }} />
                </div>
                <div className="col-md-5 text-light text-start fs-4">
                    <h3>Imagine Dragons - Origins</h3>
                    <h5 className="mt-5">País: UK</h5>
                    <h5>Año: 2018 </h5>
                    <h5>Fecha de compra: 2-05-2018 </h5>
                    <h5>Numero de ID de compra: 2052018 </h5>
                    <button type="button" className="btn btn-outline-danger mt-5" disabled><strong>Pop-Rock</strong></button>
                </div>                
            </div>
            <br className="espaciado"></br>  
            <div className="row justify-content-center p-4 ">
                <div className="col-md-5">
                    <img className="" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" style={{ height: '300px', width: '300px' }} />
                </div>
                <div className="col-md-5 text-light text-start fs-4">
                    <h3>Imagine Dragons - Origins</h3>
                    <h5 className="mt-5">País: UK</h5>
                    <h5>Año: 2018 </h5>
                    <h5>Fecha de compra: 2-05-2018 </h5>
                    <h5>Numero de ID de compra: 2052018 </h5>
                    <button type="button" className="btn btn-outline-danger mt-5" disabled><strong>Pop-Rock</strong></button>
                </div>                
            </div>
            <br className="espaciado"></br>   
             </div>
    );
};