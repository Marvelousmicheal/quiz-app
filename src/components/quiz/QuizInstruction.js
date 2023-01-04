import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GiChoice } from "react-icons/gi";
import { GiLightBulb } from "react-icons/gi";

function QuizInstruction() {
  return (
    <>
      <Helmet>
        <title>How to play - Tryuiz App</title>
      </Helmet>
      <section className="instruction">
        <h1>How to play the Game</h1>
        <p>Ensure you read this guide from start to finish</p>
        <ul className="default" id="main-list">
          <li>
            the game has a duration of 15 minutes and ends as soon as your time
            elapses
          </li>
          <li>each game consists of 15 questions.</li>
          <li>
            every question contains 4 options
            <div className="img">images goes here</div>
          </li>
          <li>
            select the option which best answers the question by clicking i.e
            (selecting) it
            <div className="img"></div>
          </li>
          <li>
            each game has 2 lifeline namely:
            <ul id="sublist">
              <li> two 50-50 chances</li>
              <li>five Hints</li>
            </ul>
          </li>
          <li>
            selecting a 50-50 lifeline by clicking the icon
            <span className="lifeline-icon">
              <GiChoice />
            </span>
            will remove 2 wrong answers, leaving the correct answer and one
            wrong answer
            <div className="img"></div>
          </li>
          <li>
            using a hint by clicking the icon
            <span className="-icon">
              <GiLightBulb />
            </span>
            will remove one wrong answer leaving two wrong answers and one
            correct answer. you can use as many hints as possible on a single
            question.
            <div className="img">images goes here</div>
          </li>
          <li>
            feel free to quit (or retire from) the game at any time, in that
            case your score will be revealed afterwards.
          </li>

          <li>the timer starts as so on as the game loads</li>

          <li>let's do this if you thinks you've got what it takes</li>
        </ul>
        <div className="action-link">
          <span className="left">
            <Link to="/">No, take me back</Link>
          </span>
          <span className="right">
            <Link to="/play/quiz">Yes, Let Goooo</Link>
          </span>
        </div>
      </section>
    </>
  );
}

export default QuizInstruction;
