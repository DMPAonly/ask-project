import React, { useState } from "react";
import AnswerForm from "./AnswerForm";

function Post(props){

    const [click, setClick] = useState(false);

    function handleClick(){
        setClick(!click);
    }

    function handleAnswer(answer){
        props.handleAnswer(answer, props.id);
        setClick(!click);
    }

    async function showAnswer(){
        props.showAnswer(props.id);
    }

    return  <div>
                <h2>{props.question}</h2>
                <p>{props.author}</p>
                {!click ? <div>
                <button type="button" onClick={handleClick}>Answer this question</button>
                <button type="button" onClick={showAnswer}>Show Answers</button>
                </div>
                : <AnswerForm submitAnswer={handleAnswer}/>}
            </div>
}

export default Post;