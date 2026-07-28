package com.smartdental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartdental.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}