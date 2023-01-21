import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { GiChoice } from "react-icons/gi";
import { GiLightBulb } from "react-icons/gi";
import { BsClock } from "react-icons/bs";
import questions from "../../questions.json";
import isEmpty from "../../utils/isEmpty";
import M from "materialize-css";
import successSound from "../../assest/audio/victory.mp3";
import failSound from "../../assest/audio/fail.mp3";
import clickSound from "../../assest/audio/click.wav";

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
      previousRandomnumbers: [],
      usedFiftyfifty: false,
      time: {},
    };
    this.interval = null;
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
    this.starttimer();
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

      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          previousRandomnumbers: [],
          numberofQuestion: questions.length,
          answer,
        },
        () => {
          this.reshowAnswers();
        }
      );
    }
  };

  handleAnswerclick = (e) => {
    //this if statement checks to see if the text content of the selected option is equation to the answer
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
      setTimeout(() => {
        document.getElementById("success").play();
      }, 200);
    } else {
      this.WrongAnswer();
      setTimeout(() => {
        document.getElementById("fail").play();
      }, 200);
    }
  };

  handlebtnclick = (e) => {
    switch (e.target.id) {
      case "next":
        this.handleNextBtnClick();
        break;
      case "prev":
        this.handlePrevBtnClick();
        break;
      case "quit":
        this.handleQuitBtnClick();

      default:
        break;
    }
    this.playbtnsound();
  };

  //btn click function
  playbtnsound = () => {
    document.getElementById("click").play();
  };

  handleNextBtnClick = () => {
    //this is a function that does two thing
    // first it checks if the nextquestion is undefined ie to check at the beginning or thst there is a next question
    // then it run a change of state (this state has a callback function)
    //the state changes by incrementing the currentquestionindex
    //the callback function is to display the questions
    //so i called the showquestion function
    if (this.state.nextQuestion != undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.showQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  handlePrevBtnClick = () => {
    //this is a function that does two thing
    // first it checks if the prevquestion is undefined ie to check at the end or thst there is a prev question
    // then it run a change of state (this state has a callback function)
    //the state changes by incrementing the currentquestionindex
    //the callback function is to display the questions
    //so i called the showquestion function
    if (this.state.previousQuestion != undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.showQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitBtnClick = () => {
    if (window.confirm("Are Sure You Want To QUIT")) {
      this.props.history.push("/");
    }
  };

  //this is the function for handling hints
  handleHint = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));

      let indexOfanswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfanswer = index;
        }
      });
      while (true) {
        const randomNumber = Math.floor(Math.random() * 3);
        if (
          randomNumber !== indexOfanswer &&
          !this.state.previousRandomnumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomnumbers:
                  prevState.previousRandomnumbers.concat(randomNumber),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomnumbers.length >= 3) break;
      }
    }
  };

  //this function is to show the option after the hints
  reshowAnswers = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyfifty: false,
    });
  };

  //this is the function for the fifty-fifty function

  handlefiftyfifty = () => {
    if (this.state.fiftyFity > 0 && this.state.usedFiftyfifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfanswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfanswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.floor(Math.random() * 3);
        if (randomNumber !== indexOfanswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfanswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newrandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newrandomNumber) &&
                !randomNumbers.includes(indexOfanswer)
              ) {
                randomNumbers.push(newrandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFity: prevState.fiftyFity - 1,
        usedFiftyfifty: true,
      }));
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

  starttimer = () => {
    const CountdownTime = Date.now() + 30000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = CountdownTime - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            alert("otilo my Answerring scholar");
            this.props.history.push("/");
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };
  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberofQuestion,
      hints,
      fiftyFity,
      time,
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Quiz page</title>
        </Helmet>
        <>
          <audio src={successSound} id="success"></audio>
          <audio src={failSound} id="fail"></audio>
          <audio src={clickSound} id="click"></audio>
        </>
        <section className="question">
          <h2>FREE QUIZ MODE</h2>
          <div className="lifeline-container">
            <p>
              <span className="lifeline-icon" onClick={this.handlefiftyfifty}>
                <GiChoice />
              </span>
              <span className="lifeline">{fiftyFity}</span>
            </p>
            <p>
              <span onClick={this.handleHint}>
                <GiLightBulb className="lifeline-icon" />
              </span>
              <span className="lifeline">{hints}</span>
            </p>
          </div>
          <div className="lifeline-container">
            <span>
              {currentQuestionIndex + 1} of {numberofQuestion}
            </span>
            <span>
              <BsClock />
              <span className="lifeline">
                {time.minutes}:{time.seconds}
              </span>
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
            <button id="prev" onClick={this.handlebtnclick}>
              Previous
            </button>
            <button id="next" onClick={this.handlebtnclick}>
              Next
            </button>
            <button id="quit" onClick={this.handlebtnclick}>
              Quiz
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default Play;
