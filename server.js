const express = require("express");
const mongoose = require("mongoose")
const EmpController = require("./controller/empLogic")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/getemp", EmpController.getEmployee)
app.use("/addemp", EmpController.addEmployee)
app.use("/deleteemp", EmpController.deleteEmployee)
app.use("/updateemp",EmpController.updateEmployee)


mongoose.connect("connection string").then(() => {
    app.listen(5000, (err) => {
        if (!err) {
            console.log("server running at port 5000");
            //   connectdb();
            
        } else {
            console.log(err);
        }
    });
})
