'use client'

import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { NavBar } from "./navbar";
import AppLoader from "./appLoader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
  setCode?: Dispatch<SetStateAction<string>>
  setUser?: Dispatch<SetStateAction<User>>
}

export const AppLayout = ({
  children,
  active,
  setCode,
  setUser
}: AppLayoutProps) => {
  const [triggerRerender, setTriggerRerender] = useState(false);
  return (
    <main className="appContainer">
      <Suspense fallback={<AppLoader />}>
        <NavBar setUser={setUser} setCode={setCode} active={active} setTriggerRerender={setTriggerRerender} />
        <div className="mainContainer">{children}</div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          draggable
        />
      </Suspense>
    </main>
  );
};
