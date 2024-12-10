package com.leilao.backend.service;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.model.Person;
import com.leilao.backend.model.dto.PasswordResetDTO;
import com.leilao.backend.model.dto.PasswordResetValidateDTO;
import com.leilao.backend.model.dto.PersonAuthRequestDTO;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;
import jakarta.persistence.Transient;
import jakarta.validation.ConstraintViolationException;

@Service
public class PersonService implements UserDetailsService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EmailService emailService;

    @Transient
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    public void passwordResetRequest(PersonAuthRequestDTO personAuthRequestDTO) {
        Optional<Person> person = personRepository.findByEmail(personAuthRequestDTO.getEmail());
        if (person.isPresent()) {
            Person personDatabase = person.get();
            int validationCode = (int) (Math.random() * 900000) + 100000; // Gera um código de 6 dígitos
            personDatabase.setValidationCode(validationCode);
            personDatabase.setValidationCodeValidity(new Date(System.currentTimeMillis() + 10 * 60 * 1000)); // 10 minutos de validade
            personRepository.save(personDatabase);

            Context context = new Context();
            context.setVariable("validationCode", validationCode);
            try {
                emailService.sendTemplateEmail(
                        personDatabase.getEmail(),
                        "Código de Validação para Redefinição de Senha",
                        context,
                        "passwordResetCode.html"); // Corrigir o nome do template
                System.out.println("Email enviado com sucesso para: " + personDatabase.getEmail());
            } catch (MessagingException e) {
                e.printStackTrace();
                System.err.println("Erro ao enviar email: " + e.getMessage());
            }
        } else {
            System.err.println("Usuário não encontrado para o email: " + personAuthRequestDTO.getEmail());
        }
    }

    public void validatePasswordResetCode(PasswordResetValidateDTO passwordResetValidateDTO) {
        Optional<Person> person = personRepository.findByEmail(passwordResetValidateDTO.getEmail());
        if (person.isPresent()) {
            Person personDatabase = person.get();
            if (personDatabase.getValidationCode().equals(passwordResetValidateDTO.getValidationCode()) &&
                    personDatabase.getValidationCodeValidity().after(new Date())) {
                // Código válido
            } else {
                throw new IllegalArgumentException("Código de validação inválido ou expirado.");
            }
        } else {
            throw new NoSuchElementException("Usuário não encontrado.");
        }
    }

    public void resetPassword(PasswordResetDTO passwordResetDTO) {
        Optional<Person> person = personRepository.findByEmail(passwordResetDTO.getEmail());
        if (person.isPresent()) {
            Person personDatabase = person.get();
            personDatabase.setPassword(passwordEncoder.encode(passwordResetDTO.getNewPassword()));
            personDatabase.setValidationCode(null);
            personDatabase.setValidationCodeValidity(null);
            personRepository.save(personDatabase);
        } else {
            throw new NoSuchElementException("Usuário não encontrado.");
        }
    }

    public Person create(Person person) {
        if (personRepository.findByEmail(person.getEmail()).isPresent()) {
            throw new ConstraintViolationException("Email já está em uso", null);
        }

        // person.setPassword(passwordEncoder.encode(person.getPassword()));
        Person personSaved = personRepository.save(person);

        Context context = new Context();
        context.setVariable("name", personSaved.getName());
        try {
            emailService.sendTemplateEmail(
                    personSaved.getEmail(),
                    "Cadastro Efetuado com Sucesso",
                    context,
                    "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return personSaved;
    }

    public Person update(Person person) {
        Person personSaved = personRepository.findById(person.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));

        personSaved.setName(person.getName());
        personSaved.setEmail(person.getEmail());

        return personRepository.save(personSaved);
    }

}
