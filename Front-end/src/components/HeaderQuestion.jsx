import React from "react";

function HeaderQuestion(props){

    return <div id="header-question">
        <h1>{props.header[0].question}</h1>
        <p className="author-container">asked by - {props.header[0].q_author}</p>
        <hr></hr>
    </div>
}

export default HeaderQuestion;