import React from "react";
import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import '../../styles/Sixty.css'

export const Decada = () => {
    const { store, actions } = useContext(Context)
    const [border, setBorder] = useState("")
    const { decada } = useParams()

    const texto = {
        '60': 'La música de los años 60 fue una revolución cultural. El rock de The Beatles y The Rolling Stones, el folk de Bob Dylan y el soul de Motown marcaron la década. Festivales como Woodstock simbolizaron libertad y cambio, dejando un legado eterno. Una década que transformó la música para siempre.',
        '70': 'Sumérgete en los vibrantes sonidos de los años 70: rock, pop y más. Disfruta de una selección única de éxitos que siguen marcando generaciones. Descubre listas de reproducción, curiosidades y biografías de los artistas que definieron la época. ¡Deja que la nostalgia te envuelva!',
        '80': '¡Revive la magia de los 80! Una década llena de energía, sintetizadores y grandes himnos del pop, rock y más. Descubre las historias de los artistas que marcaron una era. ¡Déjate llevar por el ritmo de los 80!',
        '90': '¡Vuelve a los 90 y revive el sonido que definió una generación! Los 90 fueron una década llena de hits inolvidables. Descubre las canciones, artistas y momentos que dejaron huella.¡Haz que el ritmo de los 90 te acompañe de nuevo!'
    };
    const textoFinal = texto[decada]

    return (
        <div className="container py-3">
            <div className="row box">
                <div className="pb-3 col-12 text-center text-light">
                    <h1 className="text-danger" style={{ fontSize: '80px' }}>{decada}'s</h1>
                </div>
                <div className="row">
                    <div className="Introcard d-flex align-items-center justify-content-center col-6 col-md-6 col-sm-12 card-body bg-transparent p-4 border-0 text-center" style={{ height: "29rem" }}>
                        <p className="introWeb pt-2">{textoFinal}</p>
                    </div>
                    <div className="col-12 col-md-6"> {/* Introcard: ocupa 6 columnas a la derecha */}
                        <div className="row">
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/rock`} style={{ textDecoration: 'none' }}>
                                    <div className="sesenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
                                        <p>ROCK</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/pop`} style={{ textDecoration: 'none' }}>
                                    <div className="setenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
                                        <p>POP</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/jazz`} style={{ textDecoration: 'none' }}>
                                    <div className="ochenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
                                        <p>JAZZ</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-6 col-md-6 col-sm-12">
                                <Link to={`/albums/${decada}/funk`} style={{ textDecoration: 'none' }}>
                                    <div className="noventa card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
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