import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/generos.css";
import { useParams } from "react-router-dom";

export const DespliegueAlbums = () => {
    return (
        <div className="cont-gen container">
            <div className="titulo-gen">
                <h1 className="text-center my-2"><span className="text-danger">R</span>OCK</h1>
            </div>
            <div className="cont-gen-card row">
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
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
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
                <div className="carta-gen">
                    <div className="img-gen-cont">
                        <img className="img-gen" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" />

                    </div>
                    <div className="cuerpo-gen">
                        <div className="detalles-gen">
                            <p>Título: Origins</p>
                            <p>Artista: Imagine Dragons </p>
                            <p>Año: 2018 </p>
                        </div>
                    </div>
                    <div className="cont-gen-btn">
                        <button className="youtube-gen">
                            <i class="fa-brands fa-youtube" style={{ color: '#f20d0d' }}></i>
                        </button>
                        <button className="fav-gen">
                            <i class="fa-solid fa-star" style={{ color: '#daab03' }}></i>
                        </button>
                        <button className="compra-gen">
                            <i class="fa-solid fa-cart-shopping" style={{ color: '#248cdb' }}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


