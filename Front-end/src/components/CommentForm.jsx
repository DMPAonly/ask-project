import React, { useState } from "react";

function CommentForm(props){

    const [comment, setComment] = useState("");

    function handleChange(event){
        setComment(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.handleSubmit(comment);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="feedback">Write a comment: </label>
            <textarea id="feedback" rows="50" cols="100" onChange={handleChange}/>
            <button type="submit">Post Comment</button>
        </form>
    </div>
}

export default CommentForm;