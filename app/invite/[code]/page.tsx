"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import JoinHouseButton from "@/app/components/joinHouseButton";
import { useEffect, useRef, useState } from "react";
import AppLoader from "@/app/components/appLoader";
import { useRouter } from "next/navigation";
import HouseCard from "@/app/components/houseCard/houseCard";

export default function Invite({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(true)
  const house = useRef()
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