const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const corsOptions= {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

const db = require('./app/models')
const Role = db.role

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connect to MongoDB.")
  initial()
}).catch((err) => {
  console.error("Connection error ",err)
  process.exit()
})

function initial() {
  const nameRole = db.ROLES 
  Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
      saveRole(nameRole);
    }
  })
}

function saveRole(name) {
  for(let i = 0; i < name.length; i++) {
    new Role({
      name: `${name[i]}`
    }).save((err) => {
      if(err) {
        console.log("error", err)
      }
      console.log(`added '${name[i]}' to roles collection`)
    })
  }
}

app.get("/", (req,res) => {
  res.json({message: "Wellcome to my api"})
})

const PORT = process.env.PORT||5500
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})