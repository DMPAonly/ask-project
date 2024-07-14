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

    function handleCancel(){
        props.handleCancel();
    }

    return <div>
        <form className="answer-form" onSubmit={handleSubmit}>
            <label htmlFor="answer">Type your answer: </label>
            <br></br>
            <br></br>
            <textarea id="answer" rows="50" cols="50" name="answer" onChange={changeAnswer} value={answer} placeholder="Type your answer here..."/>
            <br></br>
            <button type="submit" className="primary-btn">Submit Answer</button>
            <button type="reset" onClick={handleCancel} className="primary-btn position-btn">Cancel</button>
        </form></div>
}

export default AnswerForm;