import React from "react";

function CommentSection(props){

    return <div>
        <h3>{props.comment}</h3>
        <p>by {props.author}</p>
    </div>
}

export default CommentSection;