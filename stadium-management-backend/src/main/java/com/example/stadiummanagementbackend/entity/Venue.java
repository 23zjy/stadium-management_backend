package com.example.stadiummanagementbackend.entity;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class Venue {
    private int venue_id;
    private String venue_name;
    private String address;
    private int capacity;
    private int[] field_id;
    private String[] field_name;
    private int[] field_price;
    private String[] field_access_time;
    private int[] product_id;
}
