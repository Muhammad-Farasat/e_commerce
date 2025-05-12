import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import Loader from "../Components/Loader/loader";



const Orders = () => {


    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${backend_url}/get-order`, {
                    headers: {
                        "auth-token": localStorage.getItem("auth-token"),
                    },
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.message || "Failed to fetch orders");

                setOrders(data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchOrders();

    }, [backend_url]);


    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${backend_url}/update-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")
                },
                body: JSON.stringify({ orderId, newStatus })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
            toast.success("Order status updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order status");
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-600">
                <PackageCheck className="mx-auto mb-2 w-8 h-8" />
                <p>No orders found</p>
            </div>
        );
    }

    return (
        <div className="p-8 ml-64 max-lg:ml-20 max-md:ml-16 w-full min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h1>

            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order, index) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-mono text-blue-700 font-semibold">
                                    #{order._id.slice(-4)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-800">{order.userId?.name}</div>
                                    <div className="text-xs text-gray-500">{order.userId?.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <ul className="list-disc list-inside space-y-1">
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productId?.name} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 text-green-600 font-semibold">
                                    Rs.{order.totalPrice}
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Orders;
