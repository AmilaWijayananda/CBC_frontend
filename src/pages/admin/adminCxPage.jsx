import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminCustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [view, setView] = useState("customers"); // "customers" or "admins"

    // Form state for creating an admin
    const [newAdmin, setNewAdmin] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    // Fetch all customers
    useEffect(() => {
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

    // Fetch all admins
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/admins', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAdmins(response.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load admins');
            }
        };

        fetchAdmins();
    }, []);

    const handleBlockStatusChange = (userId, newStatus, isAdmin = false) => {
        if (isAdmin) {
            const updatedAdmins = admins.map(admin =>
                admin._id === userId ? { ...admin, isBlocked: newStatus } : admin
            );
            setAdmins(updatedAdmins);
        } else {
            const updatedCustomers = customers.map(customer =>
                customer._id === userId ? { ...customer, isBlocked: newStatus } : customer
            );
            setCustomers(updatedCustomers);
        }
    };

    const handleUpdate = async (userId, isAdmin = false) => {
        const userToUpdate = isAdmin
            ? admins.find(admin => admin._id === userId)
            : customers.find(customer => customer._id === userId);

        const userData = {
            _id: userToUpdate._id,
            email: userToUpdate.email,
            firstName: userToUpdate.firstName,
            lastName: userToUpdate.lastName,
            isBlocked: userToUpdate.isBlocked
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/${userToUpdate.email}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("User status updated successfully");
        } catch (error) {
            console.log(error);
            toast.error('Failed to update user status');
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin({
            ...newAdmin,
            [name]: value,
        });
    };

    // Handle form submission to create an admin
    const handleCreateAdmin = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/createAdmin",
                { ...newAdmin, type: "Admin" }, // Ensure the type is set to "Admin"
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.message === "User created") {
                toast.success("Admin created successfully");
                setNewAdmin({ email: "", firstName: "", lastName: "", password: "" }); // Reset form
                // Refresh the admins list
                const fetchAdminsResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/admins', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAdmins(fetchAdminsResponse.data);
            } else {
                toast.error("Failed to create admin");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create admin");
        }
    };

    return (
        <div className="min-h-screen bg-Background p-4">
            <div className="bg-SecondaryBackground w-full max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
                {/* Toggle Switch */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setView("customers")}
                        className={`px-4 py-2 rounded-l-md ${
                            view === "customers" ? "bg-PrimaryGold text-Text" : "bg-Accent text-Text"
                        }`}
                    >
                        Customers
                    </button>
                    <button
                        onClick={() => setView("admins")}
                        className={`px-4 py-2 rounded-r-md ${
                            view === "admins" ? "bg-PrimaryGold text-Text" : "bg-Accent text-Text"
                        }`}
                    >
                        Admins
                    </button>
                </div>

                <h1 className="text-2xl font-bold text-Text text-center mb-6">
                    {view === "customers" ? "Manage Customers" : "Manage Admins"}
                </h1>

                {/* Create Admin Form (only visible in Admins view) */}
                {view === "admins" && (
                    <form onSubmit={handleCreateAdmin} className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newAdmin.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={newAdmin.firstName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={newAdmin.lastName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newAdmin.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full px-4 py-2 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none"
                        >
                            Create Admin
                        </button>
                    </form>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-PrimaryGold">
                                <th className="p-2 text-left w-1/12 text-Text">User ID</th>
                                <th className="p-2 text-left w-2/12 text-Text">Email</th>
                                <th className="p-2 text-left w-2/12 text-Text">First Name</th>
                                <th className="p-2 text-left w-2/12 text-Text">Last Name</th>
                                <th className="p-2 text-left w-2/12 text-Text">Status</th>
                                <th className="p-2 text-left w-2/12 text-Text">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {view === "customers"
                                ? customers.map((customer) => (
                                      <tr key={customer._id} className="border-b hover:bg-SecondaryBackground">
                                          <td className="p-2 text-Text">{customer._id}</td>
                                          <td className="p-2 text-Text">{customer.email}</td>
                                          <td className="p-2 text-Text">{customer.firstName}</td>
                                          <td className="p-2 text-Text">{customer.lastName}</td>
                                          <td className="p-2">
                                              <select
                                                  value={customer.isBlocked}
                                                  onChange={(e) =>
                                                      handleBlockStatusChange(customer._id, e.target.value === "true")
                                                  }
                                                  className="w-full px-2 py-1 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                              >
                                                  <option value={false}>Active</option>
                                                  <option value={true}>Blocked</option>
                                              </select>
                                          </td>
                                          <td className="p-2">
                                              <button
                                                  onClick={() => handleUpdate(customer._id)}
                                                  className="px-3 py-1 bg-PrimaryGold text-Text font-medium rounded-md hover:bg-SecondaryGold hover:text-white transition-colors duration-200 focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                              >
                                                  Update
                                              </button>
                                          </td>
                                      </tr>
                                  ))
                                : admins.map((admin) => (
                                      <tr key={admin._id} className="border-b hover:bg-SecondaryBackground">
                                          <td className="p-2 text-Text">{admin._id}</td>
                                          <td className="p-2 text-Text">{admin.email}</td>
                                          <td className="p-2 text-Text">{admin.firstName}</td>
                                          <td className="p-2 text-Text">{admin.lastName}</td>
                                          <td className="p-2">
                                              <select
                                                  value={admin.isBlocked}
                                                  onChange={(e) =>
                                                      handleBlockStatusChange(admin._id, e.target.value === "true", true)
                                                  }
                                                  className="w-full px-2 py-1 border border-Accent rounded-md focus:ring focus:ring-PrimaryGold focus:outline-none text-sm"
                                              >
                                                  <option value={false}>Active</option>
                                                  <option value={true}>Blocked</option>
                                              </select>
                                          </td>
                                          <td className="p-2">
                                              <button
                                                  onClick={() => handleUpdate(admin._id, true)}
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