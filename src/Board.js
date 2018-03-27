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
  background: ${props =>
    props.color ||
    `radial-gradient(rgba(0, 220, 255, ${props.potentialFlips /
      4}), rgba(0,0,0,0))`};

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

export default class Board extends React.Component {
  state = {
    currentPlayer: "white",
    pieces: {
      ...STARTING_PIECES
    },
    showHints: false
  };
  toggleShowHints = event =>
    this.setState(state => ({ showHints: !state.showHints }));
  onClickSlot = (x, y) => event => {
    if (!isValidMove(this.state.pieces, { x, y })) {
      return;
    }

    const flips = computeFlips(
      this.state.pieces,
      { x, y },
      this.state.currentPlayer
    );

    const changes = flips.reduce((prev, next) => {
      prev[`${next.x},${next.y}`] = this.state.currentPlayer;
      return prev;
    }, {});

    this.setState(
      {
        pieces: {
          ...this.state.pieces,
          ...changes,
          [`${x},${y}`]: this.state.currentPlayer
        },
        currentPlayer: this.state.currentPlayer === "white" ? "black" : "white"
      },
      () => {
        const winner = computeWinner(this.state.pieces);
        console.log("WINNER", winner);
        if (winner) {
          this.showGameOver(winner);
        }
      }
    );
  };
  showGameOver = winner => {
    setTimeout(() => {
      alert(`GAME OVER. The winner is ${winner}`);
      window.location.reload();
    }, 2000);
  };
  render() {
    return (
      <BoardWrapper>
        <Scoreboard
          currentPlayer={this.state.currentPlayer}
          pieces={this.state.pieces}
        />
        {BOARD.map((row, x) => (
          <Row key={x}>
            {row.map((val, y) => {
              const color = this.state.pieces[`${x},${y}`];
              return (
                <Cell
                  onClick={this.onClickSlot(x, y)}
                  key={y}
                  color={color}
                  potentialFlips={
                    this.state.showHints &&
                    computeFlips(
                      this.state.pieces,
                      { x, y },
                      this.state.currentPlayer
                    ).length
                  }
                />
              );
            })}
          </Row>
        ))}
        <Settings
          showHints={this.state.showHints}
          toggleShowHints={this.toggleShowHints}
        />
      </BoardWrapper>
    );
  }
}
