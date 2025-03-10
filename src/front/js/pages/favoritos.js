import React, { useState, useEffect } from "react";
import "../../styles/favoritos.css";

export const Favoritos = () => {

    const [favoritos, setFavoritos] = useState([]);
    console.log(favoritos);
    const getFavoritos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/favoritos`);
        const data = await response.json();
        setFavoritos(data);
        console.log(data);

    };
    useEffect(() => {
        getFavoritos()
    }, []);

    return (
        <div className="card-cont-fav">
            {favoritos.map((item) => {
                const album = item.album; // Extraer el álbum del objeto
                return (
                    <div className="carta-favs" key={album.id}>
                        <div className="img-favs-cont">
                            <img className="img-favs" src={album.cover_image} alt={album.title} />
                        </div>
                        <div className="cuerpo-favs">
                            <p>Título: {album.title}</p>
                            <p>Artista: {album.have}</p>
                            <p>Año: {album.year}</p>
                            <button type="button" className="genero-favs btn btn-danger">{album.genre}</button>
                        </div>
                        <div className="botones-cont1">
                            <div className="botones-cont2">
                                <button className="fav-favs">
                                    <i className="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                                </button>
                            </div>
                            <div className="botones-cont3">
                                <button className="compra-favs">
                                    <i className="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}