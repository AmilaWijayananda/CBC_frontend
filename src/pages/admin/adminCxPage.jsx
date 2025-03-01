import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminCustomerPage() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch all customers
        const fetchCustomers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/customers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load customers');
            }
        };

        fetchCustomers();
    }, []);

    const handleBlockStatusChange = (customerId, newStatus) => {
        const updatedCustomers = customers.map(customer =>
            customer._id === customerId ? { ...customer, isBlocked: newStatus } : customer
        );
        setCustomers(updatedCustomers);
    };

    const handleUpdate = async (customerEmail) => {
        const customerToUpdate = customers.find(customer => customer.email === customerEmail);
        const customerData = {
            _id: customerToUpdate._id,
            email: customerToUpdate.email,
            firstName: customerToUpdate.firstName,
            lastName: customerToUpdate.lastName,
            isBlocked: customerToUpdate.isBlocked
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/customers/${customerEmail}`, customerData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Customer status updated successfully");
        } catch (error) {
            console.log(error);
            toast.error('Failed to update customer status');
        }
    };

    return (
        <div className="min-h-screen bg-Background flex items-center justify-center p-4">
            <div className="bg-SecondaryBackground w-full max-w-6xl p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-Text text-center mb-6">
                    Manage Customers
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-PrimaryGold">
                                <th className="p-2 text-left w-1/12 text-Text">Customer ID</th>
                                <th className="p-2 text-left w-2/12 text-Text">Email</th>
                                <th className="p-2 text-left w-2/12 text-Text">First Name</th>
                                <th className="p-2 text-left w-2/12 text-Text">Last Name</th>
                                <th className="p-2 text-left w-2/12 text-Text">Status</th>
                                <th className="p-2 text-left w-2/12 text-Text">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer._id} className="border-b hover:bg-SecondaryBackground">
                                    <td className="p-2 text-Text">{customer._id}</td>
                                    <td className="p-2 text-Text">{customer.email}</td>
                                    <td className="p-2 text-Text">{customer.firstName}</td>
                                    <td className="p-2 text-Text">{customer.lastName}</td>
                                    <td className="p-2">
                                        <select
                                            value={customer.isBlocked}
                                            onChange={(e) => handleBlockStatusChange(customer._id, e.target.value === "true")}
                                            className="w-full px-2 py-1 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                        >
                                            <option value={false}>Active</option>
                                            <option value={true}>Blocked</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleUpdate(customer.email)}
                                            className="px-3 py-1 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}