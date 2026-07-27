import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("token", token, {
    expires: 7,
    sameSite: "Strict",
    secure: false, // true after deployment (HTTPS)
  });
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");
};

// User
export const setUser = (user) => {
  Cookies.set("user", JSON.stringify(user), {
    expires: 7,
    sameSite: "Strict",
    secure: false,
  });
};

export const getUser = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  Cookies.remove("user");
};

export const clearAuth = () => {
  removeToken();
  removeUser();
};