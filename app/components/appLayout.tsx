'use client'

import { useEffect, useState } from "react";
import { NavBar } from "./navbar";

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
}

export const AppLayout = ({ children, active }: AppLayoutProps) => {
  const [userHouses, setUserHouses] = useState<UserHouse[]>([])
  const [userHouseId, setUserHouseId] = useState<number>(0)

  useEffect(() => {
    fetch('/api/house')
      .then((res) => res.json())
      .then((data: UserHouse[]) => {
        setUserHouses(data)
        setUserHouseId(data[0]["id"])
      })
  }, [])

  return (
    <main className="appContainer">
      <NavBar active={active} userHouses={userHouses} userHouseId={userHouseId} setUserHouseId={setUserHouseId} />
      <div className="mainContainer">{children}</div>
    </main>
  );
};
