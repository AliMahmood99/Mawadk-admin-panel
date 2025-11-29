"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toast";
import { Bell, MapPin, Settings2, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ComponentsDemoPage() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedCity, setSelectedCity] = useState("");
  const [volumeValue, setVolumeValue] = useState([75]);

  // Qatar cities
  const qatarCities = [
    { value: "doha", label: "الدوحة - Doha", label_ar: "الدوحة" },
    { value: "al-rayyan", label: "الريان - Al Rayyan", label_ar: "الريان" },
    { value: "al-wakrah", label: "الوكرة - Al Wakrah", label_ar: "الوكرة" },
    { value: "al-khor", label: "الخور - Al Khor", label_ar: "الخور" },
    { value: "lusail", label: "لوسيل - Lusail", label_ar: "لوسيل" },
    { value: "umm-salal", label: "أم صلال - Umm Salal", label_ar: "أم صلال" },
    { value: "al-shamal", label: "الشمال - Al Shamal", label_ar: "الشمال" },
    { value: "mesaieed", label: "مسيعيد - Mesaieed", label_ar: "مسيعيد" },
  ];

  const showSuccessNotification = () => {
    toast.success("تم الحفظ بنجاح!", {
      description: "تم حفظ التغييرات بنجاح",
      duration: 3000,
    });
  };

  const showErrorNotification = () => {
    toast.error("حدث خطأ!", {
      description: "فشل في حفظ التغييرات",
      duration: 3000,
    });
  };

  const showWarningNotification = () => {
    toast.warning("تحذير!", {
      description: "يرجى التحقق من البيانات المدخلة",
      duration: 3000,
    });
  };

  const showInfoNotification = () => {
    toast.info("معلومة", {
      description: "لديك 5 مواعيد جديدة اليوم",
      duration: 3000,
    });
  };

  const showCustomNotification = () => {
    toast("موعد جديد!", {
      description: "لديك موعد مع د. أحمد في الساعة 3:00 PM",
      duration: 4000,
      action: {
        label: "عرض",
        onClick: () => console.log("View appointment"),
      },
    });
  };

  return (
    <DashboardLayout requiredUserType="admin">
      <Toaster position="top-right" richColors />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Components Demo</h1>
          <p className="text-slate-600 mt-1">
            عرض توضيحي للمكونات: Sliders, Selects & Notifications
          </p>
        </div>
        <Button className="gap-2 h-10 bg-primary hover:bg-primary/90">
          <Settings2 className="w-4 h-4" />
          الإعدادات
        </Button>
      </div>

      {/* Notifications Demo */}
      <Card className="border-slate-200 mb-6">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Notifications System</CardTitle>
              <p className="text-sm text-slate-500 mt-1">
                نظام الإشعارات باستخدام Sonner
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={showSuccessNotification}
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-12"
            >
              <Bell className="w-4 h-4 mr-2" />
              Success Notification
            </Button>
            <Button
              onClick={showErrorNotification}
              className="bg-rose-600 hover:bg-rose-700 text-white h-12"
            >
              <Bell className="w-4 h-4 mr-2" />
              Error Notification
            </Button>
            <Button
              onClick={showWarningNotification}
              className="bg-amber-600 hover:bg-amber-700 text-white h-12"
            >
              <Bell className="w-4 h-4 mr-2" />
              Warning Notification
            </Button>
            <Button
              onClick={showInfoNotification}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              <Bell className="w-4 h-4 mr-2" />
              Info Notification
            </Button>
            <Button
              onClick={showCustomNotification}
              className="bg-purple-600 hover:bg-purple-700 text-white h-12"
            >
              <Bell className="w-4 h-4 mr-2" />
              Custom with Action
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Select Component Demo */}
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Select Component</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  قائمة منسدلة لاختيار المدن
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  اختر المدينة
                </label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="اختر المدينة..." />
                  </SelectTrigger>
                  <SelectContent>
                    {qatarCities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCity && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900">
                    المدينة المختارة:
                  </p>
                  <p className="text-lg font-bold text-blue-700 mt-1">
                    {qatarCities.find((c) => c.value === selectedCity)?.label}
                  </p>
                </div>
              )}

              <Separator />

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  اختر التخصص الطبي
                </label>
                <Select>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="اختر التخصص..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">
                      أمراض القلب - Cardiology
                    </SelectItem>
                    <SelectItem value="neurology">
                      الأعصاب - Neurology
                    </SelectItem>
                    <SelectItem value="orthopedics">
                      العظام - Orthopedics
                    </SelectItem>
                    <SelectItem value="pediatrics">
                      طب الأطفال - Pediatrics
                    </SelectItem>
                    <SelectItem value="dermatology">
                      الجلدية - Dermatology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slider Component Demo */}
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-pink-50 rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Slider Component</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  شريط التحكم في القيم
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    نطاق السعر
                  </label>
                  <span className="text-lg font-bold text-primary">
                    QAR {sliderValue[0]}
                  </span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>QAR 0</span>
                  <span>QAR 500</span>
                </div>
              </div>

              <Separator />

              {/* Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    مستوى الصوت
                  </label>
                  <span className="text-lg font-bold text-primary">
                    {volumeValue[0]}%
                  </span>
                </div>
                <Slider
                  value={volumeValue}
                  onValueChange={setVolumeValue}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <Separator />

              {/* Rating Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    الحد الأدنى للتقييم
                  </label>
                  <span className="text-lg font-bold text-primary">
                    {(sliderValue[0] / 100 * 5).toFixed(1)} ⭐
                  </span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0 ⭐</span>
                  <span>5 ⭐</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card className="border-slate-200 mt-6">
        <CardHeader className="border-b border-slate-100">
          <CardTitle>Usage Examples</CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            أمثلة على استخدام الـ Components
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm">
              <p className="text-slate-600 mb-2">// Slider Usage:</p>
              <code className="text-slate-900">
                {`<Slider value={[50]} onValueChange={setValue} max={100} step={5} />`}
              </code>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm">
              <p className="text-slate-600 mb-2">// Select Usage:</p>
              <code className="text-slate-900">
                {`<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>`}
              </code>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm">
              <p className="text-slate-600 mb-2">// Toast Notification Usage:</p>
              <code className="text-slate-900">
                {`toast.success("Success!", { description: "Done!" });
toast.error("Error!", { description: "Failed!" });
toast.warning("Warning!", { description: "Check this!" });
toast.info("Info", { description: "FYI" });`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
