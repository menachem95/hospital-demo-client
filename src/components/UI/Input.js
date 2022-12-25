import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <input ref={ref} {...props.input} name={props.name} onChange={props.onChange}/>
      <label >{props.label}</label>
    </div>
  );
});

export default Input;
