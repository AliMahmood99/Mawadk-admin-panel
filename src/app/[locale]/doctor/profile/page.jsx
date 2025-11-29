"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Stethoscope,
  Award,
  DollarSign,
  Upload,
  Save,
  Mail,
  Phone,
  MapPin,
  Building2,
  Languages,
} from "lucide-react";

export default function DoctorProfilePage() {
  const t = useTranslations("doctor.profile");
  const tCommon = useTranslations("common");

  const [formData, setFormData] = useState({
    name: "Dr. Ahmed Hassan",
    name_ar: "د. أحمد حسن",
    email: "ahmed.hassan@mawadk.qa",
    phone: "+974 5555 1234",
    specialty: "Pediatrics",
    specialty_ar: "طب الأطفال",
    experience: "8",
    qualification: "MBBS, MD Pediatrics",
    qualification_ar: "بكالوريوس طب وجراحة، دكتوراه طب الأطفال",
    bio: "Experienced pediatrician with 8 years of practice. Specialized in child healthcare and development.",
    bio_ar: "طبيب أطفال ذو خبرة 8 سنوات. متخصص في رعاية وتطور الأطفال.",
    consultationFee: "300",
    languages: "Arabic, English",
    languages_ar: "العربية، الإنجليزية",
    hospital: "Sunrise Medical Center",
    hospital_ar: "مركز صن رايز الطبي",
    address: "West Bay, Doha, Qatar",
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
    console.log("Profile updated:", formData);
  };

  return (
    <DashboardLayout requiredUserType="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-slate-600 mt-1">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-secondary" />
              Profile Photo
            </h3>
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">AH</span>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
                >
                  <Upload className="h-4 w-4" />
                  {t("uploadPhoto")}
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                {t("basicInfo")}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("doctorName")} (English)
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("doctorName")} (Arabic)
                  </label>
                  <Input
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {tCommon("email")}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {tCommon("phone")}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Card>

            {/* Professional Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-secondary" />
                {t("professionalInfo")}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("specialty")} (English)
                  </label>
                  <Input
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("specialty")} (Arabic)
                  </label>
                  <Input
                    name="specialty_ar"
                    value={formData.specialty_ar}
                    onChange={handleChange}
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-slate-400" />
                    {t("experience")} (Years)
                  </label>
                  <Input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    {t("consultationFee")} (QAR)
                  </label>
                  <Input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Qualifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-secondary" />
              {t("qualification")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualifications (English)
                </label>
                <Input
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualifications (Arabic)
                </label>
                <Input
                  name="qualification_ar"
                  value={formData.qualification_ar}
                  onChange={handleChange}
                  dir="rtl"
                />
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {t("bio")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio (English)
                </label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio (Arabic)
                </label>
                <Textarea
                  name="bio_ar"
                  value={formData.bio_ar}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                  dir="rtl"
                />
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-slate-400" />
                  {t("languages")} (English)
                </label>
                <Input
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-slate-400" />
                  {t("languages")} (Arabic)
                </label>
                <Input
                  name="languages_ar"
                  value={formData.languages_ar}
                  onChange={handleChange}
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  {t("hospital")} (English)
                </label>
                <Input
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  disabled
                  className="bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {tCommon("address")}
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 gap-2"
            >
              <Save className="h-4 w-4" />
              {t("updateProfile")}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
