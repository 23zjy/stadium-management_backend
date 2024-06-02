package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Reservation {
    private int reservation_id;
    private int user_id;
    private int member_id;
    private int venue_id;
    private int field_id;
    private String reservation_date;
    private String reservation_time;
    private int total_price;
    private String payment_method;
}
