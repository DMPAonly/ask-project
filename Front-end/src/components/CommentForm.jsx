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

    function handleCancel(){
        props.handleCancel();
    }

    return <div className="comment-form">
        <form onSubmit={handleSubmit}>
            <label htmlFor="feedback">Write a comment: </label>
            <textarea id="feedback" onChange={handleChange} placeholder="Type your comment here..."/>
            <button type="submit" className="primary-btn">Post Comment</button>
            <button type="reset" onClick={handleCancel} className="primary-btn position-btn">Cancel</button>
        </form>
    </div>
}

export default CommentForm;