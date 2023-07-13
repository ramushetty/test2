const express = require("express");
const cors = require('cors');
const { createTables } = require('./createTables');
const { userRouter } = require('./controllers/user/userAuth.js')
const { userRegistrationRouter } =  require('./controllers/user/userRegistration')
const {initializeRoles} = require('./models/roles')
// const sessionMiddleware = require('./middleware/sessionMiddleware')
const {pool} = require("./database")
const sessions = require('express-session');
const config = require('./config')
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  }));
app.use(express.json()); 

app.use(sessions({
    secret: config.secret, // Secret key for session encryption (change it to your own secret)
    resave: false,
    name: 'qid',
    saveUninitialized: true,
    cookie: {
      secure: false, // Set it to true if using HTTPS
      httpOnly: false,
      maxAge: 3600000, // Session duration (in milliseconds), e.g., 1 hour
      sameSite: "lax",
      path: "/api",
    }
}))

app.use('/api',userRouter);  
app.use('/api',userRegistrationRouter);  

app.get('/api/data',(req,res)=>{
    const data = {
        message: "Hello, World!",
    };
    res.json(data)
    });

app.get('/api/user', async (req,res)=>{
    if (req.session.userId) {
        try {
            const userId = req.session.userId
            console.log(userId, "---------------")
            const result = await pool.query(
              'SELECT username,e_rupee,email FROM users WHERE user_id = $1 ',
              [userId]
            );
            if (result.rowCount === 1) {
    
                // console.log(req.session.userId)
                res.status(200).json({
                    name: result.rows[0].username,
                    email: result.rows[0].email, 
                    e_rupee: result.rows[0].e_rupee,     
                });
              } else {
                res.status(401).json({error: 'Invalid session'})
              }
        } catch(error) {
            console.error('Error fetching user')
        }

    } else {
        // User is not authenticated
        res.status(401).json({ error: 'Unauthorized' });
      }
    
    
    
    });
    

async function startServer() {
    try {
        await createTables()
        await initializeRoles()
        app.listen(5000,()=>{ console.log("server is listening on port 5000")})

    } catch(error) {
        console.error('Error setting up tables and starting server', error);
    }
}

startServer()
