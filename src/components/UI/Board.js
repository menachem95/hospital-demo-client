import classes from "./Board.module.css";

const Board = (props) => {
return <div className={classes.board}>{props.children}</div>
}

export default Board;