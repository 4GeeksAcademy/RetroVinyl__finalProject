import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../../styles/despliegue_albums.css'


export const DespliegueAlbums = () => {
    const { decada, genero } = useParams();
    const [albums, setAlbums] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [videoActivo, setVideoActivo] = useState(null);

    const getFavoritos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        const data = await response.json();
        setFavoritos(data);
    };
    useEffect(() => {
        const getAlbums = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}api/albums/${decada}/${genero}`);
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.id - b.id); // compara los id de los albumes y los devuelve ordenado de menor a mayor 
            setAlbums(sortedData);
        };
        getAlbums();
        if (token) { getFavoritos(); }
    }, [token, navigate]);

    // Añadir un favorito
    const postFavorito = async (album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id_album: album.id, id_usuario: token }),
        });
        if (response.ok) {
            getFavoritos()
        }
    };
    // Eliminar un favorito
    const deleteFavorito = async (id_album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos/${id_album}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            getFavoritos()
        }
    };
    //Comprueba en el useState si el album existe en favoritos
    const isFavorito = (id) => {
        return favoritos.some((fav) => fav.id_album === id);
    };

    // Maneja el clic en el botón favorito (Si el album no existe, lo añade. Si existe, lo borra)
    const handleFavoritoClick = (album) => {
        if (isFavorito(album.id)) {
            deleteFavorito(album.id);
        } else {
            postFavorito(album);
        }
    };
    // Acorta el largo de los títulos
    const shortTitle = (title, maxWords) => {
        const words = title.split(" "); // Divide el título en un array de palabras

        if (words.length <= maxWords) return title; // Si tiene pocas palabras, se devuelve igual
        return words.slice(0, maxWords).join(" ") + "..."; // Toma solo las primeras palabras y agrega "..." 
    };

    return (
        <div className="cont-gen container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left arrow-icon"></i>
            </div>
            <div className="titulo-gen">
                <h1 className="nombre-genero text-center my-2">
                    <span>{decada}</span>'S <span className="text-light">{genero.toUpperCase()}</span>
                </h1>
            </div>
            <div className="cont-gen-card row lh-1">
                {albums.map((album) => (

                    <div className="carta-gen" key={album.id}>
                        <div className="img-gen-cont">
                            <img className="img-gen" src={album.cover_image} alt={album.title} />
                        </div>
                        <div className="cuerpo-gen">
                            <div className="detalles-gen mt-3 lh-1">
                                <p><strong>Título:</strong> {shortTitle(album.title, 5)}</p>
                                <p><strong>País:</strong> {album.country}</p>
                                <p><strong>Año:</strong> {album.year}</p>
                            </div>
                        </div>
                        <div className="cont-gen-btn">
                            <div
                                className="youtube-gen d-flex justify-content-center align-items-center text-decoration-none"
                                onClick={() => setVideoActivo(album.id)}
                            >
                                <i className="fa-brands fa-youtube"></i>
                            </div>
                            {videoActivo === album.id && (
                                <div className="modal-overlay-gen" onClick={() => setVideoActivo(null)}>
                                    <div className="modal-content-gen" onClick={(e) => e.stopPropagation()}>
                                        <iframe
                                            width="670"
                                            height="380"
                                            src={`https://www.youtube.com/embed/${album.youtube}`}
                                            title="YouTube video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                            <div className="fav-gen"  onClick={(e) =>{ 
                                if (token){handleFavoritoClick(album) // si existe el token llama a la funcion añadir favs

                                }else{
                                    alert("Debes iniciar sesión")}// si no existe token manda un alert
                                }} >
                                    {
                                isFavorito(album.id)
                                    ?
                                    <i className="fa-solid fa-star"></i> //si el album ya está en favs, rellenala
                                    :
                                    <i className="fa-regular fa-star"></i> // si no esta en favs dejala vacia
                            } 
                            </div>
                            <Link
                                to={token ? `/infoAlbum/${album.id}` : "#"} //si hay token redirige a infoalbum
                                style={{ textDecoration: 'none' }}
                                onClick={(e) => {
                                    if (!token) { // si no existe token detiene la navegación y muestra el alert
                                        e.preventDefault(); 
                                        alert("Debes inciar sesión");
                                    }
                                }} >
                                <div className="compra-gen">
                                    <i className="fa-solid fa-circle-info"></i>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
