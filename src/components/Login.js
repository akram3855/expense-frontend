import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 /* const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const token = await loginUser({ email, password });

      const cleanToken = token.replace(/"/g, "");

      localStorage.setItem("token", token);
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid credentials");
    }
  }; */
  const handleLogin = async () => {
  try {
    const token = await loginUser({ email, password });

    console.log("TOKEN:", token); // 👈 IMPORTANT

    localStorage.setItem("token", token);

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-6 rounded-2xl shadow-lg w-80">

      <div className="text-center mb-4">

  <h1 className="text-3xl font-bold text-blue-600">
     📒
     ExpenseTracker
  </h1>

  <p className="text-gray-500 text-sm">
    Manage your expenses easily
  </p>

</div>

<h2 className="text-xl font-semibold mb-3 text-center">
  Login to your account
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
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="text-sm mt-3 text-center">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
}

export default Login;