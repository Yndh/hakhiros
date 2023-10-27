"use client";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    throw new Error("Function not implemented.");
  };

  const googleButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    throw new Error("Function not implemented.");
  };

  return (
    <div className="loginContainer">
      <div className="absoluteCircle"></div>
      <form onSubmit={submitHandler} className="formContainer">
        <div className="formRow">
          <h2>Witaj użytkowniku!</h2>
          <span className="loginDesc">
            Zarejestruj się do aplikacji Hakhiros
          </span>
        </div>

        <div className="formRow">
          <div className="inputContainer">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="name"
              id="emailInput"
              placeholder="Wprowadz e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              id="passwordInput"
              placeholder="Wprowadz haslo..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="formRow">
          <button className="login" type="submit">
            Zarejestruj się
          </button>
          <span className="or">lub</span>

          <button
            type="button"
            className="googleLogin"
            onClick={googleButtonHandler}
          >
            <span className="googleIcon">G</span>
            <span>Zarejestruj się przez Google</span>
          </button>
        </div>
      </form>
      <span className="loginOption">
        <span>Masz konto? </span>
        <Link href={"/login"} className="coloredLink">
          Zaloguj się
        </Link>
      </span>
      <div className="absoluteCircle"></div>
    </div>
  );
}
