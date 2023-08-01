import { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../Template";

const ProfileHeader = styled.div`
  background-image: url(${(props) => props.$cover});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  opacity: 2;
  top: 0;
  left: 0;
  padding: 10rem;
  width: 100%;
  display: inline-block;
  z-index: -1;
`;

const TemplateHeader = () => {
    const {info} = useContext(GameContext)
    return( 
        <section className="header-cont">
        <ProfileHeader
          $cover={
            `${info[0].screenshots[0]?.url.replace(
              "t_thumb",
              "t_screenshot_huge_2x"
            )}` || "#BF4F74"
          }
          className="game-header"
        ></ProfileHeader>
        <div className="header-cont-2">
          <img
            className="game_thumbnail"
            src={
              `${info[0].cover.url.replace("t_thumb", "t_cover_big")}` || ""
            }
            alt="game_thumbnail"
          />
          <h1>{info[0].name}</h1>
        </div>
      </section>
    )
}

export default TemplateHeader; 