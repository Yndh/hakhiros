import "../globals.css";
import { NavBar } from "../components/navbar";
import { AppLayout } from "../components/appLayout";

export default function Dashboard() {
  return (
    <AppLayout active="dashboard">
      <div className="tile first ">
        <span>Witaj Ponownie,</span>
        <h1>Użytkownik</h1>
      </div>
      <div className="tile first">
        <h1>Test</h1>
        <span>Test</span>
      </div>
    </AppLayout>
  );
}
