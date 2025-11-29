"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Stethoscope, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdminDashboardPage() {
  const t = useTranslations("dashboard");
  const [hoveredBar, setHoveredBar] = useState(null);

  const stats = [
    {
      title: t("totalUsers"),
      value: "12,543",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      subtitle: "vs last month",
    },
    {
      title: t("totalHospitals"),
      value: "89",
      change: "+7%",
      trend: "up",
      icon: Building2,
      iconBg: "bg-pink-50",
      iconColor: "text-secondary",
      subtitle: "new this month",
    },
    {
      title: t("totalDoctors"),
      value: "312",
      change: "+18%",
      trend: "up",
      icon: Stethoscope,
      iconBg: "bg-green-50",
      iconColor: "text-accent",
      subtitle: "new this month",
    },
    {
      title: t("todayAppointments"),
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Calendar,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      subtitle: "vs yesterday",
    },
  ];

  const revenueData = [
    { day: "Mon", revenue: 10000, appointments: 25 },
    { day: "Tue", revenue: 20000, appointments: 45 },
    { day: "Wed", revenue: 3000, appointments: 15 },
    { day: "Thu", revenue: 5000, appointments: 20 },
    { day: "Fri", revenue: 5000, appointments: 22 },
    { day: "Sat", revenue: 15000, appointments: 38 },
    { day: "Sun", revenue: 20000, appointments: 42 },
  ];

  const topPerformers = [
    { rank: 1, name: "Al Ahli Hospital", rating: 4.9, bookings: 45, growth: "+23%" },
    { rank: 2, name: "Hamad Medical", rating: 4.8, bookings: 38, growth: "+18%" },
    { rank: 3, name: "Sidra Medicine", rating: 4.7, bookings: 32, growth: "+15%" },
    { rank: 4, name: "Royal Medical", rating: 4.6, bookings: 28, growth: "+12%" },
    { rank: 5, name: "Prime Healthcare", rating: 4.5, bookings: 25, growth: "+8%" },
  ];

  const specialtyData = [
    { name: "Pediatrics", count: 42 },
    { name: "Cardiology", count: 35 },
    { name: "Orthopedics", count: 28 },
    { name: "Dermatology", count: 22 },
    { name: "Neurology", count: 18 },
    { name: "General", count: 11 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{payload[0].payload.day}</p>
          <p className="text-sm text-primary">
            Revenue: QAR {payload[0].value.toLocaleString()}
          </p>
          {payload[1] && (
            <p className="text-sm text-accent">
              Appointments: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const SpecialtyTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">{payload[0].payload.name}</p>
          <p className="text-sm text-primary">{payload[0].value} appointments</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout requiredUserType="admin">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your platform performance and metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer hover:-translate-y-1"
            >
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
        {/* Revenue Overview with Interactive Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Last 7 days performance</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={{ fill: '#EC4899', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                  name="Revenue (QAR)"
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={{ fill: '#22C55E', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Appointments"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-1">This month's leaders</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer) => (
                <div
                  key={performer.rank}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                    performer.rank === 1 ? "bg-accent text-white" :
                    performer.rank === 2 ? "bg-primary/10 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    #{performer.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{performer.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-accent">★ {performer.rating}</span>
                      <span className="text-xs text-muted-foreground">{performer.bookings} bookings</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-accent">{performer.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments by Specialty with Interactive Bar Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Appointments by Specialty</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Today's distribution across service types</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={specialtyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<SpecialtyTooltip />} />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                onMouseEnter={(data, index) => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {specialtyData.map((entry, index) => {
                  const colors = ['#EC4899', '#F472B6', '#22C55E', '#3B82F6', '#F59E0B', '#8B5CF6'];
                  return (
                    <rect
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      opacity={hoveredBar === null || hoveredBar === index ? 1 : 0.6}
                      className="transition-opacity duration-200 cursor-pointer"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
