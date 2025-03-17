import React, { useState, useEffect } from "react";
import "../../styles/favoritos.css";
import { useNavigate, Link } from "react-router-dom";

export const Favoritos = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [favoritos, setFavoritos] = useState([]);
    const [videoActivo, setVideoActivo] = useState(null);

    const getFavoritos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setFavoritos(data);
    };

    const deleteFavorito = async (id_album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos/${id_album}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            getFavoritos();
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
        getFavoritos();
    }, [token, navigate]);

    // Acorta el largo de los títulos
    const shortTitle = (title, maxWords) => {
        const words = title.split(" ");
        return words.length <= maxWords ? title : words.slice(0, maxWords).join(" ") + "...";
    };

    return (
        <div className="cont-favs container text-center mt-5 pb-5 w-auto" style={{ overflow: "hidden" }}>
            <div className="titulo-favs">
                <h1 className="nombre-favs text-center pt-5 pb-3">Mis Favoritos</h1>
            </div>
            <div className="cont-favs-card row">
                {favoritos.map((item) => {
                    const album = item.album;
                    return (
                        <div className="carta-favs" key={album.id}>
                            <div className="img-favs-cont">
                                <img className="img-favs" src={album.cover_image} alt={album.title} />
                            </div>
                            <div className="cuerpo-favs">
                                <div className="detalles-favs">
                                    <p>Título: {shortTitle(album.title, 3)}</p>
                                    <p>País: {album.country}</p>
                                    <p>Año: {album.year}</p>
                                </div>
                            </div>
                            <div className="cont-favs-btn">
                                <div
                                    className="youtube-favs d-flex justify-content-center align-items-center text-decoration-none"
                                    onClick={() => setVideoActivo(album.id)}
                                >
                                    <i className="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                                </div>
                                {videoActivo === album.id && (
                                    <div className="modal-overlay-favs" onClick={() => setVideoActivo(null)}>
                                        <div className="modal-content-favs" onClick={(e) => e.stopPropagation()}>
                                            <iframe
                                                width="670"
                                                height="380"
                                                src="https://www.youtube.com/embed/TEgDaFw_pEQ?autoplay=1"
                                                title="YouTube video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                                <div className="fav-favs" onClick={() => deleteFavorito(album.id)}>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <Link to={`/infoAlbum/${album.id}`} style={{ textDecoration: 'none' }} >
                                    <div className="compra-favs">
                                        <i className="fa-solid fa-circle-info"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
