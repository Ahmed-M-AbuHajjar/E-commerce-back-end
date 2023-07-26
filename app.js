import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
const app = express()
import cors from 'cors'

// setup port and the baseUrl
const port = process.env.PORT || 5000
const baseUrl = process.env.BASEURL
//convert Buffer Data
app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use(express.static(path.join(__dirname, 'Client')));
//Setup API Routing 
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/car`, indexRouter.carRouter)
app.use(`${baseUrl}/cart`, indexRouter.cartRouter)
app.use(`${baseUrl}/order`, indexRouter.orderRouter)


app.use('/api/*', (req, res, next) => {
    res.send("In-valid Routing please check url or method")
})
// setting the client side to run on index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// Database initializing
connectDB()
// setting port number the project will run on
app.listen(port, () => console.log(`Ecommerce app listening on port ${port}!`))