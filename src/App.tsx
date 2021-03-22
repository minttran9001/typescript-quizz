import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import {
  QuestionState,
  Difficulty,
  CategoryState,
  fetchQuizQuestion,
  fetchCategoryList,
} from "./API";
import { GlobalStyle, Wrapper } from "./App.styled";
const TOTAL_QUESTION = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("stop");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [isCheckAns, setIsCheckAns] = useState(false);
  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [categoryId, setCategoryId] = useState(9);
  const [timer, setTimer] = useState(0);
  React.useEffect(() => {
    fetchCategoryList().then((categories) => {
      setCategories(categories);
    });
  }, []);
  React.useEffect(() => {
    const i = setInterval(() => {
      setTimer((pre) => pre - 1000);
    }, 1000);
    if (timer === 0) {
      setGameState("stop");
      clearInterval(i);
    }
    return () => clearInterval(i);
  }, [timer]);

  const startTrivia = async () => {
    setLoading(true);
    setIsCheckAns(false);
    setGameState("playing");
    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTION,
      difficulty,
      categoryId
    );
    setTimer(50000);
    setScore(0);
    setQuestions(newQuestions);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (answer: string) => {
    setAnswer(answer);
  };
  const check = () => {
    setIsCheckAns(true);
    setGameState("playing");
    setNumber(0);
  };
  const stopTheGame = () => {
    setGameState("stop");
  };
  const nextQuestion = () => {
    if (gameState === "playing" && !isCheckAns) {
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((pre) => pre + 1);
      }
      const newArr = questions;
      newArr[number].userAnswer = answer;
      setQuestions(newArr);
    }
    setNumber((prev) => prev + 1);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>Typescript Quizz</h1>
        <h3>
          Time : {timer / 1000} <span style={{ fontSize: 10 }}>s</span>
        </h3>
        {gameState === "stop" ? <p className="score">Score : {score}</p> : ""}

        {!loading && gameState === "stop" && (
          <>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategoryId(Number(e.target.value))
              }
              name=""
              id=""
            >
              {categories.map((item, index) => {
                return (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="difficulty-wrapper">
              <button
                className={
                  difficulty === Difficulty.EASY
                    ? "difficulty"
                    : "difficulty selected"
                }
                onClick={() => setDifficulty(Difficulty.EASY)}
              >
                Easy
              </button>
              <button
                className={
                  difficulty === Difficulty.MEDIUM
                    ? "difficulty"
                    : "difficulty selected"
                }
                onClick={() => setDifficulty(Difficulty.MEDIUM)}
              >
                Medium
              </button>
              <button
                className={
                  difficulty === Difficulty.HARD
                    ? "difficulty"
                    : "difficulty selected"
                }
                onClick={() => setDifficulty(Difficulty.HARD)}
              >
                Hard
              </button>
            </div>
          </>
        )}
        {gameState === "stop" ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <button className="start" onClick={startTrivia}>
              Start
            </button>
            <button className="start" onClick={() => check()}>
              Check answers
            </button>
          </div>
        ) : (
          ""
        )}

        {loading && <p>Loading questions</p>}
        {!loading && gameState === "playing" && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTION}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={questions[number].userAnswer}
            correctAnswer={questions[number].correct_answer}
            callback={checkAnswer}
            isCheckAns={isCheckAns}
          />
        )}

        <div className="button-group">
          {!loading &&
          gameState === "playing" &&
          number < TOTAL_QUESTION - 1 ? (
            <>
              <button onClick={stopTheGame} className="next">
                Stop
              </button>
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            </>
          ) : (
            !loading &&
            questions.length > 0 &&
            gameState !== "stop" && (
              <>
                <button onClick={stopTheGame} className="next">
                  Stop
                </button>
                <button
                  className="finish"
                  onClick={() => {
                    setIsCheckAns(false);
                    setGameState("stop");
                    nextQuestion();
                  }}
                >
                  Finish
                </button>
              </>
            )
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default App;
