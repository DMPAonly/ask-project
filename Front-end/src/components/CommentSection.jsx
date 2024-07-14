import React from "react";

function CommentSection(props){

    return <div>
        <p>{props.comment}</p>
        <p className="author-container">comment by - {props.author}</p>
        <hr></hr>
    </div>
}

export default CommentSection;