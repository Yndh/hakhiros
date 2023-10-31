"use client";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("login", {
      email,
      password,
      redirect: false
    });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/app");
    }
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
          <h2>Witaj ponownie!</h2>
          <span className="loginDesc">Zaloguj się do aplikacji Hakhiros</span>
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
            Zaloguj się
          </button>
          <span className="or">lub</span>

          <button
            type="button"
            className="googleLogin"
            onClick={googleButtonHandler}
          >
            <span className="googleIcon">G</span>
            <span>Zaloguj się przez Google</span>
          </button>
        </div>
      </form>
      <span className="loginOption">
        <span>Nie masz konta? </span>
        <Link href={"/register"} className="coloredLink">
          Zarejestruj się
        </Link>
      </span>
      <div className="absoluteCircle"></div>
    </div>
  );
}
