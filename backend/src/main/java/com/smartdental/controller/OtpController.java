package com.smartdental.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdental.service.OtpService;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class OtpController {

    @Autowired
    private OtpService service;

    @PostMapping("/send")
    public Map<String, Object> send(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<>();

        boolean success = service.sendOtp(body.get("email"));

        if (success) {

            response.put("status", "success");
            response.put("message", "OTP Sent Successfully");

        } else {

            response.put("status", "error");
            response.put("message", "Unable to send OTP");

        }

        return response;

    }

    @PostMapping("/verify")
    public Map<String, Object> verify(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<>();

        boolean verified = service.verifyOtp(
                body.get("email"),
                body.get("otp"));

        if (verified) {

            response.put("status", "success");
            response.put("message", "OTP Verified");

        } else {

            response.put("status", "error");
            response.put("message", "Invalid or Expired OTP");

        }

        return response;

    }

}