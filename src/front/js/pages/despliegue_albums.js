import React, { useEffect, useState} from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import "/workspaces/RetroVinyl__finalProject/src/front/styles/despliegue_albums.css"


export const DespliegueAlbums = () => {
    
    const { decada, genero } = useParams();
    const [albums, setAlbums] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getFavoritos = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`,
            {
                headers:{
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
            setAlbums(data);
        };
        if (!token) {
            navigate("/login", { replace: true });
          }
        getAlbums();
        getFavoritos();
    }, [token, navigate]);

    // Añadir un favorito
    const postFavorito = async (album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ id_album: album.id, id_usuario: token}),
        });
        if (response.ok) {
            console.log("Álbum añadido");
            getFavoritos()
        }
    };
    // Eliminar un favorito
    const deleteFavorito = async (id_album) => {
        const response = await fetch(`${process.env.BACKEND_URL}api/favoritos/${id_album}`, {
            method: 'DELETE',
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log("Álbum borrado");
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
            <div className="titulo-gen">
                <h1 className="nombre-genero text-center my-2">
                    <span>{decada}</span>'S <span className="text-light">{genero.toUpperCase()}</span>
                </h1>
            </div>
            <div className="cont-gen-card row">
                {albums.map((album) => (
                    
                    <div className="carta-gen" key={album.id}>
                        <div className="img-gen-cont">
                            <img className="img-gen" src={album.cover_image} alt={album.title} />
                        </div>
                        <div className="cuerpo-gen">
                            <div className="detalles-gen">
                                <p>Título: {shortTitle(album.title, 10)}</p>
                                <p>País: {album.country}</p>
                                <p>Año: {album.year}</p>
                            </div>
                        </div>
                        <div className="cont-gen-btn">
                            <a
                                className="youtube-gen d-flex justify-content-center align-items-center text-decoration-none"
                                href="https://www.youtube.com/watch?v=pXu6JC6-d_o&list=PL7tBPYQzCjeLGK4hm4eZnf1gQRPQZYg8Y"
                                target="_blank"
                                rel="noopener noreferrer">
                                <i className="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                            </a>
                            <button className="fav-gen" onClick={() => handleFavoritoClick(album)}>{
                                isFavorito(album.id)
                                    ?
                                    <i class="fa-solid fa-star"></i>
                                    :
                                    <i class="fa-regular fa-star"></i>
                            }
                            </button>
                            <Link to={`/infoAlbum/${album.id}`} style={{ textDecoration: 'none' }} >
                                <button className="compra-gen">
                                    <i className="fa-solid fa-plus" ></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
