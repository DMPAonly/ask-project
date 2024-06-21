import express from "express";
import bodyParser from "body-parser"; 
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "askproject",
    password : "Iamarationalist",
    port : 5433    
});

db.connect();

app.get("/", async(req, res) => {
    const data = await db.query("SELECT * FROM questions");
    res.send(data.rows);
    console.log(data.rows); 
})

app.post("/ask", async(req, res) => {
    console.log(req.body);
    console.log(req.body.question);
    console.log(req.body.author);
    await db.query("INSERT INTO questions (question, author) VALUES ($1, $2)", [req.body.question, req.body.author]);
});

app.get("/ask/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const data = await db.query("SELECT question, questions.author AS q_author, answer, answers.author AS a_author FROM questions INNER JOIN answers on questions.question_id = answers.question_id WHERE questions.question_id = $1;", [id]);
    res.send(data.rows);
});

app.post("/answer/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    await db.query("INSERT INTO answers (answer, author, question_id) VALUES ($1, $2, $3)", [req.body.answer, req.body.author, id]);
});

app.get("/comment/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const data = await db.query("SELECT answer, answers.author AS a_author, feedback, feedback.author AS f_author FROM answers INNER JOIN feedback ON answers.answer_id = feedback.answer_id WHERE answers.answer_id = $1", [id]);
    res.send(data.rows);
})

app.post("/comment/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    await db.query("INSERT INTO feedback (feedback, author, answer_id) VALUES ($1, $2, $3)", [req.body.feedback, req.body.author, id]);
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});