package com.smartdental.service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.smartdental.entity.Appointment;

@Service
public class AppointmentMailService {

    // Your Google Apps Script URL
    private final String SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbzAOPfUel3DdpNxSMOY1DfSyPSY6zZaf-Xv4M6qTbDB1LrZlAEvPpcRjo9J7nLrHanT/exec";

    public boolean sendAppointmentMail(Appointment appointment) {

        try {

            System.out.println("=================================");
            System.out.println("Sending Appointment Email");
            System.out.println("Name : " + appointment.getFirstName() + " " + appointment.getLastName());
            System.out.println("Email : " + appointment.getEmail());
            System.out.println("Phone : " + appointment.getPhone());
            System.out.println("Date : " + appointment.getDate());
            System.out.println("Time : " + appointment.getTime());
            System.out.println("Room : " + appointment.getRoom());
            System.out.println("=================================");

            URL url = new URL(SCRIPT_URL);

            HttpURLConnection con =
                    (HttpURLConnection) url.openConnection();

            con.setRequestMethod("POST");
            con.setDoOutput(true);

            String params =
            	    "firstName=" + URLEncoder.encode(appointment.getFirstName(), StandardCharsets.UTF_8) +
            	    "&lastName=" + URLEncoder.encode(appointment.getLastName(), StandardCharsets.UTF_8) +
            	    "&email=" + URLEncoder.encode(appointment.getEmail(), StandardCharsets.UTF_8) +
            	    "&phone=" + URLEncoder.encode(appointment.getPhone(), StandardCharsets.UTF_8) +
            	    "&appointmentDate=" + URLEncoder.encode(appointment.getDate().toString(), StandardCharsets.UTF_8) +
            	    "&appointmentTime=" + URLEncoder.encode(appointment.getTime(), StandardCharsets.UTF_8) +
            	    "&room=" + URLEncoder.encode(appointment.getRoom(), StandardCharsets.UTF_8);

            OutputStream os = con.getOutputStream();
            os.write(params.getBytes(StandardCharsets.UTF_8));
            os.flush();
            os.close();

            int responseCode = con.getResponseCode();

            System.out.println("Google Script Response : " + responseCode);

            con.getInputStream().close();

            return responseCode == 200;

        } catch (Exception e) {

            e.printStackTrace();
            return false;

        }

    }

}