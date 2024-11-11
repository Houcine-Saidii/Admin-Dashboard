"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";

export default function Reset() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3001/auth/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("Password reset email sent.");
    } else {
      alert("Error sending email.");
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
        <form onSubmit={handleSubmit}>
          <h1>Réinitialisation du mot de passe</h1>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <button type="submit" className={styles.btn}>
            Envoyer
          </button>
          <div className={styles.registerLink}>
            <p>
              <Link href="/">Retour</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
