package com.smartdental.dto;

import java.time.LocalDate;

public class BlockedSlotRequest {

    private LocalDate date;
    private String room;
    private String time;

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}