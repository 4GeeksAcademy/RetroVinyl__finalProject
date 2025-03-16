import React, { useState, useEffect } from "react";
import "../../styles/favoritos.css";
import { useNavigate, Link } from "react-router-dom";

export const Favoritos = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [favoritos, setFavoritos] = useState([]);
    console.log(favoritos);
    const getFavoritos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        setFavoritos(data);
        console.log(data);
    };
    const deleteFavorito = async (id_album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos/${id_album}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log("Álbum borrado");
            getFavoritos()
        }
    };
    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
        getFavoritos()
    }, [token, navigate]);

    // Acorta el largo de los títulos
    const shortTitle = (title, maxWords) => {
        const words = title.split(" "); // Divide el título en un array de palabras

        if (words.length <= maxWords) return title; // Si tiene pocas palabras, se devuelve igual
        return words.slice(0, maxWords).join(" ") + "..."; // Toma solo las primeras palabras y agrega "..." 
    };

    return (
        <div className="cont-gen container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-arrow-left  arrow-icon"></i>
                </div>
            <div className="titulo-favs">
                <h1 className="nombre-genero text-center my-2">
                    <span>M</span><span className="text-light">is Favoritos</span>
                </h1>
            </div>
            <div className="cont-favs-card row">
                {favoritos.map((item) => {
                    const album = item.album; // Extraer el álbum del objeto
                    return (
                        <div className="carta-favs" key={album.id}>
                            <div className="img-favs-cont">
                                <img className="img-favs" src={album.cover_image} alt={album.title} />
                            </div>
                            <div className="cuerpo-favs">
                                <div className="detalles-favs">
                                    <p>Título: {shortTitle(album.title, 10)}</p>
                                    <p>País: {album.country}</p>
                                    <p>Año: {album.year}</p>
                                </div>
                            </div>
                            <div className="cont-favs-btn">
                                <a
                                    className="youtube-favs d-flex justify-content-center align-items-center text-decoration-none"
                                    href="https://www.youtube.com/watch?v=pXu6JC6-d_o&list=PL7tBPYQzCjeLGK4hm4eZnf1gQRPQZYg8Y"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                                </a>
                                <button className="fav-favs" onClick={() => deleteFavorito(album.id)}>
                                    <i className="fa-solid fa-star"></i>
                                </button>
                                <Link to={`/infoAlbum/${album.id}`} style={{ textDecoration: 'none' }} >
                                    <button className="compra-favs">
                                        <i className="fa-solid fa-plus" ></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        /* {favoritos.map((item) => {
const album = item.album; // Extraer el álbum del objeto
return (
<div className="carta-favs" key={album.id}>
    <div className="img-favs-cont">
        <img className="img-favs" src={album.cover_image} alt={album.title} />
    </div>
    <div className="cuerpo-favs">
        <p>Título: {shortTitle(album.title, 10) }</p>
        <p>Artista: {album.have}</p>
        <p>Año: {album.year}</p>
        <button type="button" className="genero-favs btn btn-danger">{album.genre}</button>
    </div>
    <div className="botones-cont1">
        <div className="botones-cont2">
            <button className="fav-favs" onClick={() => deleteFavorito(album.id)}>
                <i className="fa-solid fa-star"></i>
            </button>
        </div>
        <div className="botones-cont3">
            <Link to={`/infoAlbum/${album.id}`} style={{ textDecoration: 'none' }} >
                <button className="compra-favs">
                    <i className="fa-solid fa-plus" ></i>
                </button>
            </Link>
        </div>
    </div>
</div>
);
})}*/
    )
}
