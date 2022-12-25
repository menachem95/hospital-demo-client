import React from "react";

import { useSelector } from "react-redux";
import classes from "./Select.module.css";

const Input = React.forwardRef((props, ref) => {
  const departments = useSelector((state) => state.Display.departments);
  return (
    <div className={classes.select}>
      <select
        defaultValue={departments[0]}
        ref={ref}
        {...props.input}
        name="מחלקה"
        onChange={props.onChangeSellect}
      >
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <label>מחלקה</label>
    </div>
  );
});

export default Input;

/* */
