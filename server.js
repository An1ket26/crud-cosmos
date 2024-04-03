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


mongoose.connect("mongodb://firstapp:Xbyp3jCh7hVjBsFSytf8GtDZvUfwpcrR2YLvUf0tZflDXfrNnQviX5fPB8NZ9H03j0QAqLo5jvNzACDbfQSBrA==@firstapp.mongo.cosmos.azure.com:10255/Employee?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@firstapp@").then(() => {
    app.listen(5000, (err) => {
        if (!err) {
            console.log("server running at port 5000");
            //   connectdb();
            
        } else {
            console.log(err);
        }
    });
})