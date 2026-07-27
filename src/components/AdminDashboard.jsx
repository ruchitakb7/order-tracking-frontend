import { useEffect, useState } from "react";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../service/order";
import { socket } from "../socket"

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updating, setUpdating] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await getAllOrders();

            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async () => {

        console.log(selectedOrder._id, selectedStatus)

        if (!selectedStatus) return;

        try {
            setUpdating(true);

            const response = await updateOrderStatus(
                selectedOrder._id,
                selectedStatus
            );

            alert(response.message);

            setShowModal(false);
            setSelectedOrder(null);
            setSelectedStatus("");

            fetchOrders();
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Failed to update status.");
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        const handleNewOrder = (notification) => {
            // alert(notification.message);

            fetchOrders();
        };

        socket.on("newOrderCreated", handleNewOrder);

        return () => {
            socket.off("newOrderCreated", handleNewOrder);
        };
    }, []);


   useEffect(() => {
    const handleOrderDeleted = (notification) => {
        // alert(notification.message);

        fetchOrders();
    };

    socket.on("orderDeleted", handleOrderDeleted);

    return () => {
        socket.off("orderDeleted", handleOrderDeleted);
    };
}, []);

    return (
        <>
            <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Admin Dashboard
                </h2>

                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-200">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Customer</th>
                                    <th className="px-4 py-3 text-left">Product</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Created At</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">
                                                {order.customerName}
                                            </td>

                                            <td className="px-4 py-3">
                                                {order.productName}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : order.status === "shipped"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-green-100 text-green-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </td>

                                            <td className="px-4 py-3 flex justify-center gap-2">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setSelectedStatus("");
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Update Status
                                                </Button>
                                               
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6"
                                        >
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Update Status
                        </h2>

                        <select
                            className="w-full border rounded-lg p-2 mb-5"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>

                            {["pending", "shipped", "delivered"]
                                .filter(
                                    (status) => status !== selectedOrder.status
                                )
                                .map((status) => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </option>
                                ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedOrder(null);
                                    setSelectedStatus("");
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={!selectedStatus || updating}
                                onClick={handleStatusUpdate}
                            >
                                {updating ? "Updating..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default AdminDashboard;