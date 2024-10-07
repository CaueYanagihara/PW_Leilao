package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.model.Person;
import com.leilao.backend.services.PersonService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/person")
public class PersonController {
    @Autowired
    private PersonService personService;

    @PostMapping
    public Person create(@Valid @RequestBody Person person) {
        return personService.create(person);
    }

    @PutMapping
    public Person edit(@RequestBody Person person) {
        return personService.create(person);
    }
}
