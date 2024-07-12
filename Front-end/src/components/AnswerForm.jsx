import React, { useState } from "react";


function AnswerForm(props){

    const [answer, setAnswer] = useState("");

    function changeAnswer(event){
        setAnswer(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.submitAnswer(answer);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="answer">Type your answer: </label>
            <textarea id="answer" rows="50" cols="50" name="answer" onChange={changeAnswer} value={answer}/>
            <button type="submit">Submit Answer</button>
        </form></div>
}

export default AnswerForm;