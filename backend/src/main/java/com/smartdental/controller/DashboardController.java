package com.smartdental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartdental.dto.DashboardChartResponse;
import com.smartdental.dto.DashboardResponse;
import com.smartdental.entity.Appointment;
import com.smartdental.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping("/counts")
    public DashboardResponse getDashboardCounts() {
        return service.getDashboardCounts();
    }

    @GetMapping("/charts")
    public DashboardChartResponse getChartData() {
        return service.getChartData();
    }

    @GetMapping("/today")
    public List<Appointment> getTodaysAppointments() {
        return service.getTodaysAppointments();
    }
}