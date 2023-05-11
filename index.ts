const express = require('express')
import * as dotenv from 'dotenv'  
dotenv.config()
const port = process.env.port 
import db from './models'
// import DoctorRouter from './controllers/doctors.routes'
import DoctorRouter from './controllers/doctors.routes'
import CustomerRouter from './controllers/customers.routes'
import cors from 'cors'
import log from './logs'
import connection from './config/db'

const app = express()
app.use(cors())
app.use(express.json());
app.use('/doctors',DoctorRouter)
app.use('/customers',CustomerRouter)

app.get('/',(req: any,res: { send: (arg0: any) => void }) :void =>{
    try {
        res.send({msg:'working fine .....'})
    } catch (error:any) {
        console.log({msg:error.message})
        res.send(error)
    }
})


// db.sequelize.sync().then(()=>{
//     app.listen(process.env.port,()=>{
//         console.log(`App is running on port ${process.env.port}`)
//     })
// })

db.sequelize.sync().then(()=>{
    log.info(`DB ${process.env.DB_Name} has been connected to ${process.env.DB_host}`)
    app.listen(process.env.port,async ()=>{
        await connection.then(()=>log.info(`MongoDB Connected ....`))
        log.info(`App is running on port ${process.env.port}`)
    })
})