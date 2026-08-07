package com.ibm.service;

import com.ibm.entity.Book;
import com.ibm.exception.BookNotFoundException;
import com.ibm.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {

        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @Override
    public Book updateBook(Long id, Book updatedBook) {

        Book existingBook = getBookById(id);

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setPublisher(updatedBook.getPublisher());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setQuantity(updatedBook.getQuantity());
        existingBook.setPublishedYear(updatedBook.getPublishedYear());

        return bookRepository.save(existingBook);
    }

    @Override
    public void deleteBook(Long id) {

        Book existingBook = getBookById(id);

        bookRepository.delete(existingBook);
    }

    @Override
    public List<Book> searchByTitle(String title) {

        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Book> searchByAuthor(String author) {

        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

    @Override
    public List<Book> filterByCategory(String category) {

        return bookRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    public Page<Book> getBooks(Pageable pageable) {

        return bookRepository.findAll(pageable);
    }
}