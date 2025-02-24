import { useState,useEffect,useRef } from "react";

export default  function WriteMessageSection(prop){
   
    const chatAreaRef = useRef(null);

    let [messageText, setMessageText] = useState("");
        function handleSubmit(e){
                e.preventDefault();
                if(prop.getWs == undefined) return;
                const messageObject = {
                    sender: prop.loginName,
                    text: messageText

                }
                prop.getWs.send(JSON.stringify(messageObject));
                addToChatList(messageObject,"sent");
                setMessageText("");
                console.log(messageObject);
                
             
        }

    let [chatList,setChatList] = useState([]);
        const returnChatList = chatList.map((x,index )=>{
            //renderina visas zinutes chatListe
            return<li key = {index} className={x.type}><strong>{x.object.sender}: </strong>{x.object.text}</li>
      
        })
        
    function addToChatList(messageObject, type){
         setChatList (prev=>[...prev,{object:messageObject, type:type}]);
         
    }
   //veikia kada gaunama zinute
    useEffect(() =>{
        if(!prop.getWs) return;
        prop.getWs.onmessage=(event)=>{
            addToChatList(JSON.parse(event.data), "got");
            console.log(JSON.parse(event.data));
            
        };
       //cleanup
        return () => {
         prop.getWs.onmessage = null;
            
        };

    },[prop.getWs]);
   //veikia kiekviena karta kada updatinamas chatList
    useEffect(()=>{
        scrollToBottom();
    },[chatList])

   function scrollToBottom(){
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
return(
    <>
            <div className="chat">

                    
                <form onSubmit = {handleSubmit}>
                <div className = "chatBar">
                <input
                 className = "chatBartextField" 
                 type = "text"
                 placeholder="Write in your message"
                 value = {messageText}
                 onChange={(e) => setMessageText(e.target.value)}
                />
                <input type ="image" src = "/sendIcon.svg" className="chatBarSubmit" />
                </div>
            </form>
            <ul className = "chatArea" ref = {chatAreaRef}>
                        {returnChatList}
            </ul>
            </div>


            
                
    </>
)
}
