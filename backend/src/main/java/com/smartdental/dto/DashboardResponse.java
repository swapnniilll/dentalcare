package com.smartdental.dto;

public class DashboardResponse {

    private long appointments;
    private long contacts;
    private long patients;
    private long slots;
    private long pastAppointments;

    public DashboardResponse() {
    }

    public DashboardResponse(long appointments,
                             long contacts,
                             long patients,
                             long slots,
                             long pastAppointments) {

        this.appointments = appointments;
        this.contacts = contacts;
        this.patients = patients;
        this.slots = slots;
        this.pastAppointments = pastAppointments;
    }

    public long getAppointments() {
        return appointments;
    }

    public void setAppointments(long appointments) {
        this.appointments = appointments;
    }

    public long getContacts() {
        return contacts;
    }

    public void setContacts(long contacts) {
        this.contacts = contacts;
    }

    public long getPatients() {
        return patients;
    }

    public void setPatients(long patients) {
        this.patients = patients;
    }

    public long getSlots() {
        return slots;
    }

    public void setSlots(long slots) {
        this.slots = slots;
    }

    public long getPastAppointments() {
        return pastAppointments;
    }

    public void setPastAppointments(long pastAppointments) {
        this.pastAppointments = pastAppointments;
    }

}