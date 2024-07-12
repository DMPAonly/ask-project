import React from "react";

function HeaderQuestion(props){

    return <div>
        <h1>{props.header[0].question}</h1>
        <p>by {props.header[0].q_author}</p>
    </div>
}

export default HeaderQuestion;