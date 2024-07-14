import React, { useState } from "react";

function QuestionForm(props){

    const [query, setQuery] = useState("");

    function handleChange(event){
        setQuery(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.addPost(query);
        setQuery("");
        console.log(query);
    }

    return <div className="home-page-container">
        <form className="question-form" onSubmit={handleSubmit}>
            <label htmlFor="query">Write your question:</label>
            <br></br>
            <br></br>
            <textarea id="query" onChange={handleChange} name="question" value={query} placeholder="Type your question here...."></textarea>
            <button type="submit">+</button>
        </form>
    </div>
}

export default QuestionForm;