import api from "../axios";
import { getToken } from "../cookies";

export const createOrder = async (data) => {
  const token = getToken();

  const response = await api.post(
    "/orders",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const getMyOrders = async () => {
  const token = getToken();

  const response = await api.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllOrders = async () => {
  const token = getToken();

  const response = await api.get("/orders/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
    console.log(id,status)
  const token = getToken();

  const response = await api.patch(
    `/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const deleteOrder = async (id) => {
     const token = getToken();
    const response = await api.delete(`/orders/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    return response.data;
};