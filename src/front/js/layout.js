import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Decada } from "./views/Decada";
import { InfoAlbum } from "./views/InfoAlbum";
import { Pedidos } from "./views/Pedidos";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Favoritos } from "./pages/favoritos";
import { DespliegueAlbums } from "./pages/despliegue_albums";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Home from "./pages/home";
import Register from "./pages/register";
import Perfil from "./pages/perfil";
import { Pagos } from "./pages/pagos";
import { PoliticaPrivacidad } from "./pages/politica";
import { TerminosCondiciones } from "./pages/terminos";
import { FAQ } from "./pages/faq";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Decada />} path="/decada/:decada" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<InfoAlbum />} path="/infoAlbum/:albumid" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Favoritos />} path="/favoritos" />
                        <Route element={<Pedidos />} path="/pedidos" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<DespliegueAlbums />} path="/albums/:decada/:genero" />
                        <Route element={<Perfil />} path="/perfil" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<Pagos />} path="/pagos" />
                        <Route element={<PoliticaPrivacidad />} path="/politica" />
                        <Route element={<TerminosCondiciones />} path="/terminos" />
                        <Route element={<FAQ />} path="/faq" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
