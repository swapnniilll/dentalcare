package com.smartdental.service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartdental.entity.EmailOtp;
import com.smartdental.repository.OtpRepository;

@Service
@Transactional
public class OtpService {

    @Autowired
    private OtpRepository repository;

    private final String SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycby76ppkQwEDENBLXqgifNoQRa8IAAnE25e6EC-LKriK0Ue7mPClTyxEbz52hmaLIIqdSQ/exec";

    public boolean sendOtp(String email) {

        repository.deleteByCreatedAtBefore(LocalDateTime.now().minusMinutes(5));
        repository.deleteByEmail(email);

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        EmailOtp obj = new EmailOtp();
        obj.setEmail(email);
        obj.setOtp(otp);
        obj.setCreatedAt(LocalDateTime.now());

        repository.save(obj);

        try {

            URL url = new URL(SCRIPT_URL);

            HttpURLConnection connection =
                    (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            String params =
                    "type=" + URLEncoder.encode("otp", StandardCharsets.UTF_8)
                    + "&email=" + URLEncoder.encode(email, StandardCharsets.UTF_8)
                    + "&otp=" + URLEncoder.encode(otp, StandardCharsets.UTF_8);

            OutputStream os = connection.getOutputStream();
            os.write(params.getBytes(StandardCharsets.UTF_8));
            os.flush();
            os.close();

            int responseCode = connection.getResponseCode();

            System.out.println("Google Script Response : " + responseCode);

            connection.getInputStream().close();

            return responseCode == 200;

        } catch (Exception e) {

            e.printStackTrace();
            return false;

        }

    }

    public boolean verifyOtp(String email, String otp) {

        repository.deleteByCreatedAtBefore(LocalDateTime.now().minusMinutes(5));

        System.out.println("--------------------------------");
        System.out.println("EMAIL : " + email);
        System.out.println("OTP   : " + otp);

        Optional<EmailOtp> otpData =
                repository.findByEmailAndOtp(email, otp);

        System.out.println("FOUND : " + otpData.isPresent());

        if (otpData.isPresent()) {

            repository.deleteByEmail(email);

            return true;
        }

        return false;
    }

}