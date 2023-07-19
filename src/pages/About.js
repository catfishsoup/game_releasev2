import "../styles/About.scss";

const About = () => {
  return (
    <main className="about-main">
      <h1>About Videa</h1>
      <section className="about-desc-sect">
        <p className="desc-para desc-para-purpose">
          Welcome to Videa. The platform focus on updating game releases and
          storing existing games powered by IGDB API to help you track your
          games, and hopefully reduce your backlog! We focus on mainstream
          platforms like PC, XBOX Series, Playstation 4 & 5, and Nintendo
          Switch. Although, you can still search for older game titles using our
          Search function!
          
          <p>Videa also includes customizable profile for you to store and track games via lists, favorites, and progress.
            The profile will also have data visualization for easier backlog progress measurement!
          </p>
          <br />
          <small>
            Fun fact: Videa is a 2nd version of a website called,{" "}
            <a
              href="https://video-game.onrender.com/about.html"
              target="_blank"
              rel="noreferrer"
            >
              Game Release
            </a>
            .
          </small>
        </p>
        <div>
          <h2 className="about-sect-subtitle">Purpose</h2>
        </div>
      </section>

      <section className="about-desc-sect">
        <div>
          <h2 className="about-sect-subtitle">Creator</h2>
        </div>

        <p className="desc-para desc-para-creator">
          The website is created by Jen Nguyen, who also have a large backlog to
          get through. Feel free to check out the creator{" "}
          <a href="https://github.com/jjxnn/game_releasev2" target="_blank" rel="noreferrer">GitHub repo</a> for
          this project.
        </p>
      </section>

      <section>
        <h2 className="feedback">Question or feedback? Get in touch!</h2>
      </section>
    </main>
  );
};

export default About;
