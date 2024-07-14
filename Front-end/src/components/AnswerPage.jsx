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

    function hideComment(){
        setClickGiveComment(false);
    }

    return <div>
            <p>{props.answer}</p>
            <p className="author-container">Answered by - {props.a_author}</p>
            {!clickGiveComment ? 
            <div>
                {!clickShowComment ? 
                <div>
                    <button type="button" onClick={handleShowComment} className="primary-btn">Show comments</button>
                    <button type="button" onClick={handleGiveComment} className="primary-btn position-btn">Comment</button>
                </div> : 
                <div className="comment-section">
                    <button type="button" className="secondary-btn" onClick={() => {
                        setClickShowComment(!clickShowComment);
                        console.log(props.comments);
                    }}>Close</button>
                    {props.comments.map((comment, index) => {
                        return<CommentSection 
                        key={index} 
                        comment={comment.feedback} 
                        author={comment.f_author}/>
                    })}
                </div>
                } 
            </div> : 
            <CommentForm handleSubmit={handleCommentSubmit} handleCancel={hideComment}/>
            }
            <br></br>
            <hr></hr>
    </div>
}

export default AnswerPage;