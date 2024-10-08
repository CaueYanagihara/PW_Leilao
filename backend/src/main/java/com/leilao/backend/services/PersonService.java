package com.leilao.backend.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    private EmailService emailService;

    public Person create(Person Person){
        Person personSaved = personRepository.save(Person);
        Context context = new Context();
        context.setVariable("name", personSaved.getName());
        try{
            emailService.sendTemplateEmail(
                personSaved.getEmail(),
                "Cadastro Efetuado com Sucesso",
                context,
                "emailWelcome"
            );
        }catch(MessagingException e){
            e.printStackTrace();
        }

        return personSaved;
    }

    public Person update(Person Person){
        Person savedPerson = personRepository.findById(Person.getId()).orElseThrow(() -> new NoSuchElementException("Person not found"));
        savedPerson.setName(Person.getName());
        savedPerson.setEmail(Person.getEmail());
        return personRepository.save(savedPerson);
    }
    

}
