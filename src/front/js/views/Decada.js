import React from "react";
import { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import '../../styles/Sixty.css'

export const Decada = () => {
    const { store, actions } = useContext(Context)
    const [border, setBorder] = useState("")
    const { decada } = useParams()
    const navigate = useNavigate();

    const texto = {
        '60': 'La música de los años 60 fue una revolución cultural, con géneros como el rock, pop, jazz y funk ganando protagonismo. Una década que transformó la música para siempre.',
        '70': 'La música de los años 70 se caracterizó por la diversidad de géneros. Fue una época de innovación y expresión de rebeldía a las normas establecidas.',
        '80': 'La música de los años 80 estuvo definida por producciones innovadoras y videoclips icónicos. Fue una década de experimentación sonora y el inicio de la música como un fenómeno visual global.',
        '90': 'La música de los años 90 estuvo marcada por sonidos frescos y letras de protesta o desahogo. El auge de la tecnología ayudo a la globalización de los géneros y artistas, transformándola en masiva y de gran disfrute.'
    };
    const textoFinal = texto[decada]

    return (
        <div className="container decada py-3">
            <div className="row box">
                <div className="arrows col-6" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left  arrow-icon"></i>
                </div>
                <div className="pb-3 col-12 text-center text-light">
                    <h1 className="text-danger" style={{fontSize: '80px' }}><span className="text-light">Años </span><strong>{decada}</strong></h1>
                </div>
                <div className="row infoclass">
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