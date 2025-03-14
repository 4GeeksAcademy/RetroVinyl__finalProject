import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import {Context} from "../store/appContext"

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const [searchTerm, setSearchTerm] = useState(""); //Almacena las consultas de busqueda
	const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
	const [isLogged, setIsLogged] = useState(!!store.token);
	const navigate = useNavigate(); // Para redirigir a otra página
	const [user, setUser] = useState({username: ""});

	 const get_profile = async () => {

		const token = localStorage.getItem("token");
		console.log(token);
	
		const myHeaders = {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${token}`,  
		};
	
		const requestOptions = {
		  method: "GET",
		  headers: myHeaders,
		  redirect: "follow"
		};
	
		try {
		  const response = await fetch(`${process.env.BACKEND_URL}api/perfil`, requestOptions);
	
		  if (!response.ok) {
			throw new Error('Error al obtener el perfil');
		  }
	
		  const result = await response.json();
		  console.log(result);
		  setUser({ ...user, ...result });
		} catch (error) {
		  console.error("Error:", error);
		}
	  };	


	const handleSearch = async () => {
		if (searchTerm.trim()) {

			try {
				// Usa BACKEND_URL en lugar de REACT_APP_BACKEND_URL
				const response = await fetch(
					`${process.env.BACKEND_URL}/api/search?query=${searchTerm}`
				);

				console.log("Respuesta del backend:", response);

				if (response.ok) {
					const data = await response.json();
					setSearchResults(data);  // Guarda los resultados en data
					getActions().setUser(data);;
				} else {
					console.error("Error al obtener los resultados:", response.status);
				}
			} catch (error) {
				console.error("Hubo un error en la búsqueda:", error);
			}
		} else {
			setSearchResults([]); //si no hay busqueda limpia el resultado
		}

	};

	const handleResultClick = (albumid) => {
		navigate(`/infoAlbum/${albumid}`);// Redirige a infoAlbum
		setSearchTerm("");   // recetea el termino de busqueda al reedirigir
	};

	const logoutUser = () => {
		actions.logout(); // Elimina el token en el store y localStorage
		navigate("/login"); // Redirige al login
	  };

	useEffect(() => {
	
	setIsLogged(!!store.token);//!!
	
	get_profile(); 
	
	 }, [store.token]);

	return (
		<nav className="navbar py-0">
			<div className="container-fluid px-3 d-flex justify-content-between">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<a className="navbar-brand" href="#">
						<i className="circle fa-solid fa-record-vinyl"></i>
						RetroVinyl
					</a>
				</Link>
				{
					isLogged ?
						<div className="d-flex dropdown">
							<div className="search input-group mb-3">
								<input type="text"
									className="input-search form-control"
									placeholder="Escribe para buscar"
									aria-describedby="basic-addon2"
									value={searchTerm}
									onChange={(e) => {
										setSearchTerm(e.target.value);
										handleSearch(e.target.value);
									}}
								/>
								<div className="input-group-append">
									<button onClick={handleSearch}
										className="search btn btn-outline-danger">
										<i class="fa-solid fa-magnifying-glass"></i>
									</button>
								</div>
							</div>
							<ul className="search-results-list"> {/* si el term esta vació no devuelve nada, si contiene algo devuelve el resultado*/}
								{searchTerm === "" ? null : searchResults.length > 0 ? (
									searchResults.map((album) => (
										<li
											key={album.id}
											onClick={() => handleResultClick(album.id)}
											style={{ cursor: "pointer" }}
										>
											<strong>{album.title}</strong> ({album.year})
										</li>
									))
								) : (
									searchTerm !== "" && (
										<p className="searchTitle">No se encontraron resultados</p>
									)
								)}
							</ul>
                            
							<button className="user btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								{user.username}
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<Link to="/perfil" style={{ textDecoration: 'none' }}>
									<li><a className="dropdown-item" href="#">Perfil</a></li>
								</Link>
								<Link to="/favoritos" style={{ textDecoration: 'none' }}>
									<li><a className="dropdown-item" href="#">Favoritos</a></li>
								</Link>
								<Link to="/pedidos" style={{ textDecoration: 'none' }}>
									<li><a className="dropdown-item" href="#">Pedidos</a></li>
								</Link>								
									<li><a className="dropdown-item" href="#"
									onClick={() => {
										logoutUser();
									}} >Cerrar Sesión</a></li>								
							</ul>
						</div>
						:
						<div className="buttons">
							<Link to="/register" style={{ textDecoration: 'none' }}>
								<button className="register btn btn-outline-danger">Registarse</button>
							</Link>
							<Link to="/login" style={{ textDecoration: 'none' }}>
								<button className="login btn btn-danger mx-2">Iniciar Sesión</button>
							</Link>
						</div>
				}
			</div>
		</nav>
	);
};

