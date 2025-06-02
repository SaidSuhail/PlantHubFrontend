import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7297/api/Auth/Register",
        formData
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };


const handleGoogleResponse = async (response) => {
    console.log("Full Google response:", response); // 👈 Add this
  const idToken = response.credential;
  console.log("Google credential:", idToken);

  try {
    const result = await axios.post("https://localhost:7297/api/Auth/google-login", {
      idToken: idToken
    });
    console.log("Login success", result.data);
    navigate("/");

  } catch (err) {
    console.error("Google login error", err);
        alert(err.response?.data?.message || "Google login failed");
  }
};

  // Load Google script and initialize button
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "152368794260-5dcgj32hu86qu469tbgupnoef67ndvjr.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
        {/* PlantCareHub Logo */}
        <div className="flex items-center mb-6">
          <span className="text-2xl font-bold text-green-800 mr-2">🌿</span>
          <h1 className="text-2xl font-bold text-green-800">PlantCareHub</h1>
        </div>

        {/* Image */}
        <img
          src="Regsiterimg.jpg"
          alt="Plant"
          className="w-90 h-106 object-cover rounded-md mb-6"
        />

        {/* Heading and Text */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Join our growing community of plant lovers
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Connect with plant experts and enthusiasts
        </p>

        {/* Quote */}
        <blockquote className="italic text-gray-500 text-center">
          "PlantCareHub has transformed how I care for my plants"
          <br />
          <span className="font-medium">- Sarah M.</span>
        </blockquote>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md mt-8 md:mt-0">
        <h2 className="text-2xl font-bold mb-1">Create Your Account</h2>
        <p className="text-gray-600 mb-6">Start your plant care journey today</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number (optional)"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-green-500"
          />

          <div className="flex flex-col gap-2 text-sm">
            <label className="inline-flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 form-checkbox text-green-600"
              />
              <span>I'm interested in professional plant care services</span>
            </label>
            <label className="inline-flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 form-checkbox text-green-600"
              />
              <span>Subscribe to plant care tips and updates</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div id="googleSignInDiv" className="w-full flex items-center justify-center"></div>
          {/* <button className="w-full flex items-center justify-center gap-2 border p-3 rounded-md hover:bg-gray-100">
            <img
              src="https://cdn.simpleicons.org/facebook/1877F2"
              alt="Facebook"
              className="w-5 h-5"
            />
            Facebook
          </button> */}
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-green-600 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-600 underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default Registration;
