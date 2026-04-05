import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await registerUser({ email, password });

      alert("Registration successful");

      navigate("/"); 

    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-6 rounded-2xl shadow-lg w-80">

      <h2 className="text-2xl font-bold mb-4 text-center">
        📝 Register
      </h2>

      <input
        className="w-full border p-2 rounded-lg mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded-lg mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        onClick={handleRegister}
      >
        Register
      </button>

      <p className="text-sm mt-3 text-center">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>

    </div>
  </div>
);
}

export default Register;