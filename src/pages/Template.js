import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import gameService from "../services/gamereq.js";
import "../styles/Template.scss";
import {
  doc,
  collection,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";

import { createContext } from "react";
import TemplateHeader from "./template/TemplateHeader.js";
import TemplateLeft from './template/TemplateLeft.js'
import TemplateMain from "./template/TemplateMain.js";


export const GameContext = createContext('')
// Main
const Template = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [userData, setuserData] = useState([]);
  const [favorited, setFavorited] = useState(null)
  // List related states

  const userRef = doc(
    collection(db, "users"),
    `${auth.currentUser?.uid}`,
    "games",
    id
  );
  // Loads game data from IDGB
  useEffect(() => {
    gameService.getCurrent(id).then((data) => {
      setInfo(data);
      setLoading(false);
    });

    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        setuserData(doc.data());
        setFavorited(doc.data().favorite);
      }
    });
  }, []);
  //

  if (loading) {
    return <>Loading...</>;
  }

  if(!loading) {
    return (
    <>

      <main className="game-info">

          <GameContext.Provider value={{ info, userData, userRef, id }}>
            <TemplateHeader />
            <section className="info-body">
             <TemplateLeft />
            <TemplateMain /> 
            </section>
          </GameContext.Provider>
      </main>
    </>
  );
};
  }
  

export default Template;
