import {useState} from 'react'
export default function LoginSection({Setws, SetLoginName, loginName}){
    let [offSwitch, SetOffSwitch] = useState(false)
    function connect(e){
        e.preventDefault();
        const socket = new WebSocket("ws://localhost:8080/hello");
        Setws(socket);
        //kada offSwitch yra true naudotojas nebegales pakeisti savo vardo
        SetOffSwitch(true);
       
        
    }
    return(
        <>
            <form onSubmit = {connect} className ="login">
                <input
                 type = "text"
                 className = "Username"
                 name = "username"
                 placeholder="Enter your username"
                 disabled = {offSwitch}
                 value = {loginName}
                 onChange = {(e)=>SetLoginName(e.target.value)}
                >
                </input>
                <input type ="submit"
                disabled = {offSwitch}
                value = "Connect"
                className = "loginButton"
                />
            </form>
        </>
    );
}
