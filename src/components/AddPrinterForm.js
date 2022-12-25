import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./UI/Model";
import { addPrinter, changeModalStatus } from "../store/displayPrintersSlice";
import Board from "./UI/Board";
import Input from "./UI/Input";
import Select from "./UI/Select";

const AddPrinterForm = () => {
  const departments = useSelector((state) => state.Display.departments);
  // const [department, setDepartment] = useState(departments[0])
  let department = departments[0];
  const dispatch = useDispatch();
  const [newPrinter, setNewPrinter] = useState({
    room: "",
    address: "",
    line: "",
    pag: "",
    department: departments[0],
    online: false,
  });

  const roomInputRef = useRef();
  const addressInputRef = useRef();
  const lineInputRef = useRef();
  const pagInputRef = useRef();

  const defaultRefs = () => {
    roomInputRef.current.value = "";
    addressInputRef.current.value = "";
    lineInputRef.current.value = "";
    pagInputRef.current.value = "";
  };

  const fromInputs = [
    { label: "חדר", name: "room", ref: roomInputRef },
    { label: "IP כתובת", name: "address", ref: addressInputRef },
    { label: "מספר נקודה", name: "line", ref: lineInputRef },
    { label: "PAG מספר", name: "pag", ref: pagInputRef },
  ];

  const onChangeHandler = (event) => {
    setNewPrinter({
      ...newPrinter,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(addPrinter(newPrinter));
    defaultRefs();
    console.log(newPrinter);
  };

  const onCancelHandler = () => {
    dispatch(changeModalStatus());
  };

  const onChangeSellectHandler = (event) => {
    setNewPrinter({...newPrinter, department: event.target.value})
  };

  return (
    <Modal>
      <Board>
        <form onSubmit={onSubmitHandler}>
          <h1>הוספת מדפסת</h1>
          <Select onChangeSellect={onChangeSellectHandler} />
          {fromInputs.map((input) => (
            <Input
              key={input.name}
              ref={input.ref}
              label={input.label}
              name={input.name}
              onChange={onChangeHandler}
              value=""
            />
          ))}

          <button>אישור</button>
          <button onClick={onCancelHandler}>ביטול</button>
        </form>
      </Board>
    </Modal>
  );
};

export default AddPrinterForm;
