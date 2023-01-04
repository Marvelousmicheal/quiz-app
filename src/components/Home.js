import React from "react";
import { Helmet } from "react-helmet";
import { MdQuiz } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quiz-app - Home</title>
      </Helmet>
      <section className="main-section">
        <main>
          <span>
            <MdQuiz className="quiz" />
          </span>
          <h1>Tryuiz App</h1>
          <div className="button-container">
            <Link to="/play/instructions" className="play-btn">
              Play
            </Link>
          </div>
          <div className="container-authn">
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
          </div>
        </main>
      </section>
    </>
  );
};

export default Home;
