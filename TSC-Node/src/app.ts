import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

class App {
    public express: express.Application

    constructor () {
      this.express = express()

      this.middleware()
      this.routes()
      this.database()
    }

    private middleware (): void {
      this.express.use(express.json())
      this.express.use(cors())
    }

    private database ():void {
      mongoose.connect('mongodb://localhost:27017')
    }

    private routes ():void {
      this.express.get('/', (req, res) => {
        return res.send('test')
      })
    }
}

export default new App().express
