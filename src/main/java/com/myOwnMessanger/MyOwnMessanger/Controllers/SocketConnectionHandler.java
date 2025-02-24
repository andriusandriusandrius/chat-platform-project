package com.myOwnMessanger.MyOwnMessanger.Controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SocketConnectionHandler extends TextWebSocketHandler {
    //1 on connection
    //2 after disconnect
    //3 handleMessage

    List<WebSocketSession> webSessions = Collections.synchronizedList(new ArrayList<WebSocketSession>());
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        super.afterConnectionEstablished(session);
        System.out.println("atejo");
        webSessions.add(session);
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        super.afterConnectionClosed(session, status);
        System.out.println("gone");
        webSessions.remove(session);
    }
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
       super.handleTextMessage(session,message);
       ObjectMapper objectMapper = new ObjectMapper();

       try {
        // padarom jsona i objekta(MessageDTO)
        MessageDTO receivedMessage = objectMapper.readValue(message.getPayload(), MessageDTO.class);
        //apdorojimas jeigu reikes

        // konvertuoti objekta i zinute(jsona)
        String jsonResponse = objectMapper.writeValueAsString(receivedMessage);
        TextMessage textMessage = new TextMessage(jsonResponse);

       
        for (WebSocketSession webSession : webSessions) {
            if (webSession == session) {
                continue;
            }
            webSession.sendMessage(textMessage);
        }
    }
        catch(Exception error){
            System.err.println("Error parsing message: " + error.getMessage());
        }


    }
}
class MessageDTO {
    private String text;
    private String sender;

    // Getters and setters
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
}