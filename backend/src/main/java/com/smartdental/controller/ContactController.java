package com.smartdental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdental.model.Contact;
import com.smartdental.service.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactService service;

    // ===========================
    // Save Contact
    // ===========================
    @PostMapping("/save")
    public Contact saveContact(@RequestBody Contact contact) {
        return service.saveContact(contact);
    }

    // ===========================
    // Fetch All Contacts
    // ===========================
    @GetMapping("/all")
    public List<Contact> getAllContacts() {
        return service.getAllContacts();
    }

    // ===========================
    // Fetch Contact By ID
    // ===========================
    @GetMapping("/{id}")
    public Contact getContact(@PathVariable Long id) {
        return service.getContactById(id);
    }

    // ===========================
    // Update Contact
    // ===========================
    @PutMapping("/update/{id}")
    public Contact updateContact(
            @PathVariable Long id,
            @RequestBody Contact contact) {

        return service.updateContact(id, contact);
    }

    // ===========================
    // Delete Contact
    // ===========================
    @DeleteMapping("/delete/{id}")
    public String deleteContact(@PathVariable Long id) {

        service.deleteContact(id);

        return "Contact Deleted Successfully";
    }
}