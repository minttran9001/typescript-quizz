import styled from "styled-components";
export const Card = styled.div`
  width: 400px;
  color: #fff;
  p {
    font-size: 15px;
    font-weight: bold;
  }
  button {
    background-color: rgba(0, 0, 0, 0.5);

    outline: none;
    cursor: pointer;
    color: #fff;
    margin: 5px 0;
    width: 100%;
    font-size: 20px;
    padding: 10px 0;
    border: 1px solid #fff;
    border-radius: 4px;
  }
  button.selected {
    background-color: black;

    color: #fff;
  }
  button.is-true {
    background-color: #85b664 !important;
  }
  button.user-answer {
    background-color: #733638 !important;
  }
  button.correct-answer {
    background-color: #f1cc8a !important;
  }
  button > span {
    width: 100%;
  }

`;
