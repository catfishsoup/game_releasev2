
import ModalImage from "react-modal-image";
import { useContext } from "react";
import { GameContext } from "../Template";



const TemplateMain = () => {
  const {info} = useContext(GameContext)

    return(
        <section className="main-section">
            <section className="genre">
              <ul>
                {" "}
                {info[0].genres?.map((genre) => {
                  return <List data={genre} />;
                })}
              </ul>
            </section>

            <section className="desc">
              <h2>Description</h2>
              <p className="game-desc">{info[0].summary}</p>
            </section>

            <section className="screenshots">
              <h2>Screenshots</h2>
              <div className="modal-cont">
                {info[0].screenshots?.map((picture) => {
                  return <Screenshot data={picture} />;
                })}
              </div>
            </section>

            <section className="screenshots">
              <h2>Videos</h2>
              <div className="video-cont">
                {info[0].videos?.map((video) => {
                  return <Media data={video} />;
                })}
              </div>
            </section>
          </section>
    )
}
const Screenshot = ({ data }) => {
    return (
      <ModalImage
        className="modal-img"
        small={data.url.replace("t_thumb", "t_screenshot_med")}
        large={data.url.replace("t_thumb", "t_screenshot_huge")}
      />
    );
  };

  const Media = ({ data }) => {
    return (
      <div>
        <iframe
          width="555"
          height="312"
          src={`https://www.youtube.com/embed/${data.video_id}`}
          title={`${data.name}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; 
          encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  const List = ({ data }) => {
    return <li key={data.key}>{data.name}</li>;
  };

export default TemplateMain;