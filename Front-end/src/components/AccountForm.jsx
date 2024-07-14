import React, { useState } from "react";

function AccountForm(props){
    
    const [upField, setUp] = useState({email:"", username:"", password:""});
    const [inField, setIn] = useState({username:"", password:""});

    function handleUpChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setUp((preValue) => {
            return {...preValue, [name] : value};
        });
    }

    function handleInChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setIn((preValue) => {
            return {...preValue, [name] : value};
        });
    }

    function handleUpSubmit(event){
        event.preventDefault();
        props.upSubmit(upField.email, upField.username, upField.password);
    }

    function handleInSubmit(event){
        event.preventDefault();
        props.inSubmit(inField.username, inField.password);
    }

    return <div className="accountform">
        <div className="label-class">
    <form onSubmit={handleUpSubmit}>
        <div className="pad-class">
        <h1>Ask_project ?</h1>
        <br></br>
        <h2>SignUp</h2>
        <label htmlFor="email">Email </label>
        <br></br>
        <input type="text" id="email" onChange={handleUpChange} name="email" value={upField.email} />
        </div>
        <br></br>
        <div className="pad-class">
        <label htmlFor="u-username">Username </label>
        <br></br>
        <input type="text" id="u-username" onChange={handleUpChange} name="username" value={upField.username} />
        </div>
        <br></br>
        <div className="pad-class">
        <label htmlFor="u-password">Password </label>
        <br></br>
        <input type="password" id="u-password" onChange={handleUpChange} name="password" value={upField.password} />
        </div>
        <br></br>
        <button type="submit" className="primary-btn">SignUp</button>
    </form>
    <br></br>
    <hr />
    <form onSubmit={handleInSubmit}>
        <div className="pad-class">
        <h2>SignIn</h2>
        <label htmlFor="i-username">Username </label>
        <br></br>
        <input type="text" id="i-username" onChange={handleInChange} name="username" value={inField.username} />
        </div>
        <br></br>
        <div className="pad-class">
        <label htmlFor="i-password">Password </label>
        <br></br>
        <input type="password" id="i-password" onChange={handleInChange} name="password" value={inField.password} />
        </div>
        <br></br>
        <button type="submit" className="primary-btn">SignIn</button>
    </form>
    </div>
    </div>
}

export default AccountForm;