import React from "react";
import Slider from "react-slick"; // Asegúrate de tener instalada la librería react-slick
import "../../styles/carousel.css";


export const Carousel = ({ speed = 3000 }) => {
  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: speed, // Usar el valor de speed pasado como prop
    autoplaySpeed: 1000,
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // SOLO 1 slide en móviles
          slidesToScroll: 1,
          vertical: false, // Horizontal en móviles
          verticalSwiping: false,
          centerMode: false
        }
      }
    ]
  };

  return (
    <div className="row slider-container mt-1" style={{ overflow: "hidden" }}>
      <Slider {...settings}> {/* Aquí pasamos la configuración al componente Slider */}
        <div className="">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/the-dark-side-of-the-moon.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://www.efeeme.com/wp-content/uploads/2016/08/velvet-underground-03-08-16-k.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/animals-pink-floyd.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/led-zeppelin-led-zeppelin.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/abbey-road-the-beatles.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/aladin-sane-david-bowie.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/atom-heart-mother-pink-floyd.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/nevermind-nirvana.jpg"
            alt="image"
            className="slider-image"
          />
        </div>
        <div className="carousel-login">
          <img
            src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/ziggy-stardust-david-bowie.jpg"
            alt="image"
            className="slider-image "
          />
        </div>
      </Slider>
    </div>
  );
};
