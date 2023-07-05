const express = require("express");
const cors = require('cors');
const { createTables } = require('./createTables');
const { pool } = require('./database');

const app = express()
app.use(cors());
app.use(express.json()); 

app.get('/api/data',(req,res)=>{
    const data = {
        message: "Hello, World!",
    };
    res.json(data)
    });


app.post("/api/users", (req,res) => {
    console.log(req.body)
    const {name, email,password ,confirmPassword } = req.body
    console.log(name)
    // res.send("200")
    const insertUserQuery = `
    INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3);
  `;

  const values = [name, password, email];

  pool.query(insertUserQuery, values)
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((err) => {
      console.error('Error creating user', err);
      res.status(500).json({ message: 'Error creating user' });
    });
});    


async function startServer() {
    try {
        await createTables()
        app.listen(5000,()=>{ console.log("server is listening on port 5000")})

    } catch(error) {
        console.error('Error setting up tables and starting server', err);
    }
}

startServer()
