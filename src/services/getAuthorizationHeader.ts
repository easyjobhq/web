import Cookies from "js-cookie";

export function getAuthorizationHeader() {
  const currentUser = Cookies.get("currentUser");


  //TODO - Manage when the user isn't logged

  return {
    //Authorization: `Bearer ${JSON.parse(currentUser || "")?.token || ""}`,
    Authorization: `Bearer ${JSON.parse(currentUser || "")?.token}`,
  };
}