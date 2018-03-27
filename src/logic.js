const GRID_SIZE = 8;

const DIRECTIONS = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 }
];

export const STARTING_PIECES = {
  "3,3": "white",
  "3,4": "black",
  "4,4": "white",
  "4,3": "black"
};

export const BOARD = new Array(GRID_SIZE).fill(new Array(GRID_SIZE).fill(""));

export function count(pieces, color) {
  return Object.keys(pieces).reduce(
    (prev, next) => (pieces[next] === color ? prev + 1 : prev),
    0
  );
}

export function isValidMove(pieces, { x, y }) {
  if (pieces[`${x},${y}`]) {
    return false;
  }

  return DIRECTIONS.some(dir => pieces[`${dir.x + x},${dir.y + y}`]);
}

function computeFlipsForDirection({ x: xd, y: yd }, pieces, current, color) {
  const flips = [];

  let x = xd,
    y = yd;

  const next = () => {
    const nextColor = pieces[`${x + current.x},${y + current.y}`];

    return (
      nextColor && {
        x: x + current.x,
        y: y + current.y,
        color: nextColor
      }
    );
  };

  while (next()) {
    const square = next();

    if (square.color === color) {
      return flips;
    }

    flips.push(next());
    x = x + xd;
    y = y + yd;
  }

  return [];
}

export function computeFlips(pieces, { x, y }, color) {
  return Array.prototype.concat(
    ...DIRECTIONS.map(dir =>
      computeFlipsForDirection(dir, pieces, { x, y }, color)
    )
  );
}

export function computeWinner(pieces) {
  if (Object.keys(pieces).length < GRID_SIZE * GRID_SIZE) {
    // no winner
    return null;
  }

  const blackCount = count(pieces, "black");
  const whiteCount = count(pieces, "white");

  return blackCount > whiteCount
    ? "black"
    : whiteCount > blackCount ? "white" : "Nobody. Its a tie.";
}
