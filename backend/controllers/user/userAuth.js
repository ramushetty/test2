const express = require("express");
const userRouter = express.Router();
const {pool} = require('../../database.js')

userRouter.post('/login', async (req,res) => {

    const { email, password } = req.body;
    try {
      const result = await pool.query(
        'SELECT user_id,username,e_rupee,email FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
      // console.log(result)
      if (result.rowCount === 1) {
        const temp = result.rows[0].user_id
        req.session.userId = temp;
        console.log(req.session.userId)
        res.status(200).json({success: true,
            name: result.rows[0].username,
            email: result.rows[0].email, 
            e_rupee: result.rows[0].e_rupee,     
        });
      } else {
        res.status(401).json({error: 'Invalid username or password'})
      }
    } catch(e) {
      console.log(e)
      res.status(500).json({error: "Database error"})
    }
  
  }); 



userRouter.post('/logout',  (req,res) => {
  req.session.destroy();
  res.status(200).clearCookie('qid', {
    path: '/api'
  }).json({success:true});
});  



  module.exports = { userRouter }