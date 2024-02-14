"use client";

import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import isValidEmail from "@/lib/isValidEmail";
import useCallbackUrl from "@/hooks/useCallbackUrl";

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const callbackurl = useCallbackUrl()
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError("Wprowadź poprawny Email");
      return
    }
    if (callbackurl) {
      await signIn("login", {
        email,
        password,
        callbackUrl: callbackurl
      });
      return
    }
    const result = await signIn("register", {
      username,
      email,
      password,
      redirect: false
    })
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
          <h2>Witaj użytkowniku!</h2>
          <span className="loginDesc">
            Zarejestruj się do aplikacji Hakhiros
          </span>
        </div>

        <div className="formRow">
          <div className="inputContainer">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="name"
              id="usernameInput"
              placeholder="Wprowadz nazwę użytkownika..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          {/* pozostałości po logowaniu google 
          <span className="or">lub</span>

          <button
            type="button"
            className="googleLogin"
            onClick={googleButtonHandler}
          >
            <span className="googleIcon">G</span>
            <span>Zarejestruj się przez Google</span>
          </button> */}
        </div>
      </form>
      <span className="loginOption">
        <span>Masz konto? </span>
        <Link href={{
          pathname: '/login',
          query: { callbackUrl: callbackurl },
        }}
          className="coloredLink">
          Zaloguj się
        </Link>
      </span>
      <div className="absoluteCircle"></div>
    </div>
  );
}
