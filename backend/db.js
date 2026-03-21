const mongoose = require('mongoose')

mongoose.connect(process.env.connectionString)
    .then(()=>{
        console.log("DB is Connected");
    })
    .catch((err)=>console.log(err)
    )