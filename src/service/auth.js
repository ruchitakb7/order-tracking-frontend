import api from "../axios";
import { getToken } from "../cookies";

export const Login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);

    // Throw the backend error so the component can catch it
    throw error.response?.data || {
      message: "Something went wrong",
    };
  }
};

export const Register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};


export const saveFcmToken = async (fcmToken) => {
   const token = getToken();
  const response = await api.patch("/auth/fcm-token", {
    fcmToken,
  },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};