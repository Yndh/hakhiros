"use client";

import { AppLayout } from "@/app/components/appLayout";
import Card from "@/app/components/card";
import Duty from "@/app/components/duty";
import Modal from "@/app/components/modal";
import useUserHouseId from "@/store/useUserHouseId";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Duties() {
  const [weekDay, setWeekDay] = useState(new Date().getUTCDay());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [dutyTitle, setDutyTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const weekDaysNames = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  const [duties, setDuties] = useState<Dutie[]>([]);

  const [members, setMember] = useState<Members>({})

  const user_house_id = useUserHouseId()
  useEffect(() => {
    fetch(`/api/members?user_house_id=${user_house_id}`)
      .then((res) => res.json())
      .then((data: Members | ErrorRespone) => {
        if ("error" in data) {
          toast.error(`Wystąpił błąd: ${data["error"]}`);
          return;
        }
        setMember(data)
        return data
      }).then((members) =>
        fetch(`/api/dutie?user_house_id=${user_house_id}`)
          .then((res) => res.json())
          .then((data: DutieFetch[] | ErrorRespone) => {
            if ("error" in data) {
              toast.error(`Wystąpił błąd: ${data["error"]}`);
              return;
            }
            if (!members) {
              toast.error(`Wystąpił problem z pobraniem użtykowników`);
              return;
            }
            const formated_duties: any[] = []
            data.forEach(item => {
              console.log()
              const existingItem = formated_duties.find(outputItem => outputItem.profile_id === item.profile_id && outputItem.weekDay === item.week_day);
              if (existingItem) {
                existingItem.duties.push({
                  id: item.id,
                  title: item.title,
                  isCompleted: item.is_done
                });
              } else {
                formated_duties.push({
                  id: item.id,
                  user: members[item.profile_id]["name"],
                  profile_id: item.profile_id,
                  duties: [
                    {
                      id: item.id,
                      title: item.title,
                      isCompleted: item.is_done
                    }
                  ],
                  weekDay: item.week_day,
                });
              }
            });
            setDuties(formated_duties)
          }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_house_id]);

  const getFilteredDuties = () => {
    return duties.filter((duty) => duty.weekDay === weekDay);
  };

  const handlePrevDay = () => {
    const newWeekDay = (weekDay + 6) % 7;
    setWeekDay(newWeekDay);
  };

  const handleNextDay = () => {
    const newWeekDay = (weekDay + 1) % 7;
    setWeekDay(newWeekDay);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCreateDuty = async () => {
    if (!selectedUser.trim() || !dutyTitle.trim()) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }
    const existingUser = duties.find((duty) => duty.profile_id.toString() === selectedUser && duty.weekDay === selectedDay);
    const body_dutie = {
      "user_house_id": user_house_id,
      "profile_id": selectedUser,
      "title": dutyTitle,
      "week_day": selectedDay
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body_dutie),
    };
    const dutie = await fetch("/api/dutie", options)
      .then((res) => res.json())
      .then((data: NoteFetch) => {
        const datetime_node: Note = {
          ...data,
          createdAt: new Date(data["createdAt"]),
        };
        return datetime_node;
      });
    if ("error" in dutie) {
      toast.error(`Wystąpił błąd: ${dutie.error}`);
      return;
    }
    if (existingUser) {
      const newDuties = existingUser.duties.concat({
        id: dutie.id,
        title: dutyTitle,
        isCompleted: false,
      });

      const updatedDuties = duties.map((duty) =>
        duty.user === selectedUser ? { ...duty, duties: newDuties } : duty
      );

      setDuties(updatedDuties);
    } else {
      const newDuty: Dutie = {
        id: duties.length + 1,
        user: members[selectedUser]["name"],
        profile_id: parseInt(selectedUser),
        duties: [
          {
            id: dutie.id,
            title: dutyTitle,
            isCompleted: false,
          },
        ],
        weekDay: selectedDay,
      };

      setDuties((duties) => [...duties, newDuty]);
    }
    setSelectedUser("");
    setDutyTitle("");
    setSelectedDay(new Date().getDay());
    toggleModal();
    toast.success("Obowiązek został dodany");
  };
  return (
    <AppLayout active="duties">
      <div className="header">
        <h1>Obowiązki</h1>
        <div className="row">
          <button onClick={toggleModal}>Utwórz</button>
        </div>
      </div>

      <div className="dutyRow">
        <Card classes="center">
          <button className="box" onClick={handlePrevDay}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h1>{weekDaysNames[weekDay]}</h1>
          <button className="box" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Card>
      </div>

      <div className="dutyRow">
        {getFilteredDuties().length > 0 ? (
          getFilteredDuties().map((duty) => {
            return (
              <Duty
                key={duty.id}
                user={duty.user}
                duties={duty.duties}
              />
            )
          })
        ) : (
          <Card classes="center">
            <h3 className="thin">Nie ma żadnych obowiazków na ten dzien</h3>
          </Card>
        )}
      </div>

      <Modal isOpen={modalOpen}>
        <FontAwesomeIcon
          icon={faClose}
          className="close"
          onClick={toggleModal}
        />
        <h2 className="title">Dodaj Obowiazek</h2>

        <p className="thin">Wybierz użytkownika</p>
        <div className="choiceRow">
          {Object.keys(members).map((key) => (
            <Fragment key={key}>
              <input
                type="radio"
                name="selectedUser"
                id={`selectedUser${key}`}
                checked={selectedUser === key}
                onChange={() => setSelectedUser(key)}
              />
              <label htmlFor={`selectedUser${key}`}>@{members[key]["name"]}</label>
            </Fragment>
          ))}
        </div>

        <p className="thin">Wpisz obowiazek</p>
        <input
          type="text"
          placeholder="Wpisz obowiązek..."
          value={dutyTitle}
          onChange={(e) => setDutyTitle(e.target.value)}
        />

        <p className="thin">Wybierz dzień tygodnia</p>
        <div className="choiceRow">
          {[...weekDaysNames.slice(1), weekDaysNames[0]].map(
            (dayName, index) => {
              const dayIndex = (index + 1) % 7;
              return (
                <div key={index}>
                  <input
                    type="radio"
                    name="selectedDay"
                    id={`selectedDay${dayIndex}`}
                    value={dayIndex}
                    onChange={() => setSelectedDay(dayIndex)}
                    checked={selectedDay === dayIndex}
                  />
                  <label htmlFor={`selectedDay${dayIndex}`}>
                    {dayName.slice(0, 3)}
                  </label>
                </div>
              );
            }
          )}
        </div>

        <button onClick={handleCreateDuty}>Dodaj</button>
      </Modal>
    </AppLayout>
  );
}
