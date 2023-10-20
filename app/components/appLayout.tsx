import { NavBar } from "./navbar";


interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
}
export const AppLayout = ({ children, active }: AppLayoutProps) => {
  return (
    <main className="mainContainer">
      <NavBar active={active}/>
      <div className="appContainer">
        {children}
      </div>
    </main>
  );
};
