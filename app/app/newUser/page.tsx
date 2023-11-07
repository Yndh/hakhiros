"use client"

import Modal from "@/app/components/modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NewUser() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("join");
    const [houseName, setHouseName] = useState("")
    const [code, setCode] = useState("")

    const toggleModal = (
        e:
          | React.MouseEvent<SVGSVGElement, MouseEvent>
          | React.MouseEvent<HTMLElement, MouseEvent>
      ) => {
        setModalOpen(!modalOpen);
      };

      const changeModalType = (value: string) => {
        setModalType(value);
      };
    
      const codeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
      };
    
      const houseNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHouseName(e.target.value);
      };
      

  return (
    <div className="noHousesContainer">
        <h1>Witaj w FamiLynk</h1>
        <h3>Wygląda na to, że jeszcze nie jesteś przypisany do żadnego Domu w FamiLynk. Ale nie martw się, możesz to zmienić! Oto, co możesz teraz zrobić:</h3>

        <div className="buttonRow">
            <button className="border" onClick={(e) => {
                changeModalType("join")
                toggleModal(e)
            }}>Dołącz do domu</button>
            <button onClick={(e) => {
                changeModalType("create")
                toggleModal(e)
            } }>Utwórz dom</button>
        </div>

        <Modal isOpen={modalOpen}>
          <FontAwesomeIcon
            icon={faClose}
            className="close"
            onClick={toggleModal}
          />
          {modalType === "join" ? (
            <>
              <h2 className="title">Dołącz do Domu</h2>

              <p className="thin">Zaproszenie do domu</p>
              <input
                type="text"
                placeholder="8 znakowy kod"
                onChange={codeChangeHandler}
                value={code}
              />

              <div className="rowContainer">
                <button
                  className="border red"
                  onClick={toggleModal}
                >
                  Anuluj
                </button>
                <button>Dołącz</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="title">Utwórz Dom</h2>

              <p className="thin">Nazwa domu</p>
              <input
                type="text"
                placeholder="np. Epicki Dom"
                onChange={houseNameChangeHandler}
                value={houseName}
              />

              <div className="rowContainer">
              <button
                  className="border red"
                  onClick={toggleModal}
                >
                  Anuluj
                </button>
                <button>Utwórz</button>
              </div>
            </>
          )}
        </Modal>
    </div>
  );
}
