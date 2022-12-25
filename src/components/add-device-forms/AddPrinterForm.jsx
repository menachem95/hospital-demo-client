import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import { Box, useTheme, Button } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const filter = createFilterOptions();

const printerInfo = {
  address: "כתובת",
  room: "חדר",
  line: "מספר פורט בקיר",
  pag: "PAG",
  description: "תיאור",
};

const printerInfoSelect = {
  department: "מחלקה",
  printerModel: "דגם",
};
const validationSchema = yup.object().shape({});
Object.keys({ ...printerInfo, ...printerInfoSelect }).map(
  (value) => (validationSchema[value] = yup.string())
);

const initialValues = {};
Object.keys(printerInfo).map((value) => (initialValues[value] = ""));

const AddPrinterForm = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const { printers } = useSelector((state) => state.display);
  const [departmentValue, setDepartmentValue] = useState("");
  const [printerModelValue, setPrinterModelValue] = useState("");
  

  

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      const newPrinter = {
        ...value,
        department: departmentValue,
        printerModel: printerModelValue,
      };
      console.log("newPrinter", newPrinter);

      await fetch("http://localhost:8080/add-printer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrinter),
      });

      alert("המדפסת נוספה בהצלחה");

      

    },
  });

  if (!printers || printers.length < 0) {
    return;
  }
  
  
  const departmentsSelect = []
  for (let printer of printers) {
    if (!departmentsSelect.includes(printer.department)) {
      departmentsSelect.push(printer.department);
    }
  }

  const printerModelsSelect = []
  for (let printer of printers) {
    if (!printerModelsSelect.includes(printer.printerModel)) {
      printerModelsSelect.push(printer.printerModel);
    }
  }


  const select = {
    department: [setDepartmentValue, departmentsSelect],
    printerModel: [setPrinterModelValue, printerModelsSelect],
  };

  console.log(departmentsSelect)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        marginTop="30px"
        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="center"
      >
        {Object.keys(printerInfoSelect).map((value) => {
          return (
            <Autocomplete
              id={value}
              name={value}
              key={printerInfoSelect[value]}
              label={printerInfoSelect[value]}
              // value={departmentValue}
              onChange={(event, newValue) => {
                console.log(event.target);
                select[value][0](newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={select[value][1]}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                // if (typeof option === 'string') {
                //   return option;
                // }
                // // Add "xxx" option created dynamically
                // if (option.inputValue) {
                //   return option.inputValue;
                // }
                // // Regular option
                return option;
              }}
              // renderOption={(props, option) => (
              //   <li sx={{ color: "red" }} {...props}>
              //     {option}
              //   </li>
              // )}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={printerInfoSelect[value]}
                  variant="filled"
                  sx={{
                    // gridColumn: "span 4",
                    width: "300px",

                    "& label": {
                      "&.Mui-focused": {
                        color: "secondary.main",
                      },
                    },
                  }}
                />
              )}
            />
          );
        })}
        {Object.keys(printerInfo).map((value) => {
          return (
            <TextField
              variant="filled"
              key={value}
              sx={{
                // gridColumn: "span 4",
                width: "300px",

                "& label": {
                  // marginLeft: "50%",
                  "&.Mui-focused": {
                    color: "secondary.main",
                  },
                },
              }}
              id={value}
              name={value}
              label={printerInfo[value]}
              value={formik.values[value]}
              onChange={formik.handleChange}
              error={formik.touched[value] && Boolean(formik.errors[value])}
              helperText={formik.touched[value] && formik.errors[value]}
            />
          );
        })}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddPrinterForm;
