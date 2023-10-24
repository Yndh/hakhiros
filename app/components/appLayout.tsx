import { NavBar } from "./navbar";

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
}
export const AppLayout = ({ children, active }: AppLayoutProps) => {
  return (
    <main className="appContainer">
      <NavBar active={active} />
      <div className="mainContainer">{children}</div>
    </main>
  );
};
