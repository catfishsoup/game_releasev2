import { useEffect, useState } from "react";
import userService from "../../firebase/user_request";
import gameService from "../../services/gamereq";
import testpic from "../../img/user.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../../firebase/user_auth";
import ListModal from "../../components/ListModal";

const GameList = styled.div`
  background: url(${(props) => props.$cover});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  width: 200px;
  height: 200px;
  transition: 0.2s ease-in;
  border-radius: 3px;
  &:hover {
    transform: translate(-7px, -7px);
    box-shadow: 7px 7px 0 -3px white, 7px 7px #695ef5;
  }
`;

const ListThumbnail = ({ data }) => {
  const [url, setUrl] = useState();
  useEffect(() => {
    let collectkeys = [];
    if (data.games !== undefined && JSON.stringify(data.games) !== "{}") {
      collectkeys = Object.keys(data.games);
      gameService.getPicture(collectkeys[0]).then((data) => {
        setUrl(data[0].cover.url?.replace("t_thumb", "t_screenshot_med"));
      });
    }
  }, []);
  return (
    <section>
      <GameList $cover={url || testpic}></GameList>
      <div className="list-desc">
        <p className="list-name">{data.name}</p>
        <p className="list-count">{data.count || "0"}</p>
      </div>
    </section>
  );
};

const ProfileList = () => {
  /**
   * List will includes 'Default' List and User generated Lists.
   **/
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(true);
  const [listModal, setlistModal] = useState(false);
  const { user } = UserAuth();
  useEffect(() => {
    userService.fetchLists().then((result) => {
      setList(result);
    });
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  if (!load) {
    return (
      <>
        <section className="list-template-cont">
          <h1 className="sub-page-title">Lists</h1>{" "}
          <button className="action-btn" onClick={() => setlistModal(true)}>New List</button>
          <section className="list-cont">
            {list.map((data) => {
              return (
                <Link
                  className="list-link"
                  to={`/profile/${user.displayName}/lists/${data.name_id}`}
                >
                  <ListThumbnail data={data} />
                </Link>
              );
            })}
          </section>
        </section>
        <ListModal click={setlistModal} modalValue={listModal}/>
      </>
    );
  }
};

export default ProfileList;
