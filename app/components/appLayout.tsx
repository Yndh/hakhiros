import { Dispatch, SetStateAction } from "react";
import { NavBar } from "./navbar";

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
  setTriggerRerender: Dispatch<SetStateAction<boolean>> | undefined
}

export const AppLayout = ({ children, active, setTriggerRerender }: AppLayoutProps) => {
  return (
    <main className="appContainer">
      <NavBar active={active} setTriggerRerender={setTriggerRerender} />
      <div className="mainContainer">{children}</div>
    </main>
  );
};
