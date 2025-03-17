import React from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "../../styles/home.css";

export const Home = () => {
  const SimpleSlider_settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 180,
    autoplay: true,
    speed: 15000,
    autoplaySpeed: null, //incia el carousel automaticamente
    cssEase: "linear",
    arrows: false,
    pauseOnhover: false, //evita que se detenga al pasar el mouse
  };
  const Carousel2 = () => (
    <div className="row slider-container2 pt-3" style={{ overflow: "hidden" }}>
      <Slider className="sliderHome" {...SimpleSlider_settings}>
        <div>
          <img src="https://us.123rf.com/450wm/oneinchpunch/oneinchpunch2108/oneinchpunch210801177/173835077-hermosa-mujer-afroamericana-con-peinado-de-coletas-afro-y-ropa-elegante-retrato-de-una-joven-negra.jpg?ver=6" />
        </div>
        <div>
          <img src="https://us.123rf.com/450wm/erstudiostok/erstudiostok2212/erstudiostok221200534/195969314-joven-escuchando-m%C3%BAsica-con-auriculares.jpg" />
        </div>
        <div>
          <img src="https://us.123rf.com/450wm/melnyk58/melnyk582101/melnyk58210100984/162500029-baile-retrato-de-mujer-cauc%C3%A1sica-aislado-sobre-fondo-de-estudio-rosa-en-luz-de-ne%C3%B3n-mixta.jpg?ver=6" />
        </div>
        <div>
          <img src="https://us.123rf.com/450wm/melnyk58/melnyk582303/melnyk58230301626/200642710-retrato-de-un-joven-con-camisa-blanca-escuchando-m%C3%BAsica-con-auriculares-y-tocando-la-guitarra.jpg?ver=6" />
        </div>
        <div>
          <img src="https://us.123rf.com/450wm/melnyk58/melnyk581902/melnyk58190202563/117525980-mujer-bonita-feliz-con-auriculares-escuchando-m%C3%BAsica-sobre-fondo-de-ne%C3%B3n-rojo-en-el-estudio.jpg?ver=6" />
        </div>
        <div>
          <img src="https://us.123rf.com/450wm/melnyk58/melnyk582106/melnyk58210602010/170983229-retrato-de-un-joven-cauc%C3%A1sico-con-auriculares-aislados-en-un-estudio-rojo-oscuro-con-luz-rosa-ne%C3%B3n.jpg?ver=6" />
        </div>
      </Slider>
    </div>
  );
  return (
    <div className="container py-3">
      <div className="row box">
        <div className="col-12 pb-3">
          <Carousel2 />
        </div>
        <div className="row infoclass">
          {/* Introcard: ocupa 6 columnas a la izquierda */}
          <div className="Introcard d-flex flex-column align-items-center justify-content-center col-6 col-md-6 col-sm-12 card-body bg-transparent p-4 border-0 text-center" style={{ height: "29rem" }}>
            <p className="introWeb pt-2 mb-3">¡Revive la magia del pasado con nuestros vinilos nostálgicos!</p>
            <p className="introWeb">Música que trasciende el tiempo y nunca pierde su encanto. ¡Haz que tu colección cobre vida con estos tesoros sonoros!</p>
          </div>
          <div className="col-12 col-md-6"> {/* Introcard: ocupa 6 columnas a la derecha */}
            <div className="row ">
              <div className="col-6 col-md-6 col-sm-12">
                <Link to="/decada/60" style={{ textDecoration: 'none' }}>
                  <div className="sesenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
                    <p>60's</p>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-md-6 col-sm-12">
                <Link to="/decada/70" style={{ textDecoration: 'none' }}>
                  <div className="setenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem", width: "auto" }}>
                    <p>70's</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-md-6 col-sm-12">
                <Link to="/decada/80" style={{ textDecoration: 'none' }}>
                  <div className="ochenta card-body d-flex align-items-center justify-content-center" style={{ height: "14rem" }}>
                    <p>80's</p>
                  </div>
                </Link>
              </div>
              <div className="col-6 col-md-6 col-sm-12">
                <Link to="/decada/90" style={{ textDecoration: 'none' }}>
                  <div className="noventa card-body d-flex align-items-center justify-content-center" style={{ height: "14rem" }}>
                    <p>90's</p>
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
export default Home;