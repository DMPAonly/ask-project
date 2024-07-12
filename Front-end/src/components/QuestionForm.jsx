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

    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="query">Write your question:</label>
            <textarea id="query" rows="2" cols="20" onChange={handleChange} name="question" value={query}></textarea>
            <button type="submit">Submit Query</button>
        </form>
    </div>
}

export default QuestionForm;