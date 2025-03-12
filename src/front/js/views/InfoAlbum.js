import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/InfoAlbum.css';
import { useParams } from "react-router-dom";

export const InfoAlbum = () => {
    const { store, actions } = useContext(Context)

    const [cantidad, setCantidad] = useState(1)
    const [precio, setPrecio] = useState(20)
    const precioTotal = precio * cantidad;

    const restar = ((num) => {
        if (num > 1) {
            return num - 1
        }
        else {
            return 1
        }
    })

    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    const { albumid } = useParams();
    const [albums, setAlbums] = useState([])

    const token = localStorage.getItem("token");

    useEffect(() => { // DONDE LLAMO A LA RUTA DEL BACK QUE TRAE LA INFORMACION??????
        console.log("estoy cargando los albumes");

        const getAlbums = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}api/infoAlbums/${albumid}`)
            const data = await response.json()
            setAlbums(data)
            console.log(response);
            
        }
        getAlbums()
        getComments()
    }, [albumid, token])

    const getComments = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/comentariosAlbum/${albumid}`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(data);
            const data = await response.json();
            setCommentList(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const postComentario = async (newComment) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/comentariosAlbum`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify({ comentario: newComment, album_id: albumid, user_id: 2}), //cambiar id usuario por le token
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data fetched successfully:", data);
            getComments()
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    };

    return (
        <div className="container">
            <div className="row p-4 justify-content-center">

                <div className="card-info card col-md-5">
                    <img src={albums.cover_image} className="img-card card-img-top" alt="..." />
                    <div className="card-body ml-3">
                        <h5 className="card-title mt-3">Titulo: {albums.title}</h5>
                        <p className="card-text mt-3">Pais: {albums.country} </p>
                        <p className="card-text">Año: {albums.year}</p>
                        <p className="card-text">Género: <strong>{albums.genre}</strong> </p>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <p className="card-text mt-3"><strong>Cantidad:</strong></p>
                            <div class="d-sm-flex">
                                <button class="btn btn-outline-danger ms-1" type="button" onClick={() => setCantidad(restar(cantidad))}>-</button>
                                <p className="card-text mt-3 ps-3 pe-3"><strong>{cantidad}</strong></p>
                                <button class="btn btn-outline-danger ms-1" type="button" onClick={() => setCantidad(cantidad + 1)}>+</button>
                            </div>
                        </div>
                        <br></br>
                        <p className="card-text"><strong>TOTAL :</strong>{precioTotal}<strong>€</strong></p>

                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Comprar
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-black">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-danger">Confirmar compra</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card-coment text-light text-center ms-3 col-md-6">
                    <div className="p-3">
                        <h3 className="sentimientosRetro" >"Sentimientos Retr<span className="text-danger">o</span>Vinyl"</h3>
                        <h4> Lo Que Dicen los Fans</h4>
                    </div>
                    <div className="list-comments">

                        <div className="list-group">
                            {commentList.map((comment, index) => (
                               
                                <li key={index} className="list-group-item m-1 d-flex justify-content-between">
                                    <div>{comment.texto}</div>
                                    <a href="#!"><i className="btn-close" onClick={() => setCommentList(commentList.filter((t, currentindex) => index !== currentindex))}></i></a>
                                </li>

                            ))}
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Deja tu comentario"
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment} />
                        <button className="btn btn-danger" type="button" onClick={() => { postComentario(newComment); setNewComment(""); }}>Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
//onClick={() => { setCommentList(() => [...commentList, newComment]); setNewComment(''); }}