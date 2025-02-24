package com.myOwnMessanger.MyOwnMessanger.Configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.myOwnMessanger.MyOwnMessanger.Controllers.SocketConnectionHandler;
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer  {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(new SocketConnectionHandler(), "/hello").setAllowedOrigins("*");
    }
}
