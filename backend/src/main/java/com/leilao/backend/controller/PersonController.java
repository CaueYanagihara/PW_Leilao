package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.security.authentication.BadCredentialsException;

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
    public ResponseEntity<?> authenticateUser(@RequestBody PersonAuthRequestDTO authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(), authRequest.getPassword()));
            return ResponseEntity.ok(new PersonAuthResponseDTO(
                    authRequest.getEmail(), jwtService.generateToken(authentication.getName())));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário inexistente ou senha inválida");
        }
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<?> passwordResetRequest(@RequestBody PersonAuthRequestDTO personAuthRequestDTO) {
        try {
            personService.passwordResetRequest(personAuthRequestDTO);
            return ResponseEntity.ok("Código de validação enviado para o email.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao solicitar recuperação de senha.");
        }
    }

    @PostMapping("/password-reset-validate")
    public ResponseEntity<?> passwordResetValidate(@RequestBody PasswordResetValidateDTO passwordResetValidateDTO) {
        personService.validatePasswordResetCode(passwordResetValidateDTO);
        return ResponseEntity.ok("Código de validação verificado.");
    }

    @PostMapping("/password-reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetDTO passwordResetDTO) {
        try {
            personService.resetPassword(passwordResetDTO);
            return ResponseEntity.ok("Senha redefinida com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao redefinir senha.");
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Person person) {
        try {
            Person createdPerson = personService.create(person);
            return ResponseEntity.ok(createdPerson);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao registrar usuário!");
        }
    }

    @PutMapping
    public Person update(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
