import api from "../axios";

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