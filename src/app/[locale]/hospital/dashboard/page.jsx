"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Calendar,
  Star,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  Activity,
  Award,
  DollarSign,
  UserCheck
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function HospitalDashboardPage() {
  const t = useTranslations("dashboard");

  const stats = [
    {
      title: t("totalDoctors"),
      value: "45",
      change: "+5%",
      trend: "up",
      icon: Stethoscope,
      iconBg: "bg-green-50",
      iconColor: "text-accent",
      subtitle: "Active doctors",
    },
    {
      title: t("todayAppointments"),
      value: "28",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      subtitle: "vs yesterday",
    },
    {
      title: "Total Patients",
      value: "1,245",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      subtitle: "This month",
    },
    {
      title: t("rating"),
      value: "4.8",
      change: "+0.3",
      trend: "up",
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      subtitle: "342 reviews",
    },
  ];

  const topDoctors = [
    { rank: 1, name: "Dr. Ahmed Khalil", specialty: "Pediatrics", rating: 4.9, patients: 245, revenue: "QAR 45,000", growth: "+23%" },
    { rank: 2, name: "Dr. Sarah Ahmed", specialty: "Cardiology", rating: 4.8, patients: 198, revenue: "QAR 38,500", growth: "+18%" },
    { rank: 3, name: "Dr. Mohammed Ali", specialty: "Orthopedics", rating: 4.7, patients: 167, revenue: "QAR 32,000", growth: "+15%" },
    { rank: 4, name: "Dr. Fatima Hassan", specialty: "Dermatology", rating: 4.6, patients: 142, revenue: "QAR 28,000", growth: "+12%" },
    { rank: 5, name: "Dr. Omar Abdullah", specialty: "Neurology", rating: 4.5, patients: 128, revenue: "QAR 25,500", growth: "+10%" },
  ];

  const recentActivity = [
    { type: "appointment", patient: "Ali Mohammed", doctor: "Dr. Ahmed Khalil", time: "10:30 AM", status: "confirmed" },
    { type: "appointment", patient: "Fatima Ahmed", doctor: "Dr. Sarah Ahmed", time: "11:00 AM", status: "confirmed" },
    { type: "review", patient: "Hassan Ali", rating: 5, doctor: "Dr. Mohammed Ali", time: "9:45 AM", status: "new" },
    { type: "appointment", patient: "Noor Abdullah", doctor: "Dr. Fatima Hassan", time: "12:00 PM", status: "pending" },
    { type: "review", patient: "Sara Hassan", rating: 4, doctor: "Dr. Omar Abdullah", time: "8:30 AM", status: "new" },
  ];

  const departmentStats = [
    { name: "Pediatrics", appointments: 42, percentage: 28, color: "bg-primary" },
    { name: "Cardiology", appointments: 35, percentage: 23, color: "bg-secondary" },
    { name: "Orthopedics", appointments: 28, percentage: 19, color: "bg-accent" },
    { name: "Dermatology", appointments: 22, percentage: 15, color: "bg-amber-500" },
    { name: "Neurology", appointments: 18, percentage: 12, color: "bg-purple-500" },
    { name: "General", appointments: 5, percentage: 3, color: "bg-slate-400" },
  ];

  return (
    <DashboardLayout requiredUserType="hospital">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Hospital Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your hospital's performance and key metrics
        </p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center text-xs font-medium ${
                        stat.trend === "up" ? "text-accent" : "text-destructive"
                      }`}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Appointments Overview */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Weekly Appointments</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Last 7 days performance</p>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-2 h-48">
                {[
                  { day: "Mon", height: "65%", value: "18" },
                  { day: "Tue", height: "80%", value: "22" },
                  { day: "Wed", height: "55%", value: "15" },
                  { day: "Thu", height: "70%", value: "19" },
                  { day: "Fri", height: "85%", value: "24" },
                  { day: "Sat", height: "90%", value: "26" },
                  { day: "Sun", height: "45%", value: "12" },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-muted/30 rounded-lg relative overflow-hidden group cursor-pointer">
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-lg transition-all duration-300 group-hover:from-purple-600 group-hover:to-purple-500"
                        style={{ height: item.height }}
                      ></div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold text-white">{item.value}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Departments</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Today's distribution</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentStats.map((dept, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{dept.name}</span>
                    <span className="text-muted-foreground">{dept.appointments}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${dept.color} rounded-full transition-all duration-500`}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Doctors */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <CardTitle className="text-lg font-semibold">Top Performing Doctors</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-1">This month's leaders</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDoctors.map((doctor) => (
                <div key={doctor.rank} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                    doctor.rank === 1 ? "bg-gradient-to-br from-accent to-accent/80 text-white shadow-md" :
                    doctor.rank === 2 ? "bg-primary/10 text-primary" :
                    doctor.rank === 3 ? "bg-secondary/10 text-secondary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    #{doctor.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{doctor.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{doctor.specialty}</span>
                      <span className="text-xs text-accent font-medium">★ {doctor.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-accent">{doctor.growth}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{doctor.patients} patients</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Latest updates and bookings</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    activity.type === "appointment"
                      ? "bg-primary/10 text-primary"
                      : "bg-amber-50 text-amber-500"
                  }`}>
                    {activity.type === "appointment" ? (
                      <Calendar className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.patient}
                      {activity.type === "review" && (
                        <span className="ml-2 text-xs text-accent">
                          {"★".repeat(activity.rating)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.type === "appointment" ? "Appointment with" : "Reviewed"} {activity.doctor}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                    <Badge
                      variant={activity.status === "confirmed" ? "default" : activity.status === "new" ? "success" : "outline"}
                      className="text-[9px] h-4 px-1.5"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: UserCheck, label: "Today's Check-ins", value: "23", color: "text-accent", bg: "bg-accent/10" },
          { icon: Clock, label: "Avg Wait Time", value: "12 min", color: "text-primary", bg: "bg-primary/10" },
          { icon: DollarSign, label: "Today's Revenue", value: "QAR 8,500", color: "text-accent", bg: "bg-accent/10" },
          { icon: Activity, label: "Bed Occupancy", value: "78%", color: "text-secondary", bg: "bg-secondary/10" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-lg font-bold text-foreground truncate">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
