const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: localStorage.getItem("token") || null,  // Guardamos el token en el store
	  },
	  actions: {
		// Acción para iniciar sesión
		login: (token) => {		
		setStore({ token: token });  // Actualizamos el store
		},
  
		// Acción para cerrar sesión
		logout: () => {
		  localStorage.removeItem("token");  // Eliminamos el token de localStorage
		  setStore({ token: null });  // Limpiamos el token en el store
		},
	  },
	};
  };
  
  export default getState;
  