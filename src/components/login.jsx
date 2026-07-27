import { useState } from "react";
import { Package } from "lucide-react";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import { Login, saveFcmToken} from "../service/auth";
import { setToken, setUser } from "../cookies";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket"
import { requestNotificationPermission } from "../firebase/firebaseMessaging";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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


    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await Login(formData);
      console.log(response)

      if (response.success) {
        setToken(response.token);
        setUser(response.user);

        socket.connect();

        socket.emit("join", response.user.id);

        const fcmToken = await requestNotificationPermission();

        if (fcmToken) {
          await saveFcmToken(fcmToken);
        }

        console.log("FCM Token:", fcmToken);

        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message)
      console.log(error);
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
            Order Tracker
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Real-Time Order Notification System
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800"
          >
            Login
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-gray-900 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;