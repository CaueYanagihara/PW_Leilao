package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.leilao.backend.model.PersonAuthRequestDTO;
import com.leilao.backend.model.PersonAuthResponseDTO;
import com.leilao.backend.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(), authRequest.getPassword())
        );
        
        return new PersonAuthResponseDTO(
            authRequest.getEmail(), 
            jwtService.generateToken(authentication.getName())
        );
    }
}
