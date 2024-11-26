package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.dto.PasswordResetDTO;
import com.leilao.backend.model.dto.PasswordResetValidateDTO;
import com.leilao.backend.model.dto.PersonAuthRequestDTO;
import com.leilao.backend.model.dto.PersonAuthResponseDTO;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;

import jakarta.persistence.Transient;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/person")
@CrossOrigin
public class PersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Transient
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @PostMapping("/login")
    public PersonAuthResponseDTO authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(), authRequest.getPassword()));
        return new PersonAuthResponseDTO(
                authRequest.getEmail(), jwtService.generateToken(authentication.getName()));
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<?> passwordResetRequest(@RequestBody PersonAuthRequestDTO personAuthRequestDTO) {
        personService.passwordCodeRequest(personAuthRequestDTO);
        return ResponseEntity.ok("Código de validação enviado para o email.");
    }

    @PostMapping("/password-reset-validate")
    public ResponseEntity<?> passwordResetValidate(@RequestBody PasswordResetValidateDTO passwordResetValidateDTO) {
        personService.validatePasswordResetCode(passwordResetValidateDTO);
        return ResponseEntity.ok("Código de validação verificado.");
    }

    @PostMapping("/password-reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetDTO passwordResetDTO) {
        personService.resetPassword(passwordResetDTO);
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }

    @PostMapping
    public Person create(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }
}
