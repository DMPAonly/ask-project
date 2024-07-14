import React from "react";
import Post from "./Post";
import axios from "axios";
import { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import AccountForm from "./AccountForm";
import AnswerPage from "./AnswerPage";
import HeaderQuestion from "./HeaderQuestion";
import Footer from "./Footer";
import HeadBar from "./HeadBar";

function App(){
    const API_URL = "http://localhost:3000";

    const [posts, setPosts] = useState([]);
    const [answerResponse, setAnswerResponse] = useState([]);
    const [commentResponse, setCommnetResponse] = useState([]);
    const [sign, setSign] = useState(false);
    const [user, setUser] = useState("");
    const [clickShowAnswer, setClickShowAnswer] = useState(false);

    async function signIn(username, password){
        try{
            const response = await axios.post(`${API_URL}/signIn`, {username, password});
            if(response.data === true){
                console.log(response.data);
                setSign(true);
                setUser(username);
            } else{
                alert("Wrong password");
            }
        } catch(error){
            alert("User does not exist");
        }
    }

    async function signUp(email, username, password){
        try{
            const response = await axios.post(`${API_URL}/signUp`, {email, username, password});
            if(response.data === true){
                console.log(response.data);
                setSign(true);
                setUser(username);
            } else if(response.data === 'Username is already taken.'){
                alert(response.data);
            } else{
                alert(response.data);
            }
        } catch(error){
            alert("Server Internal error");
        }
    }

    async function fetchPosts(){
        try{
            const response = await axios.get(`${API_URL}/`);
            setPosts(response.data);
        } catch(error){
            console.error(error);
            alert("Cannot fetch posts");
        }
    }

    async function addPosts(question){
        try{
            const response = await axios.post(`${API_URL}/ask`, {question, user});
            console.log(question+", "+user);
            setPosts((prevPost) => {
                return [response.data, ...prevPost];
            });
            fetchPosts();
        } catch(error){
            console.error(error);
            alert("cannot add question");
        }
    }

    async function addAnswer(answer, question_id){
        console.log(answer);
        console.log(question_id);
        try{
            const response = await axios.post(`${API_URL}/answer/${question_id}`, {answer, user});
            console.log(response.data);
            if(response.data === "Sorry, You cannot answer your own question."){
                alert(response.data);
            } else{
                if(response.data === "You have already answered this question."){
                    alert(response.data);
                } else{
                    getAnswer(question_id);
                }
            }
        } catch(error){
            console.error(error);
            alert("Cannot add answer");
        }
    }

    async function getAnswer(question_id){
        try{
            const response = await axios.get(`${API_URL}/ask/${question_id}`);
            console.log(response.data);
            if(response.data.length === 0){
                alert("There is no answer for this question currently.");
            } else{
                setAnswerResponse(response.data);
                setClickShowAnswer(true);
            }
        } catch(error){
            console.error(error);
            alert("Cannot fetch answer");
        }
    }

    async function addComment(comment, answer_id){
        try{
            console.log(answer_id+" "+comment+" "+user);
            const response = await axios.post(`${API_URL}/comment/${answer_id}`, {comment, user});
            console.log(response.data);
            await getComment(answer_id);
        } catch(error){
            console.error(error);
            alert("Cannot add comment");
        }
    }

    async function getComment(answer_id){
        try{
            const response = await axios.get(`${API_URL}/comment/${answer_id}`);
        if(response.data.length === 0){
            alert("There are no comments on this answer currently.")
        } else{
            setCommnetResponse(response.data);
            console.log(commentResponse);
        }
        } catch(error){
            console.error(error);
            alert("Cannot fetch comments");
        }
    }

    function handleBack(){
        setClickShowAnswer(false);
    }

    function loggingOut(){
        setSign(false);
        setUser("");
    }

    useEffect(() => {
        fetchPosts();
    }, [sign]);

    return  <div>
                {sign ? 
                <div className="flex-container">
                    <HeadBar user={user} logOut={loggingOut}/>
                    {!clickShowAnswer ? 
                    <div className="home-page">
                        <QuestionForm addPost={addPosts}/>
                        <br></br>
                        <hr></hr>
                        {posts.map((post) => {
                            return <Post 
                            key={post.question_id} 
                            id={post.question_id} 
                            question={post.question} 
                            author={post.author} 
                            handleAnswer={addAnswer} 
                            showAnswer={getAnswer}/>
                        })}
                    </div> : 
                    <div className="answer-page">
                        <button type="button" onClick={handleBack} className="secondary-btn">Back to Home</button>
                        <br></br>
                        <HeaderQuestion header={answerResponse}/>
                        {answerResponse.map((answer)=> {
                            return <AnswerPage 
                            key={answer.answer_id} 
                            id={answer.answer_id} 
                            answer={answer.answer} 
                            a_author={answer.a_author} 
                            handleCommentSubmit={addComment}
                            handleShowComment={getComment}
                            comments={commentResponse}/>
                        })}
                    </div>
                    }
                </div> :
                <AccountForm upSubmit={signUp} inSubmit={signIn}/>
                }
                <Footer />
            </div>
}

export default App;