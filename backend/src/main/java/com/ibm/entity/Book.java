package com.ibm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Author is mandatory")
    @Column(nullable = false)
    private String author;

    @NotBlank(message = "Publisher is mandatory")
    @Column(nullable = false)
    private String publisher;

    @NotBlank(message = "ISBN is mandatory")
    @Column(nullable = false, unique = true)
    private String isbn;

    private String category;

    @Column(nullable = false)
    @Positive(message = "Price must be greater than zero")
    private Double price;

    @Column(nullable = false)
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @Column(name = "published_year")
    private Integer publishedYear;
}