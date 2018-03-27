import React from "react";
import styled from "styled-components";
import { count } from "./logic";

const Scoreboard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 300ms ease-in;
  color: ${props => props.color};
`;

export default ({ currentPlayer, pieces }) => (
  <Scoreboard color={currentPlayer}>
    <h1>Current Player: {currentPlayer}</h1>
    <h3>Black: {count(pieces, "black")}</h3>
    <h3>White: {count(pieces, "white")}</h3>
  </Scoreboard>
);
