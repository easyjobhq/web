import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  let currentUser = Cookies.get("currentUser");


  if (!currentUser) {
    // Si no se encuentra "currentUser", buscar el "token" en las cookies
    const token = Cookies.get("token");
    if (token) {
      // Decodificar el token si es necesario y obtener la información del usuario
      // Aquí asumimos que el token ya es el valor que necesitamos
      console.log(token)
      return {
        Authorization: `Bearer ${JSON.parse(token || "")}`,
      };
      
    }
  }else{
    return {
      //Authorization: `Bearer ${JSON.parse(currentUser || "")?.token || ""}`,
      Authorization: `Bearer ${JSON.parse(currentUser || "")?.token}`,
    };
  }
  //TODO - Manage when the user isn't logged

  
}





