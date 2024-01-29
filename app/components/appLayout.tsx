'use client'

import { Dispatch, SetStateAction, Suspense, useRef, useState } from "react";
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
  const isNavBarLoading = useRef(true)
  return (
    <main className="appContainer">
      <Suspense fallback={<AppLoader />}>
        {
          isNavBarLoading.current ? <>
            <AppLoader />
            <div style={{ visibility: "hidden" }}>
              <NavBar setUser={setUser} setCode={setCode} active={active} setTriggerRerender={setTriggerRerender} isNavBarLoading={isNavBarLoading} />
            </div>
          </> :
            <>
              <NavBar setUser={setUser} setCode={setCode} active={active} setTriggerRerender={setTriggerRerender} isNavBarLoading={isNavBarLoading} />
              <div className="mainContainer">{children}</div>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                pauseOnHover
                draggable
              />
            </>
        }
      </Suspense>
    </main>
  );
};
