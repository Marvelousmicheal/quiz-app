import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { GiChoice } from "react-icons/gi";
import { GiLightBulb } from "react-icons/gi";
import { BsClock } from "react-icons/bs";
import questions from "../../questions.json";
import isEmpty from "../../utils/isEmpty";
import M from "materialize-css";

export class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberofAnswerdQuestion: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFity: 2,
      usedFiftyfifty: false,
      time: {},
    };
  }

  componentDidMount() {
    //destructing
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.showQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
  }
  showQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    //destructuring the currentQuestionindex variable
    let { currentQuestionIndex } = this.state;
    //checking if the question array is empty
    if (!isEmpty(questions)) {
      //setting the question variable to the expected parameter
      questions = this.state.questions;
      //setting the currentquestion parameter to the firstquestion which inthis case is the currentquestionindex which is set to zero
      currentQuestion = questions[currentQuestionIndex];
      //setting the next quesion parammeter to the the currentquestionindex plus 1
      nextQuestion = questions[currentQuestionIndex + 1];
      //setting the next quesion parammeter to the the currentquestionindex minus 1
      previousQuestion = questions[currentQuestionIndex - 1];
      //setting a local variable for the answer
      const answer = currentQuestion.correctAnswer;

      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        answer,
      });
    }
  };

  handleAnswerclick = (e) => {
    //this if statement checks to see if the text content of the selected option is equation to the answer
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.WrongAnswer();
    }
  };

  //this is the function that handles the correct answer: it first has a toast function that comes from material css
  // after it compare the state against the prestate 
  //after which it increment the currentquestionindex which then increment the question from the json file
  correctAnswer = () => {
    M.toast({
      html: "This is the correct answer!",
      classes: "toast-vaild",
      displayLength: 2000,
    });

    //this is a callback function for handling change in the state
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberofAnswerdQuestion: prevState.numberofAnswerdQuestion + 1,
      }),
      () => {
        const { questions, currentQuestion, nextQuestion, previousQuestion } =
          this.state;
        this.showQuestions(
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion
        );
      }
    );
  };

  //this is the function that handles the wrong answer: it first has a toast function that comes from material css
  // after it compare the state against the prestate 
  //after which it increment the currentquestionindex which then increment the question from the json file
  WrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "This is the wrong answer!",
      classes: "toast-invaild",
      displayLength: 2000,
    });

    //this is a callback function for handling change in the state
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberofAnswerdQuestion: prevState.numberofAnswerdQuestion + 1,
      }),
      () => {
        const { questions, currentQuestion, nextQuestion, previousQuestion } =
          this.state;
        this.showQuestions(
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion
        );
      }
    );
  };

  render() {
    const { currentQuestion } = this.state;

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
          <h5>{currentQuestion.question}</h5>
          <main className="answer-containers">
            {/* i added an onclick function */}
            <p className="option" onClick={this.handleAnswerclick}>
              {currentQuestion.answers1}
            </p>
            <p className="option" onClick={this.handleAnswerclick}>
              {currentQuestion.answers2}
            </p>
          </main>
          <main className="answer-containers">
            <p className="option" onClick={this.handleAnswerclick}>
              {currentQuestion.answers3}
            </p>
            <p className="option" onClick={this.handleAnswerclick}>
              {currentQuestion.answers4}
            </p>
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
