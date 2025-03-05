import React from "react";
import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Carousel } from "../component/carousel.js";
import '../../styles/Sixty.css'
import '../../styles/carousel.css'

export const Decada = () => {
    const { store, actions } = useContext(Context)
    const [border, setBorder] = useState("")
    const { decada } = useParams()

    const texto = {
        '60': 'La música de los años 60 fue una revolución cultural. El rock de The Beatles y The Rolling Stones, el folk de Bob Dylan y el soul de Motown marcaron la década. Festivales como Woodstock simbolizaron libertad y cambio, dejando un legado eterno. Fue una década que transformó la música para siempre.',
        '70': 'HOLA TEXTO 70',
        '80': 'HOLA TEXTO 80',
        '90': 'HOLA TEXTO 90'
    };
    const textoFinal = texto[decada]
    
    return (
        <div className="container py-3">
            <div className="row box">
                <div className="p-3 col-12 text-center text-light">
                    <h1 className="text-danger" style={{ fontSize: '80px' }}>{decada}'s</h1>
                </div>
                <div className="grid-container">
                    <div className="Introcard d-flex align-items-center justify-content-center col-6 col-md-6 col-sm-12 card-body bg-transparent p-4 border-0 text-center" style={{ height: "29rem" }}>
                        <p className="introWeb pt-2">{textoFinal}</p>
                    </div>
                    <div className="col-12 col-md-6"> {/* Introcard: ocupa 6 columnas a la derecha */}
                        <div className="row">
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/rock`} style={{ textDecoration: 'none' }}>
                                    <div className="sesenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "17rem" }}>
                                        <p>ROCK</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/pop`} style={{ textDecoration: 'none' }}>
                                    <div className="setenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "17rem" }}>
                                        <p>POP</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/jazz`} style={{ textDecoration: 'none' }}>
                                    <div className="ochenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "17rem" }}>
                                        <p>JAZZ</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/funk`} style={{ textDecoration: 'none' }}>
                                    <div className="noventa card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "17rem" }}>
                                        <p>FUNK</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};