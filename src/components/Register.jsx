import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import Button from "../components/ui/utton";
import Card from "../components/ui/ard";
import Input from "../components/ui/nput";
import { Register } from "../service/auth";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await Register(formData);

            if (response.success) {
                alert(response.message);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
            <Card className="w-full max-w-md shadow-xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-gray-900 p-4 rounded-2xl">
                        <Package className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2 text-center">
                        Register to access Order Tracker
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <Input
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800"
                    >
                        Register
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="font-semibold text-gray-900 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </form>
            </Card>
        </div>
    );
}

export default RegisterPage;