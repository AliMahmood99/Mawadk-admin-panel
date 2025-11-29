"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  DollarSign
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DoctorDashboardPage() {
  const t = useTranslations("dashboard");

  const stats = [
    {
      title: t("todayAppointments"),
      value: "15",
      change: "+3",
      trend: "up",
      icon: Calendar,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      subtitle: "vs yesterday",
    },
    {
      title: "Total Patients",
      value: "1,250",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      subtitle: "This month",
    },
    {
      title: t("rating"),
      value: "4.9",
      change: "+0.2",
      trend: "up",
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      subtitle: "245 reviews",
    },
    {
      title: "Monthly " + t("earnings"),
      value: "QAR 45,000",
      change: "+18%",
      trend: "up",
      icon: Wallet,
      iconBg: "bg-green-50",
      iconColor: "text-accent",
      subtitle: "This month",
    },
  ];

  const todaySchedule = [
    { time: "09:00 AM", patient: "Sara Mohammed", type: "Checkup", status: "completed", duration: "30 min" },
    { time: "09:30 AM", patient: "Ahmed Ali", type: "Follow-up", status: "completed", duration: "30 min" },
    { time: "10:00 AM", patient: "Fatima Hassan", type: "Consultation", status: "in-progress", duration: "45 min" },
    { time: "11:00 AM", patient: "Omar Khalid", type: "New Patient", status: "upcoming", duration: "60 min" },
    { time: "02:00 PM", patient: "Noor Abdullah", type: "Checkup", status: "upcoming", duration: "30 min" },
    { time: "03:00 PM", patient: "Hassan Ali", type: "Follow-up", status: "upcoming", duration: "30 min" },
  ];

  const recentReviews = [
    { patient: "Sara Mohammed", rating: 5, comment: "Excellent doctor, very professional and caring. Highly recommended!", time: "2 hours ago" },
    { patient: "Ahmed Ali", rating: 5, comment: "Great experience, the doctor took time to explain everything clearly.", time: "5 hours ago" },
    { patient: "Fatima Hassan", rating: 4, comment: "Very knowledgeable and patient. Would definitely recommend.", time: "1 day ago" },
    { patient: "Omar Khalid", rating: 5, comment: "Best doctor I've ever visited. Very thorough and caring.", time: "2 days ago" },
  ];

  const weeklyStats = [
    { day: "Mon", appointments: 12, earnings: "3.5k" },
    { day: "Tue", appointments: 15, earnings: "4.2k" },
    { day: "Wed", appointments: 10, earnings: "3.0k" },
    { day: "Thu", appointments: 14, earnings: "4.0k" },
    { day: "Fri", appointments: 16, earnings: "4.8k" },
    { day: "Sat", appointments: 18, earnings: "5.2k" },
    { day: "Sun", appointments: 8, earnings: "2.5k" },
  ];

  return (
    <DashboardLayout requiredUserType="doctor">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your appointments, patients, and performance metrics
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
        {/* Weekly Performance */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Weekly Performance</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Appointments and earnings overview</p>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyStats.map((item, i) => {
                  const maxAppointments = Math.max(...weeklyStats.map(s => s.appointments));
                  const height = (item.appointments / maxAppointments) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-muted/30 rounded-lg relative overflow-hidden group cursor-pointer">
                        <div
                          className="w-full bg-gradient-to-t from-accent to-accent/80 rounded-lg transition-all duration-300 group-hover:from-accent group-hover:to-accent/90"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-center">
                            <span className="text-xs font-bold text-white block">{item.appointments}</span>
                            <span className="text-[9px] text-white/80">{item.earnings}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Common tasks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "View Schedule", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
                { label: "Patient Records", icon: Users, color: "text-primary", bg: "bg-blue-50" },
                { label: "Add Notes", icon: Activity, color: "text-accent", bg: "bg-green-50" },
                { label: "View Earnings", icon: Wallet, color: "text-amber-500", bg: "bg-amber-50" },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group text-left"
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{todaySchedule.length} appointments</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {todaySchedule.filter(a => a.status === "upcoming").length} Upcoming
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin">
              {todaySchedule.map((appointment, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md ${
                    appointment.status === "completed"
                      ? "bg-accent/5 border border-accent/20"
                      : appointment.status === "in-progress"
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    appointment.status === "completed"
                      ? "bg-accent/20 text-accent"
                      : appointment.status === "in-progress"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {appointment.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : appointment.status === "in-progress" ? (
                      <Activity className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm truncate">{appointment.patient}</p>
                      <Badge variant="outline" className="text-[9px] h-4 px-1.5">
                        {appointment.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>
                  {appointment.status === "completed" && (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Reviews</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Latest patient feedback</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-bold text-amber-500">4.9</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin">
              {recentReviews.map((review, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {review.patient}
                      </p>
                      <span className="text-[10px] text-muted-foreground">{review.time}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3 h-3 ${
                            j < review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: UserCheck, label: "Patients Seen", value: "8/15", color: "text-primary", bg: "bg-primary/10" },
          { icon: Clock, label: "Avg Session", value: "35 min", color: "text-purple-500", bg: "bg-purple-50" },
          { icon: DollarSign, label: "Today's Earnings", value: "QAR 2,400", color: "text-accent", bg: "bg-accent/10" },
          { icon: Star, label: "New Reviews", value: "+3", color: "text-amber-500", bg: "bg-amber-50" },
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
