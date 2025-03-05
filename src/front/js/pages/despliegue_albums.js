import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/despliegue_albums.css";
import { useParams } from "react-router-dom";

export const DespliegueAlbums = () => {
    const {decada, genero} = useParams()

    const [albums, setAlbums] = useState([])

    useEffect(()=>{ // DONDE LLAMO A LA RUTA DEL BACK QUE TRAE LA INFORMACION??????
        const getAlbums = async () =>{
            const response = await fetch(`${process.env.BACKEND_URL}/api/albums/${decada}/${genero}`)
            const data = await response.json()
            setAlbums(data)

        }
        getAlbums()
    },[decada, genero])
    return (
        <div className="cont-gen container">
            <div className="titulo-gen">
                <h1 className="nombre-genero text-center my-2"><span>{decada}</span>'S <span className="text-light">{genero.toUpperCase()}</span></h1>
            </div>
            <div className="cont-gen-card row">
                {
                    albums.map((album)=>{
                        return (
                            <div className="carta-gen">
                            <div className="img-gen-cont">
                                <img className="img-gen" src={album.cover_image} />
        
                            </div>
                            <div className="cuerpo-gen">
                                <div className="detalles-gen">
                                    <p>Título: {album.title}</p>
                                    <p>País: {album.country} </p>
                                    <p>Año: {album.year} </p>
                                </div>
                            </div>
                            <div className="cont-gen-btn">
                                <a className="youtube-gen d-flex justify-content-center align-items-center text-decoration-none"
                                    href="https://www.youtube.com/watch?v=pXu6JC6-d_o&list=PL7tBPYQzCjeLGK4hm4eZnf1gQRPQZYg8Y"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                                </a>
                                <button className="fav-gen">
                                    <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                                </button>
                                <button className="compra-gen">
                                    <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                                </button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


