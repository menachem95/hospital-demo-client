import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";
import { Box, useTheme,Button, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PrintIcon from "@mui/icons-material/Print";
import ComputerIcon from "@mui/icons-material/Computer";
import Header from "../../components/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import AddPrinterForm from "../../components/add-device-forms/AddPrinterForm";


const checkoutSchema = yup.object().shape({
  address: yup.string().required("required"),
  department: yup.string().required("required"),
  room: yup.string().required("required"),
  line: yup.string().required("required"),
  pag: yup.string().required("required"),
  model: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  address: "",
  department: "",
  room: "",
  line: "",
  pag: "",
  model: "",
  description: ""
};



const AddPrinter = () => {
  const printers = useSelector(staet => staet.Display)
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  
  let departments = ["יולדות", "חדרי ניתוח"];
  for (let printer in printers) {
    debugger
    if (!departments.includes(printer.department)) {
      departments.push(printer.department);
    }
  }
  console.log(departments)
return (
  
  

  <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form 
           onSubmit={handleSubmit}
          >
            <Box
           
              display="grid"
              gap="30px"
             justifyContent={"center"}
              
              
            >
              <Typography
                variant="h2"
                // color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: '0 0 5px 0' }}
            >
                {`הוספת מדפסת`}
            </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="כתובת רשת"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ width: "300px" }}
              />
            
              <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={departments.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="מחלקה" />}
      />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="חדר"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.room}
                name="room"
                error={!!touched.room && !!errors.room}
                helperText={touched.room && errors.room}
                sx={{ width: "300px" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="מספר נקודה בקיר"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.line}
                name="line"
                error={!!touched.line && !!errors.line}
                helperText={touched.line && errors.line}
                sx={{ width: "300px" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type=""
                label="דגם המדפסת"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.model}
                name="model"
                error={!!touched.model && !!errors.model}
                helperText={touched.model && errors.model}
                sx={{ width: "300px" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="תיאור כללי "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ width: "300px" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
  
)
}


const AddDeviceForm = () => {
  const [value, setValue] = React.useState("computer");

  const handleChange = (event, value) => {
    console.log(value);
    setValue(value);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <Box display="grid" margin={"auto"} marginTop={"80px"} width={500}>
        <Box sx={{ width: "100%" }}>
        <Box mb="30px"  textAlign="center" >
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: '0 0 5px 0' }}
            >
                {`הוספת מכשיר`}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {`בחר איזה מכשיר ברצונך להוסיף`}
            </Typography>
            
        </Box>
          <Box
            backgroundColor={colors.primary[400]}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab
                label="מחשב"
                value="computer"
                icon={<ComputerIcon fontSize="large" />}
                sx={{ width: "50%" }}
              />
              <Tab
                label="מדפסת"
                value="printer"
                icon={<PrintIcon fontSize="large" />}
                sx={{ width: "50%" }}
              />
            </Tabs>
            {value === "printer" && <AddPrinterForm />}
            {value === "computer" && <PrintIcon/> }
          </Box>
        </Box>
      </Box>
   
  );
};




// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// const AddDeviceForm = () => {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <>
//       <Box display="grid" margin={"auto"} marginTop={"80px"} width={500}>

//         <Box sx={{ width: "100%" }}>
//           <Box backgroundColor={colors.primary[400]} sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//     textColor="red"
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//             >
//               <Tab label="מחשב" />
//               <Tab label="מדפסת" />
//             </Tabs>
//           </Box>
//           <Box
//               backgroundColor={colors.primary[400]}
//               display="flex"
//               flexDirection={"column"}
//               textAlign="center"
//               alignItems="center"
//               component="form"
//               sx={{
//                 "& > :not(style)": { m: 1, width: "25ch" },
//               }}
//             ><TabPanel value={value} index={0}></TabPanel>
//           <TabPanel value={value} index={1}>

//           </TabPanel>
//               <TextField id="filled-basic" label="Filled" variant="filled" />
//               <TextField id="filled-basic" label="Filled" variant="filled" />
//              {value === 0 && <TextField id="filled-basic" label="Filled" variant="filled" />}
//             <button>subbmit</button>
//             </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

export default AddDeviceForm;
