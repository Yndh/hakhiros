'use client'

import { useEffect, useState } from "react";
import { NavBar } from "./navbar";

interface AppLayoutProps {
  active: string;
  children: React.ReactNode;
}

export const AppLayout = ({ children, active }: AppLayoutProps) => {
  const [houses, setHouses] = useState<{ [key: string]: House }>({})
  const [userHouseId, setUserHouseId] = useState<string>("0")

  useEffect(() => {
    fetch('/api/house')
      .then((res) => res.json())
      .then((data: { [key: number]: House }) => {
        setHouses(data)
        setUserHouseId(Object.keys(data)[0])
      })
  }, [])

  return (
    <main className="appContainer">
      <NavBar active={active} houses={houses} userHouseId={userHouseId} setUserHouseId={setUserHouseId} />
      <div className="mainContainer">{children}</div>
    </main>
  );
};
