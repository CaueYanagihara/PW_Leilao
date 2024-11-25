package com.leilao.backend.model.dto;

import lombok.Data;

@Data
public class PersonAuthRequestDTO {
    private String email;
    private String password;
}
