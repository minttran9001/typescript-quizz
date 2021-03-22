import React from "react";
import { Card } from "./QuestionCard.styled";
type Props = {
  question: string;
  answers: string[];
  callback: (answer: string) => void;
  userAnswer: string;
  questionNr: number;
  totalQuestion: number;
  correctAnswer: string;
  isCheckAns: boolean;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  questionNr,
  userAnswer,
  correctAnswer,
  totalQuestion,
  isCheckAns,
}) => {
  const [selected, setSelected] = React.useState(-1);
  React.useEffect(() => {
    setSelected(-1);
  }, [question]);
  return (
    <Card className="question-card">
      <p>
        Question : {questionNr} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {isCheckAns
          ? answers.map((answer, index) => (
              <div key={answer}>
                <button
                  className={
                    correctAnswer === userAnswer && answer === userAnswer
                      ? "correct-answer"
                      : answer === correctAnswer
                      ? "is-true"
                      : answer === userAnswer
                      ? "user-answer"
                      : ""
                  }
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            ))
          : answers.map((answer, index) => (
              <div key={answer}>
                <button
                  className={selected === index ? "selected" : ""}
                  onClick={() => {
                    setSelected(index);
                    callback(answer);
                  }}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            ))}
      </div>
    </Card>
  );
};
export default QuestionCard;
