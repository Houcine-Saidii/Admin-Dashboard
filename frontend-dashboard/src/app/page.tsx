"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from "./page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Default admin credentials
  const defaultAdmin = {
    email: "admin@example.com",
    password: "admin123"
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if default admin credentials are used
    if (email === defaultAdmin.email && password === defaultAdmin.password) {
      // Simulate setting a token for the admin
      localStorage.setItem('token', 'default-admin-token');
      router.push('/home');
      return;
    }

    // Fallback to backend authentication for other users
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/home');
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setError("Échec de la connexion");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <h1>
          Administrateur<br></br>local
        </h1>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleLogin}>
          <h1>Connexion</h1>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className={styles.rememberForgot}>
            <Link href="/reset">Mot de passe oublié</Link>
          </div>
          <button type="submit" className={styles.btn}>
            Connectez-vous
          </button>
        </form>
      </div>
    </div>
  );
}
