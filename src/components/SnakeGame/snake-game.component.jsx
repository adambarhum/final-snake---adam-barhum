import React from 'react'// utility functions
function shallowEquals(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  let equals = true;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) equals = false;
  }
  return equals;
}

function arrayDiff(arr1, arr2) {
  return arr1.map((a, i) => {
    return a - arr2[i]
  })
}

// display a single cell
function GridCell(props) {
  const classes = `grid-cell 
${props.foodCell ? "grid-cell--food" : ""} 
${props.snakeCell ? "grid-cell--snake" : ""}
`;
  return (
    <div
      className={classes}
      style={{ height: props.size + "px", width: props.size + "px" }}
    />
  );
}

// the main view
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      food: [],
      // 0 = not started, 1 = in progress, 2= finished
      status: 0,
      // using keycodes to indicate direction
      direction: 39,
      time: 0
    };

    this.moveFood = this.moveFood.bind(this);
    this.tickTimer = this.tickTimer.bind(this);
    this.checkIfAteFood = this.checkIfAteFood.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.doesntOverlap = this.doesntOverlap.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.removeTimers = this.removeTimers.bind(this);
  }
  // randomly place snake food
  moveFood() {
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
    const x = parseInt(Math.random() * this.numCells);
    const y = parseInt(Math.random() * this.numCells);
    this.setState({ food: [x, y] });
    this.moveFoodTimeout = setTimeout(this.moveFood, 5000)
  }

  setDirection({ keyCode }) {
    console.log(typeof keyCode)
    // if it's the same direction or simply reversing, ignore
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {

      let changeDirection = true;
      [[38, 40], [37, 39]].forEach(dir => {
        if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
          changeDirection = false;
        }
      });

      if (changeDirection) this.setState({ direction: keyCode });
    }
  }

  moveSnake() {
    const newSnake = [];
    // set in the new "head" of the snake
    switch (this.state.direction) {
      // down
      case 40:
        newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
        break;
      // up
      case 38:
        newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
        break;
      // right
      case 39:
        newSnake[0] = [this.state.snake[0][0] + 1, this.state.snake[0][1]];
        break;
      // left
      case 37:
        newSnake[0] = [this.state.snake[0][0] - 1, this.state.snake[0][1]];
        break;
    }
    // now shift each "body" segment to the previous segment's position
    [].push.apply(
      newSnake,
      this.state.snake.slice(1).map((s, i) => {
        // since we're starting from the second item in the list,
        // just use the index, which will refer to the previous item
        // in the original list
        return this.state.snake[i];
      })
    );

    this.setState({ snake: newSnake });

    this.checkIfAteFood(newSnake);
    if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
      // end the game
      this.endGame()
    }
  }

  checkIfAteFood(newSnake) {
    if (!shallowEquals(newSnake[0], this.state.food)) return
    // snake gets longer
    let newSnakeSegment;
    const lastSegment = newSnake[newSnake.length - 1];

    // where should we position the new snake segment?
    // here are some potential positions, we can choose the best looking one
    let lastPositionOptions = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    // the snake is moving along the y-axis, so try that instead
    if (newSnake.length > 1) {
      lastPositionOptions[0] = arrayDiff(lastSegment, newSnake[newSnake.length - 2]);
    }

    for (var i = 0; i < lastPositionOptions.length; i++) {
      newSnakeSegment = [
        lastSegment[0] + lastPositionOptions[i][0],
        lastSegment[1] + lastPositionOptions[i][1]
      ];
      if (this.isValid(newSnakeSegment)) {
        break;
      }
    }

    this.setState({
      snake: newSnake.concat([newSnakeSegment]),
      food: []
    });
    this.moveFood();
  }

  // is the cell's position inside the grid?
  isValid(cell) {
    return (
      cell[0] > -1 &&
      cell[1] > -1 &&
      cell[0] < this.numCells &&
      cell[1] < this.numCells
    );
  }

  doesntOverlap(snake) {
    return (
      snake.slice(1).filter(c => {
        return shallowEquals(snake[0], c);
      }).length === 0
    );
  }

  tickTimer() {
    let newTime = this.state.time + 1
    this.setState({ time: newTime })
  }

  startGame() {
    this.removeTimers();
    // this.setState({ time: 0 })
    if (this.timeInterval) clearInterval(this.timeInterval)
    this.moveSnakeInterval = setInterval(this.moveSnake, 130);
    this.timeInterval = setInterval(this.tickTimer, 1000);
    this.moveFood();

    this.setState({
      status: 1,
      snake: [[5, 5]],
      food: [10, 10]
    });
    //need to focus so keydown listener will work!
    this.el.focus();
  }

  endGame() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    this.removeTimers();
    this.setState({
      status: 2
    })
  }

  removeTimers() {
    if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)

  }

  componentWillUnmount() {
    this.removeTimers();
  }

  getStringTime = () => {
    let { time } = this.state
    let min = Math.floor(time / 60).toString()
    let sec = (time - (min * 60)).toString()
    min = min.length === 1 ? ("0" + min) : min
    sec = sec.length === 1 ? ("0" + sec) : sec
    return (min + ":" + sec)
  }

  render() {
    // each cell should be approximately 15px wide, so calculate how many we need
    this.numCells = Math.floor(this.props.size / 15);
    const cellSize = this.props.size / this.numCells;
    const cellIndexes = Array.from(Array(this.numCells).keys());
    const cells = cellIndexes.map(y => {
      return cellIndexes.map(x => {
        const foodCell = this.state.food[0] === x && this.state.food[1] === y;
        let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
        snakeCell = snakeCell.length && snakeCell[0];

        return (
          <GridCell
            foodCell={foodCell}
            snakeCell={snakeCell}
            size={cellSize}
            key={x + " " + y}
          />
        );
      });
    });

    let overlay;
    if (this.state.status === 0) {
      overlay = (
        <div className="snake-app__overlay">
          <button onClick={this.startGame}>Start game!</button>
        </div>
      );
    } else if (this.state.status === 2) {
      overlay = (
        <div className="snake-app__overlay">
          <div className="mb-1"><b>GAME OVER!</b></div>
          <div className="mb-1">Your score: {this.state.snake.length} </div>
          <button onClick={this.startGame}>Start a new game</button>
        </div>
      );
    }
    return (
      <>
        <div
          className="snake-app"
          onKeyDown={this.setDirection}
          style={{
            width: this.props.size + "px",
            height: this.props.size + "px"
          }}
          ref={el => (this.el = el)}
          tabIndex={-1}
        >
          {overlay}
          <div
            className="grid"
            style={{
              width: this.props.size + "px",
              height: this.props.size + "px"
            }}
          >
            {cells}
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex">
            <button className="btn btn-primary mx-auto py-3 px-5">
              <h3 className="font-weight-bold mb-0"> {this.getStringTime()}</h3>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default () => <App size={400} />