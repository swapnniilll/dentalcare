package com.smartdental.dto;

public class BlockedSlotResponse {

    private String room;
    private String time;
    private String status;

    public BlockedSlotResponse() {}

    public BlockedSlotResponse(String room, String time, String status) {
        this.room = room;
        this.time = time;
        this.status = status;
    }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}