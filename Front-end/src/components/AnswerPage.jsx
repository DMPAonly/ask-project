import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";

function AnswerPage(props){

    const [clickGiveComment, setClickGiveComment] = useState(false);
    const [clickShowComment, setClickShowComment] = useState(false);

    function handleGiveComment(){
        setClickGiveComment(!clickGiveComment);
    }

    function handleShowComment(){
        props.handleShowComment(props.id);
        setClickShowComment(!clickShowComment);
    }

    function handleCommentSubmit(comment){
        props.handleCommentSubmit(comment, props.id);
        setClickGiveComment(!clickGiveComment);
    }

    return <div>
            <h2>{props.answer}</h2>
            <p>by {props.a_author}</p>
            {!clickGiveComment ? 
            <div>
                {!clickShowComment ? 
                <div>
                    <button type="button" onClick={handleShowComment}>Show comments</button>
                    <button type="button" onClick={handleGiveComment}>Comment</button>
                </div> : 
                <div>
                    <button type="button" onClick={() => {
                        setClickShowComment(!clickShowComment);
                        console.log(props.comments);
                    }}>cross</button>
                    {props.comments.map((comment, index) => {
                        return<CommentSection 
                        key={index} 
                        comment={comment.feedback} 
                        author={comment.f_author}/>
                    })}
                </div>
                } 
            </div> : 
            <CommentForm handleSubmit={handleCommentSubmit}/>
            }
            <br></br>
    </div>
}

export default AnswerPage;