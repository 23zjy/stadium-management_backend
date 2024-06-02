package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Operation {
    private int operation_id;
    private int user_id;
    private String operation_start;
    private String operation_end;
    private int venue_id;
}
