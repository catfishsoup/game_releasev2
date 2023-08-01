import styled from "styled-components";
import { externalurl } from "../../components/externalurl.js";
import link from "../../img/external_links/link.svg";
import { useContext } from "react";
import { GameContext } from "../Template";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase.js";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  getDocs,
  increment,
  getDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import GameLog from "../../components/GameLog.js";
import ListModal from "../../components/ListModal.js";

const TemplateLeft = () => {

  const { info, userData, userRef, id} = useContext(GameContext)
  const [favorite, setFavorite] = useState(null);
  const [openList, setopenList] = useState(false);
  const [userList, setuserList] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [newList, setnewList] = useState(false);


  useEffect(() => {
    getDocs(collection(db, `users/${auth.currentUser?.uid}/lists`)).then(
      (docs) => {
        const tempArray = [];
        docs.forEach((data) => {
          const listObject = {
            id: data.id,
            name: data.data().name,
          }; 
          tempArray.push(listObject);
        });
        setuserList(tempArray);
      }
    );

    getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        setFavorite(doc.data().favorite);
      }
    });
  }, []);

  async function favoriteGame() {
    // If data is contained and favorite is false.
    if (userData.length !== 0) {
      setFavorite(!favorite);
      await updateDoc(
        userRef,
        {
          favorite: !favorite,
        },
        { merge: true }
      );
    } else {
      await setDoc(
        userRef,
        {
          favorite: true,
          name: info[0].name,
          url: info[0].cover.url,
        },
        { merge: true }
      );
    }
  }

  const addtoList = (list) => {
    const userListRef = doc(db, `users/${auth.currentUser?.uid}/lists/${list}`);
    //Keeping track number of games inside a document (because I can't query subcollections inside documents w/o a server)
    setDoc(
      userListRef,
      {
        games: {
          [id]: {
            name: info[0].name,
            url: info[0].cover.url,
          },
        },
        count: increment(1),
      },
      { merge: true }
    );
  };



  return (
    <>
      <aside className="left-section">
        {auth.currentUser !== null ? <section className="manage-games">
          {/* Only allow log in user to perform action down here.  */}
          <h2>Manage Game</h2>
          <div className="manage-game-settings">
            <button className="log-btn" onClick={() => setopenModal(true)}>
              <span>Log {`${info[0].name}`}</span>
            </button>
            {/* Render on click, not on page refresh */}
            <FavoriteBtn onClick={() => favoriteGame()} favorite={favorite}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
                />
              </svg>
            </FavoriteBtn>
          </div>

          <div
            className="user-lists"
            onClick={() => setopenList(!openList)}
          >
            {/* If not added to list, display 'Add to List' else display the belong list. */}
            <div className="add-to-list">
              <span>Add to List</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g id="evaArrowDownFill0">
                  <g id="evaArrowDownFill1">
                    <path
                      id="evaArrowDownFill2"
                      fill="currentColor"
                      d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div
              className="list-holder"
              style={{ display: openList === true ? "block" : "none" }}
            >
              <div onClick={() => addtoList("wishlist")}>Wishlist</div>
              {userList.map((data) => {
                if (data.id !== "wishlist") {
                  return (
                    <div onClick={() => addtoList(data.id)} key={data.id}>
                      {data.name}
                    </div>
                  );
                }
              })}
              <div
                className="new-user-list"
                onClick={() => setnewList(true)}
              >
                New List
              </div>
            </div>
          </div>
        </section> : null}

        {/**/}
        <section className="release-dates">
          <h2>Release Date</h2>
          <p>{info[0].release_dates[0]?.human}</p>
        </section>

        {/**/}
        <section className="platforms">
          <h2>Platforms</h2>
          <ul>
            {info[0].platforms?.map((platform) => {
              return <List data={platform} />;
            })}
          </ul>
        </section>

        {/**/}
        <section className="developers">
          <h2>Created By</h2>
          <ul>
            {info[0].involved_companies?.map((curr_company) => {
              return <List data={curr_company.company} />;
            })}
          </ul>
        </section>

        {/**/}
        <section className="ext-links">
          <h2>External Links</h2>
          <ul>
            {info[0].websites?.map((website) => {
              let temp_value = externalurl.filter(
                (data) => data.id === website.category
              );
              if (temp_value.length > 0) {
                return (
                  <li>
                    <ExternalLink
                      href={website.url}
                      target="_blank"
                      $mini_icon={temp_value[0]?.icon || link}
                    >
                      {temp_value[0]?.name}
                    </ExternalLink>
                  </li>
                );
              }
            })}
          </ul>
        </section>
      </aside>
      <GameLog modalValue={openModal} setOpen={setopenModal} />
      <ListModal click={setnewList} modalValue={newList} />
    </>

  )
}

const List = ({ data }) => {
  return <li key={data.key}>{data.name}</li>;
};

const FavoriteBtn = styled.button`
  background: ${props => props.favorite === true ? 'red' : 'gray'};
  border-radius: 5px;
  display: block;
  padding: 5px;
  border: none;
  vertical-align: center;
  cursor: pointer;
`;

const ExternalLink = styled.a`
  background: url(${(props) => props.$mini_icon || link}) no-repeat scroll 1px
    1px;
  padding-left: 25px;
  padding-bottom: 5px;
  text-decoration: none;
  color: black;
  display: block;
  margin-bottom: 0.5em;
  transition: 0.2s;
  &:hover {
    color: #695ef5;
  }
`;

export default TemplateLeft;