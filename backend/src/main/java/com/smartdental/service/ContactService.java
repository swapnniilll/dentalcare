package com.smartdental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartdental.model.Contact;
import com.smartdental.repository.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    // ===========================
    // Save Contact
    // ===========================
    public Contact saveContact(Contact contact) {
        return repository.save(contact);
    }

    // ===========================
    // Fetch All Contacts
    // ===========================
    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    // ===========================
    // Fetch Contact By ID
    // ===========================
    public Contact getContactById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // ===========================
    // Update Contact
    // ===========================
    public Contact updateContact(Long id, Contact contact) {

        Contact oldContact = repository.findById(id).orElse(null);

        if (oldContact == null) {
            return null;
        }

        oldContact.setFirstName(contact.getFirstName());
        oldContact.setLastName(contact.getLastName());
        oldContact.setEmail(contact.getEmail());
        oldContact.setPhone(contact.getPhone());
        oldContact.setMessage(contact.getMessage());

        return repository.save(oldContact);
    }

    // ===========================
    // Delete Contact
    // ===========================
    public void deleteContact(Long id) {
        repository.deleteById(id);
    }
}