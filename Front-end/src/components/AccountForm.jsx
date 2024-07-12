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

    return <div>
    <form onSubmit={handleUpSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" onChange={handleUpChange} name="email" value={upField.email} />
        <label htmlFor="u-username">Username: </label>
        <input type="text" id="u-username" onChange={handleUpChange} name="username" value={upField.username} />
        <label htmlFor="u-password">Password: </label>
        <input type="password" id="u-password" onChange={handleUpChange} name="password" value={upField.password} />
        <button type="submit">SignUp</button>
    </form>
    <form onSubmit={handleInSubmit}>
        <label htmlFor="i-username">Username: </label>
        <input type="text" id="i-username" onChange={handleInChange} name="username" value={inField.username} />
        <label htmlFor="i-password">Password: </label>
        <input type="password" id="i-password" onChange={handleInChange} name="password" value={inField.password} />
        <button type="submit">SignIn</button>
    </form>
    </div>
}

export default AccountForm;