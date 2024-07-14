import React from "react";

function HeadBar(props){

    function LogOut(){
        props.logOut();
    }

    return <div className="HeadBar">
        <h2 id="title">Ask_project ?</h2>
        <h2>Welcome {props.user}</h2>
        <button type="button" onClick={LogOut}>Logout</button>
    </div>
}

export default HeadBar;