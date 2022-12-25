import { Fragment } from "react";

const EnteringPassword = () => {

  const checkValidation = (eve) =>{
    console.log(eve.target.value)
  }

  return (
    <Fragment>
      <form action="http://localhost:8080/admin" method="POST">
        <h1>כניסה להגדרות</h1>
        <h2>הכנס סיסמא</h2>
        <button type="submit">אישור</button>
        <input type="new-password"  onChange={checkValidation}/>
      </form>
    </Fragment>
  );
};

export default EnteringPassword;
