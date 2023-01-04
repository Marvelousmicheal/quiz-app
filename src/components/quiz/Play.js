import PropTypes from "prop-types";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { GiChoice } from "react-icons/gi";
import { GiLightBulb } from "react-icons/gi";
import { BsClock } from "react-icons/bs";

export class Play extends Component {
  static propTypes = {};

  render() {
    return (
      <>
        <Helmet>
          <title>Quiz page</title>
        </Helmet>
        <section className="question">
          <h2>FREE QUIZ MODE</h2>
          <div className="lifeline-container">
            <p>
              <span className="lifeline-icon">
                <GiChoice />
                <span className="lifeline">2</span>
              </span>
            </p>
            <p>
              <span className="lifeline-icon">
                <span className="lifeline">6</span>
                <GiLightBulb />
              </span>
            </p>
          </div>
          <div className="lifeline-container">
            <span>1 of 15</span>
            <span>
              <BsClock />
              <span className="lifeline">10:15</span>
            </span>
          </div>
          <h5>Google was founded in what year?</h5>
          <main className="answer-containers">
            <p className="option">1997</p>
            <p className="option">1994</p>
          </main>
          <main className="answer-containers">
            <p className="option">1993</p>
            <p className="option">1992</p>
          </main>

          <div className="btn-container">
            <button>Previous</button>
            <button>Next</button>
            <button>Quiz</button>
          </div>
        </section>
      </>
    );
  }
}

export default Play;
