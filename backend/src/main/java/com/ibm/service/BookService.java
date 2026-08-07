package com.ibm.service;

import com.ibm.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    Book addBook(Book book);

    List<Book> getAllBooks();

    Book getBookById(Long id);

    Book updateBook(Long id, Book book);

    void deleteBook(Long id);

    List<Book> searchByTitle(String title);

    List<Book> searchByAuthor(String author);

    List<Book> filterByCategory(String category);

    Page<Book> getBooks(Pageable pageable);
}