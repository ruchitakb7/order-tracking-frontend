import { useState, useEffect } from "react";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import { createOrder, getMyOrders, deleteOrder } from "../service/order";
import { socket } from "../socket"
import { Delete } from "lucide-react";

function UserDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [productName, setProductName] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName.trim()) {
            alert("Product name is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await createOrder({
                productName: productName,
            });

            alert(response.message);

            fetchOrders();

            setProductName("");
            setShowForm(false);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await getMyOrders();

            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const handleStatusUpdate = (updatedOrder) => {
            // alert(
            //     `Your order "${updatedOrder.productName}" status has been updated to ${updatedOrder.status}.`
            // );

            // setOrders((prev) =>
            //     prev.map((order) =>
            //         order._id === updatedOrder._id
            //             ? updatedOrder
            //             : order
            //     )
            // );
            
            fetchOrders()
       
        };

        socket.on("orderStatusUpdated", handleStatusUpdate);

        return () => {
            socket.off("orderStatusUpdated", handleStatusUpdate);
        };
    }, []);

    // useEffect(() => {
    //     socket.on("orderStatusUpdated", (order) => {
    //         console.log("Received update:", order);
    //         alert("Status updated!");
    //     });

    //     return () => {
    //         socket.off("orderStatusUpdated");
    //     };
    // }, []);

   const handleDeleteOrder = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {
            const response = await deleteOrder(id);

            alert(response.message);

            fetchOrders();
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete order."
            );
        }
    };

    return (
        <>
            <Card className="max-w-xl mx-auto text-center py-10">
                {!showForm ? (
                    <Button
                        className="px-8 py-3"
                        onClick={() => setShowForm(true)}
                    >
                        Create Order
                    </Button>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block mb-2 text-left text-sm font-medium text-gray-700">
                                Product Name
                            </label>



                            <Input
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => {
                                   
                                    setProductName(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Submit"}
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setProductName("");
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
            {orders.length > 0 && (
                <div className="mt-10">
                    <h2 className="mb-4 text-xl font-semibold text-left">
                        My Orders
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        Product Name
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Created At
                                    </th>
                                     <th className="px-4 py-3 text-left">
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">
                                            {order.productName}
                                        </td>

                                        <td className="px-4 py-3 capitalize">
                                            {order.status}
                                        </td>

                                        <td className="px-4 py-3">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                        <td>
                                         <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                >
                                                    <Delete size={12}></Delete>
                                                </Button>
                                                </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserDashboard;