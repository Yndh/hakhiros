"use client"

import { useEffect, useRef, useState } from "react";
import AppLoader from "@/app/components/appLoader";
import HouseCard from "@/app/components/houseCard/houseCard";

export default function Invite({ params }: { params: { code: string } }) {
  const [isFetching, setIsFetching] = useState(true)
  const house = useRef<houseCode | null>(null)
  const code = params.code

  useEffect(() => {
    fetch(`/api/house/${code}`).then(res => {
      if (res.status == 404) {
        return
      }
      return res.json()
    }).then(data => {
      house.current = data
      setIsFetching(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="fullContainer">
      {
        !isFetching ? <HouseCard house={house.current} code={code} /> : <AppLoader />
      }
    </div>
  );
}