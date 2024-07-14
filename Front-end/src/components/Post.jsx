import React, { useState } from "react";
import AnswerForm from "./AnswerForm";

function Post(props){

    const [click, setClick] = useState(false);

    function handleClick(){
        setClick(true);
    }

    function handleAnswer(answer){
        props.handleAnswer(answer, props.id);
        setClick(false);
    }

    async function showAnswer(){
        props.showAnswer(props.id);
    }

    function handleCancel(){
        setClick(false);
    }

    return  <div className="home-page-container">
                <h2>{props.question}</h2>
                <p className="author-container">asked by - {props.author}</p>
                {!click ? <div className="button-container">
                <button type="button" onClick={handleClick} className="primary-btn">Answer this question</button>
                <button type="button" onClick={showAnswer} className="primary-btn">Show Answers</button>
                </div>
                : <AnswerForm submitAnswer={handleAnswer} handleCancel={handleCancel}/>}
                <br></br>
                <hr></hr>
            </div>
}

export default Post;