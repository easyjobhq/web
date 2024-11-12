import Cookies from "js-cookie";

export const getCurrentUser = () => {

    const currentUserString = Cookies.get("currentUser");

    if(currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        return currentUser;
    } else {
        return null;
    }
};