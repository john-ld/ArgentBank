import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const userLogin = async (payload) => {
  let response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  if (!response.ok) {
    const error = await response.json();
    if (response.status === 400) {
      return { error: "Invalid username or password." };
    } else {
      throw new Error(error.message || "Network response was not ok");
    }
  }
  const data = await response.json();
  return data;
};

export const Form = () => {
  const form = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: form.current[0].value,
      password: form.current[1].value,
      rememberMe: form.current[2].checked,
    };
    const payload = JSON.stringify(loginData);
    try {
      const data = await userLogin(payload);
      if (data.body.token) {
        // dispach login //
        // fetchUser //
        // dispach setUser//
        if (loginData.rememberMe) {
          localStorage.setItem("token", data.body.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", data.body.token);
          localStorage.removeItem("token");
        }
        navigate("/user");
      } else {
        console.error("Token not found in response:", data);
      }
    } catch (error) {
      setErrorMessage("Invalid username or password.");
      console.error("Invalid username or password.", error);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input type="password" id="password" />
      </div>
      <div>
        <label htmlFor="rememberMe">Remember me</label>
        <input type="checkbox" id="rememberMe" />
      </div>
      <span> {errorMessage}</span>
      <button type="submit">Se connecter</button>
    </form>
  );
};
