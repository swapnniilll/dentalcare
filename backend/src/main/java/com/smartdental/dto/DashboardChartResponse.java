package com.smartdental.dto;

import java.util.List;
import java.util.Map;

public class DashboardChartResponse {

    private Map<String, Long> statusBreakdown;
    private Map<String, Long> roomUsage;
    private List<DayCount> weeklyTrend;
    private Map<String, Long> peakHours;
    private long newPatientsThisMonth;

    public DashboardChartResponse() {}

    public DashboardChartResponse(Map<String, Long> statusBreakdown,
                                   Map<String, Long> roomUsage,
                                   List<DayCount> weeklyTrend,
                                   Map<String, Long> peakHours,
                                   long newPatientsThisMonth) {
        this.statusBreakdown = statusBreakdown;
        this.roomUsage = roomUsage;
        this.weeklyTrend = weeklyTrend;
        this.peakHours = peakHours;
        this.newPatientsThisMonth = newPatientsThisMonth;
    }

    public Map<String, Long> getStatusBreakdown() { return statusBreakdown; }
    public void setStatusBreakdown(Map<String, Long> statusBreakdown) { this.statusBreakdown = statusBreakdown; }

    public Map<String, Long> getRoomUsage() { return roomUsage; }
    public void setRoomUsage(Map<String, Long> roomUsage) { this.roomUsage = roomUsage; }

    public List<DayCount> getWeeklyTrend() { return weeklyTrend; }
    public void setWeeklyTrend(List<DayCount> weeklyTrend) { this.weeklyTrend = weeklyTrend; }

    public Map<String, Long> getPeakHours() { return peakHours; }
    public void setPeakHours(Map<String, Long> peakHours) { this.peakHours = peakHours; }

    public long getNewPatientsThisMonth() { return newPatientsThisMonth; }
    public void setNewPatientsThisMonth(long newPatientsThisMonth) { this.newPatientsThisMonth = newPatientsThisMonth; }

    public static class DayCount {
        private String date;
        private long count;

        public DayCount() {}

        public DayCount(String date, long count) {
            this.date = date;
            this.count = count;
        }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }

        public long getCount() { return count; }
        public void setCount(long count) { this.count = count; }
    }
}