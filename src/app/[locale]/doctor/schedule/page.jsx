"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  Clock,
  Save,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function DoctorSchedulePage() {
  const t = useTranslations("doctor.schedule");
  const tCommon = useTranslations("common");

  const [schedule, setSchedule] = useState({
    sunday: {
      enabled: true,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    monday: {
      enabled: true,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    tuesday: {
      enabled: true,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    wednesday: {
      enabled: true,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    thursday: {
      enabled: true,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    friday: {
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
    saturday: {
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: "30",
    },
  });

  const days = [
    { key: "sunday", label: "Sunday", labelAr: "الأحد" },
    { key: "monday", label: "Monday", labelAr: "الإثنين" },
    { key: "tuesday", label: "Tuesday", labelAr: "الثلاثاء" },
    { key: "wednesday", label: "Wednesday", labelAr: "الأربعاء" },
    { key: "thursday", label: "Thursday", labelAr: "الخميس" },
    { key: "friday", label: "Friday", labelAr: "الجمعة" },
    { key: "saturday", label: "Saturday", labelAr: "السبت" },
  ];

  const handleToggleDay = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSaveSchedule = () => {
    console.log("Schedule saved:", schedule);
  };

  const calculateSlots = (day) => {
    if (!schedule[day].enabled) return 0;
    const start = schedule[day].startTime.split(":");
    const end = schedule[day].endTime.split(":");
    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);
    const duration = parseInt(schedule[day].slotDuration);
    return Math.floor((endMinutes - startMinutes) / duration);
  };

  const totalWorkingDays = Object.values(schedule).filter(
    (day) => day.enabled
  ).length;

  const totalSlotsPerWeek = days.reduce(
    (sum, day) => sum + calculateSlots(day.key),
    0
  );

  return (
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("workingHours")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalWorkingDays}
                </p>
                <p className="text-xs text-slate-500 mt-1">Days per week</p>
              </div>
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("timeSlot")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalSlotsPerWeek}
                </p>
                <p className="text-xs text-slate-500 mt-1">Slots per week</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {t("available")}
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {((totalWorkingDays / 7) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-slate-500 mt-1">Availability rate</p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Schedule Configuration */}
        <Card className="border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Weekly Schedule</h3>
            <p className="text-sm text-slate-600 mt-1">
              Configure your working hours and availability for each day
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {days.map((day) => (
                <div
                  key={day.key}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    schedule[day.key].enabled
                      ? "border-secondary/30 bg-secondary/5"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={schedule[day.key].enabled}
                        onCheckedChange={() => handleToggleDay(day.key)}
                      />
                      <div>
                        <p className="font-semibold text-slate-900">
                          {day.label}
                        </p>
                        {schedule[day.key].enabled ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mt-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {t("available")}
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 border-red-200 mt-1">
                            <XCircle className="h-3 w-3 mr-1" />
                            {t("dayOff")}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {schedule[day.key].enabled && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          {calculateSlots(day.key)} slots
                        </span>
                      </div>
                    )}
                  </div>

                  {schedule[day.key].enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Start Time
                        </label>
                        <Input
                          type="time"
                          value={schedule[day.key].startTime}
                          onChange={(e) =>
                            handleTimeChange(day.key, "startTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          End Time
                        </label>
                        <Input
                          type="time"
                          value={schedule[day.key].endTime}
                          onChange={(e) =>
                            handleTimeChange(day.key, "endTime", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t("duration")} (minutes)
                        </label>
                        <Input
                          type="number"
                          min="15"
                          max="120"
                          step="15"
                          value={schedule[day.key].slotDuration}
                          onChange={(e) =>
                            handleTimeChange(
                              day.key,
                              "slotDuration",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
            <Button
              onClick={handleSaveSchedule}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2"
            >
              <Save className="h-4 w-4" />
              {t("saveSchedule")}
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
