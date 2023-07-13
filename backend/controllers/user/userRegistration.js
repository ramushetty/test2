const express = require('express')
const userRegistrationRouter = express.Router()
const {pool} = require('../../database')


userRegistrationRouter.post("/users", (req,res) => {
    console.log(req.body)
    const {name, email,password  } = req.body
    console.log(name)
    // res.send("200")
    const insertUserQuery = `
    INSERT INTO users (username, password, email,role_id)
    VALUES ($1, $2, $3, $4);
  `;

  const values = [name, password, email,1];

  pool.query(insertUserQuery, values)
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((err) => {
      console.error('Error creating user', err);
      res.status(500).json({ message: 'Error creating user' });
    });
});


module.exports = { userRegistrationRouter }