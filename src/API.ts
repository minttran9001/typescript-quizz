import { shuffleArray } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  userAnswer: string;
};

export type QuestionState = Question & { answers: string[] };
export type CategoryState = {
  id:number;
  name : string;
}
export const fetchQuizQuestion = async (
  amount: number,
  difficulty: Difficulty,
  categoryId : number,
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=${categoryId}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => {
    return {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });
};
export const fetchCategoryList = async () => {
  const endpoint = "https://opentdb.com/api_category.php";
  const category = await (await fetch(endpoint)).json();
  return category.trivia_categories;
};
