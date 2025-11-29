"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Upload,
  Save,
  Star,
  Users,
} from "lucide-react";
import { hospitals } from "@/data/mock/hospitals";

export default function HospitalProfilePage() {
  const t = useTranslations("hospital.profile");
  const tCommon = useTranslations("common");

  // Get hospital data for hospital_id = 1
  const hospital = hospitals.find((h) => h.id === 1);

  const [formData, setFormData] = useState({
    name: hospital?.name || "",
    name_ar: hospital?.name_ar || "",
    email: hospital?.email || "",
    phone: hospital?.phone || "",
    address: hospital?.address || "",
    address_ar: hospital?.address_ar || "",
    description: hospital?.description || "",
    description_ar: hospital?.description_ar || "",
    website: "https://sunrise-medical.qa",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <DashboardLayout requiredUserType="hospital">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        {/* Profile Overview Card */}
        <Card className="p-6 bg-gradient-to-r from-secondary/10 to-secondary/5">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="h-12 w-12 text-secondary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">
                {hospital?.name}
              </h2>
              <p className="text-slate-600 mt-1">{hospital?.name_ar}</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-slate-900">
                    {hospital?.rating}
                  </span>
                  <span className="text-slate-600 text-sm">
                    ({hospital?.reviews_count} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">
                    {hospital?.doctors_count} Doctors
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-secondary" />
                {t("basicInfo")}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("hospitalName")} (English)
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("hospitalName")} (Arabic)
                  </label>
                  <Input
                    type="text"
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                    placeholder="أدخل اسم المستشفى"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("description")} (English)
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter hospital description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("description")} (Arabic)
                  </label>
                  <Textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    rows={3}
                    placeholder="أدخل وصف المستشفى"
                    dir="rtl"
                  />
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                {t("contactInfo")}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    {tCommon("email")}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hospital@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    {tCommon("phone")}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+974 XXXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    {t("website")}
                  </label>
                  <Input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    {tCommon("address")} (English)
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    {tCommon("address")} (Arabic)
                  </label>
                  <Input
                    type="text"
                    name="address_ar"
                    value={formData.address_ar}
                    onChange={handleChange}
                    placeholder="أدخل العنوان"
                    dir="rtl"
                  />
                </div>
              </div>
            </Card>

            {/* Opening Hours */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                {t("openingHours")}
              </h3>
              <div className="space-y-3">
                {hospital?.working_hours &&
                  Object.entries(hospital.working_hours).map(
                    ([day, hours]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between py-2 border-b border-slate-100"
                      >
                        <span className="capitalize font-medium text-slate-700">
                          {day}
                        </span>
                        <span className="text-slate-600">
                          {hours.open === "closed"
                            ? "Closed"
                            : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </Card>

            {/* Images */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-secondary" />
                Images
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("uploadLogo")}
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("uploadCover")}
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG up to 5MB (1920x600 recommended)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              {t("updateProfile")}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
