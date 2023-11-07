import { Dispatch, SetStateAction, Suspense } from "react";
import { NavBar } from "./navbar";
import AppLoader from "./appLoader";

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
  setTriggerRerender?: Dispatch<SetStateAction<boolean>>;
  setCode?: Dispatch<SetStateAction<string>>
  setUser?: Dispatch<SetStateAction<User>>
}

export const AppLayout = ({
  children,
  active,
  setTriggerRerender,
  setCode,
  setUser
}: AppLayoutProps) => {
  return (
    <main className="appContainer">
      <Suspense fallback={<AppLoader />}>
        <NavBar setUser={setUser} setCode={setCode} active={active} setTriggerRerender={setTriggerRerender} />
        <div className="mainContainer">{children}</div>
      </Suspense>
    </main>
  );
};
