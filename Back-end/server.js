import express from "express";
import bodyParser from "body-parser"; 
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database : process.env.PG_DATABASE,
    password : process.env.PG_PASSWORD,
    port : process.env.PG_PORT    
});

db.connect();

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/signIn", async(req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        console.log(username);
        const data = await db.query("SELECT password FROM accounts WHERE username = $1", [username]);
        console.log(data.rows[0]);
        if(data.rows[0] === undefined){
            res.sendStatus(404);
        } else{
            if(password == data.rows[0].password){
                res.send(true);
            } else{
                res.send(false);
            }
        }
    } catch(error){
        console.error(error);
    }
});

app.post("/signUp", async(req, res) => {
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        console.log('email:'+email+'username:'+username+'password:'+password);
        if(username === '' || email === '' || password === ''){
            throw "Enter all fields";
        } else{
            const data = await db.query("SELECT * FROM accounts WHERE username = $1", [username]);
            if(data.rows.length === 0){
                const data = await db.query("SELECT * FROM accounts WHERE email = $1", [email]);
                if(data.rows.length === 0){
                    const data = await db.query("INSERT INTO accounts (email, username, password) VALUES($1, $2, $3)", [email, username, password]);
                    res.send(true); 
                } else{
                    res.send("Email already in use.");
                }
            } else{
                res.send("Username is already taken.");
            }
        }
    } catch(error){
        console.error(error);
        res.send(error);
    }
})

app.get("/", async(req, res) => {
    try{
        const data = await db.query("SELECT * FROM questions");
        res.send(data.rows);
    } catch(error){
        console.error(error);
        res.sendStatus(404);
    }
});

app.post("/ask", async(req, res) => {
    try{
        console.log(req.body);
        console.log(req.body.question);
        console.log(req.body.user);
        const data = await db.query("INSERT INTO questions (question, author) VALUES ($1, $2) RETURNING question_id, question, author", [req.body.question, req.body.user]);
        res.send(data.rows);
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

app.get("/ask/:id", async(req, res) => {
    try{
        const id = parseInt(req.params.id);
        const data = await db.query("SELECT question, questions.author AS q_author, answer, answers.author AS a_author, answer_id FROM questions INNER JOIN answers on questions.question_id = answers.question_id WHERE questions.question_id = $1;", [id]);
        res.send(data.rows);
    } catch(error){
        console.error(error);
        res.sendStatus(404);
    }
    
});

app.post("/answer/:id", async(req, res) => {
    try{
        const id = parseInt(req.params.id);
        console.log(id);
        const data = await db.query("SELECT question_id FROM questions WHERE author = $1", [req.body.user]);
        if(data.rows.length > 0){
            const result = data.rows.question_id.findIndex(id);
            if(result === -1){
                try{
                    const data1 = await db.query("INSERT INTO answers (answer, author, question_id) VALUES ($1, $2, $3) RETURNING answer", [req.body.answer, req.body.user, id]);
                    res.send(data1.rows);
                } catch(error){
                    res.send("You have already answered this question.");
                }
            } else{
                res.send("Sorry, You cannot answer your own question.");
            }
        }
    } catch(error){
        console.error(error);
    }
});

app.get("/comment/:id", async(req, res) => {
    try{
        const id = parseInt(req.params.id);
        const data = await db.query("SELECT answer, answers.author AS a_author, feedback, feedback.author AS f_author FROM answers INNER JOIN feedback ON answers.answer_id = feedback.answer_id WHERE answers.answer_id = $1", [id]);
        res.send(data.rows);
    } catch(error){
        console.error(error);
        res.sendStatus(404);
    }
});

app.post("/comment/:id", async(req, res) => {
    try{
        const id = parseInt(req.params.id);
        console.log(id);
        await db.query("INSERT INTO feedback (feedback, author, answer_id) VALUES ($1, $2, $3)", [req.body.comment, req.body.user, id]);
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});