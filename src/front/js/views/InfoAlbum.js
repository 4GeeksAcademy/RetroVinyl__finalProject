import React from "react";
import { useState, useEffect, useRef } from "react";
import '../../styles/InfoAlbum.css';
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../component/PaymentForm.js";


// Carga la clave pública de Stripe (almacenada en una variable de entorno, por ejemplo, REACT_APP_STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const InfoAlbum = () => {

    const navigate = useNavigate();
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
    const textareaRef = useRef(null);

    const { albumid } = useParams();
    const [albums, setAlbums] = useState([]);
    const [favoritos, setFavoritos] = useState([]);


    // Estado para los datos de envío
    const [shipping, setShipping] = useState({
        name: "",
        address: "",
        city: "",
        cp: "",
        country: "",
        contactNumber: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => { // DONDE LLAMO A LA RUTA DEL BACK QUE TRAE LA INFORMACION??????

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Restablecer la altura
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajustar según contenido
        }
        //Hace que no puedas acceder a la vista actual si no estas registrado(token), te redirige al login
        if (!token) {
            navigate("/login", { replace: true });
        }

        const getAlbums = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}api/infoAlbums/${albumid}`)
            const data = await response.json()
            setAlbums(data)

        }
        getFavoritos()
        getAlbums()
        getComments()
    }, [albumid, token, newComment])

    const getComments = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/comentariosAlbum/${albumid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
                const data = await response.json();
                setCommentList(Array.isArray(data) ? data : []);
            
        } catch (error) {
            console.error("Error fetching comments:", error);
            return
        }
    };

    const postComentario = async (newComment) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/comentariosAlbum`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ comentario: newComment, album_id: albumid, user_id: token }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setNewComment(""); // Limpiar campo después de enviar
            getComments()
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    const deleteComment = async (comment_id) => {

        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/comentariosAlbum/${comment_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error deleting comment:", errorData);
                return;
            }
            // Actualiza el estado eliminando el comentario borrado
            setCommentList(commentList.filter(comment => comment.id !== comment_id));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
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
    const isFavorito = (id) => {
        return favoritos.some((fav) => fav.id_album === id);
    };
    const handleFavoritoClick = (album) => {
        if (isFavorito(album.id)) {
            deleteFavorito(album.id);
        } else {
            postFavorito(album);
        }
    };
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


    return (
        <div className="container">
            <div className="arrows col-6" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left arrow-icon"></i>
            </div>
            <div className="row p-4 justify-content-around">
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
                            <div className="d-flex">
                                <button className="btn btn-outline-danger ms-1" type="button" onClick={() => setCantidad(restar(cantidad))}>-</button>
                                <p className="card-text mt-3 ps-3 pe-3"><strong>{cantidad}</strong></p>
                                <button className="btn btn-outline-danger ms-1" type="button" onClick={() => setCantidad(cantidad + 1)}>+</button>
                            </div>
                        </div>
                        <br></br>
                        <p className="card-text"><strong>TOTAL : </strong>{precioTotal}<strong>€</strong></p>
                        <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#paymentModal">
                            Comprar
                        </button>
                        <div className="fav-gen"  onClick={() =>{ 
                                handleFavoritoClick(albums) 
                                }} >
                                    {
                                isFavorito(albums.id)
                                    ?
                                    <i className="fa-solid fa-star"></i> //si el album ya está en favs, rellenala
                                    :
                                    <i className="fa-regular fa-star"></i> // si no esta en favs dejala vacia
                            } 
                            </div>
                        </div>
                        <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-black" id="paymentModalLabel">Detalles del pago</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-black">
                                        <div className="p-2">
                                            <label className="p-2 col-4">Nombre del titular de la tarjeta:</label>
                                            <input className="col-8"
                                                type="text" value={shipping.name} placeholder="Nombre completo"
                                                onChange={(e) => setShipping({ ...shipping, name: e.target.value })} required
                                            />
                                        </div>
                                        <div className="p-2">
                                            <label className="p-2 col-4">Dirección de envío:</label>
                                            <input className="col-8"
                                                type="text" value={shipping.address} placeholder="Dirección"
                                                onChange={(e) => setShipping({ ...shipping, address: e.target.value })} required
                                            />
                                        </div>
                                        <div className="p-2">
                                            <label className="p-2 col-4">Teléfono de contacto:</label>
                                            <input className="col-8"
                                                type="text" value={shipping.contactNumber} placeholder="Número de teléfono"
                                                onChange={(e) => setShipping({ ...shipping, contactNumber: e.target.value })} required
                                            />
                                        </div>
                                        <div className="row p-2">
                                            <div className="col-4">
                                                <label className="p-2 col-4">CP:</label>
                                                <input className="col-8"
                                                    type="text" value={shipping.cp} placeholder="Codigo Postal"
                                                    onChange={(e) => setShipping({ ...shipping, cp: e.target.value })} required
                                                />
                                            </div>
                                            <div className="col-4">
                                                <label className="col-4">Ciudad:</label>
                                                <input className="col-8"
                                                    type="text" value={shipping.city} placeholder="Ciudad"
                                                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })} required
                                                />
                                            </div>
                                            <div className="col-4">
                                                <label className="col-4">País:</label>
                                                <input className="col-8"
                                                    type="text" value={shipping.country} placeholder="País"
                                                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })} required
                                                />
                                            </div>
                                        </div>
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm
                                                amount={precioTotal}
                                                album_id={albumid}
                                                cantidad={cantidad}
                                                shipping={shipping}
                                                onPaymentSuccess={() => alert("¡Pago exitoso!")}
                                            />
                                        </Elements>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card-coment text-light text-center  col-md-6">
                    <div className="p-3">
                        <h3 className="sentimientosRetro" >¡Escucha, revive y comparte!</h3>
                        <h4> Cuéntanos tu historia</h4>
                    </div>
                    <div className="list-comments">

                        <div className="list-group">
                            {commentList.map((comment, index) => (

                                <li key={index} className="list-group-item m-1 d-flex justify-content-between">

                                    <div className="text-start">
                                        <strong>{comment.username}</strong><br></br>{comment.texto}
                                    </div>
                                    {comment.user_id == localStorage.getItem("user_id") && (
                                        <a data-bs-theme="dark" href="#!"><i className="btn btn-close ms-4" onClick={() => { deleteComment(comment.id) }}></i></a>
                                    )}
                                </li>

                            ))}
                        </div>
                    </div>
                    <div className="input-group d-flex mb-3">
                        <textarea ref={textareaRef} type="text" className="form-control" placeholder="Deja tu comentario" rows={1} style={{ width: "auto", resize: "none", overflow: "hidden" }}
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment} />
                        <button className="btn btn-danger mt-1" type="button" style={{ flexShrink: 0, height: "38px", cursor: "pointer", }}
                            onClick={() => { postComentario(newComment); setNewComment(""); }}>Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
