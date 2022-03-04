import React from "react";
import styled from "styled-components";
import {
  BOARD,
  computeFlips,
  isValidMove,
  STARTING_PIECES,
  computeWinner
} from "./logic";
import Settings from "./Settings";
import Scoreboard from "./Scoreboard";

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Cell = styled.span`
  border: 1px solid black;
  margin: 1px;
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  transition: background-color 300ms ease-in;
  background: ${(props) =>
    props.color ||
    `radial-gradient(rgba(0, 220, 255, ${
      props.potentialFlips / 4
    }), rgba(0,0,0,0))`};

  &:before {
    content: "";
    padding-top: 100%;
    float: left;
  }
`;

const BoardWrapper = styled.div`
  margin: 2vh auto;
  width: 85vw;
  max-width: 700px;
`;

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = React.useState("white");
  const [pieces, setPieces] = React.useState({ ...STARTING_PIECES });
  const [showHints, setShowHints] = React.useState(false);

  const toggleShowHints = (event) => setShowHints(!showHints);

  const showGameOver = (winner) => {
    setTimeout(() => {
      alert(`GAME OVER. The winner is ${winner}`);
      window.location.reload();
    }, 2000);
  };

  React.useEffect(() => {
    const winner = computeWinner(pieces);
    console.log({ winner });
    if (winner) {
      showGameOver(winner);
    }
  }, [pieces]);

  const onClickSlot = (x, y) => (event) => {
    if (!isValidMove(pieces, { x, y })) {
      return;
    }

    const flips = computeFlips(pieces, { x, y }, currentPlayer);

    const changes = flips.reduce((prev, next) => {
      prev[`${next.x},${next.y}`] = currentPlayer;
      return prev;
    }, {});

    setPieces({ ...pieces, ...changes, [`${x},${y}`]: currentPlayer });
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  };

  return (
    <BoardWrapper>
      <Scoreboard currentPlayer={currentPlayer} pieces={pieces} />
      {BOARD.map((row, x) => (
        <Row key={x}>
          {row.map((val, y) => {
            const color = pieces[`${x},${y}`];
            return (
              <Cell
                onClick={onClickSlot(x, y)}
                key={y}
                color={color}
                potentialFlips={
                  showHints &&
                  computeFlips(pieces, { x, y }, currentPlayer).length
                }
              />
            );
          })}
        </Row>
      ))}
      <Settings showHints={showHints} toggleShowHints={toggleShowHints} />
    </BoardWrapper>
  );
}
