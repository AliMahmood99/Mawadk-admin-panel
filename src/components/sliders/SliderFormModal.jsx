"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon, Upload, X, Loader2, Calendar, Globe,
  Building2, Stethoscope, User, ExternalLink, Link2, ArrowUpDown
} from "lucide-react";
import toast from "react-hot-toast";
import SlidersService from "@/lib/services/sliders.service";

export default function SliderFormModal({
  open,
  onOpenChange,
  slider = null,
  onSuccess,
}) {
  const t = useTranslations("sliders");
  const tc = useTranslations("common");
  const locale = useLocale();

  const isEdit = !!slider;

  // Form state
  const [formData, setFormData] = useState({
    type: "None",
    url: "",
    status: true,
    sort: 1,
    start_at: "",
    end_at: "",
    ar_title: "",
    en_title: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [providers, setProviders] = useState([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("ar");

  // Populate form for edit
  useEffect(() => {
    if (isEdit && slider) {
      const arTrans = slider.translations?.find(t => t.locale === "ar") || {};
      const enTrans = slider.translations?.find(t => t.locale === "en") || {};

      setFormData({
        type: slider.type || "None",
        url: slider.url || "",
        status: slider.status,
        sort: slider.sort || 1,
        start_at: slider.start_at || "",
        end_at: slider.end_at || "",
        ar_title: arTrans.title || slider.title || "",
        en_title: enTrans.title || "",
        image: null,
      });
      setImagePreview(slider.image);

      // Load providers if type is Hospital/Clinic/Doctor
      if (["Hospital", "Clinic", "Doctor"].includes(slider.type)) {
        fetchProviders(slider.type);
      }
    } else {
      // Reset form for add
      setFormData({
        type: "None",
        url: "",
        status: true,
        sort: 1,
        start_at: "",
        end_at: "",
        ar_title: "",
        en_title: "",
        image: null,
      });
      setImagePreview(null);
      setProviders([]);
    }
    setActiveTab("ar");
  }, [isEdit, slider, open]);

  // Fetch providers when type changes
  const fetchProviders = async (type) => {
    if (!["Hospital", "Clinic", "Doctor"].includes(type)) {
      setProviders([]);
      return;
    }

    setIsLoadingProviders(true);
    try {
      const result = await SlidersService.getProvidersDropdown(type);
      if (result.success) {
        setProviders(result.data);
      }
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setIsLoadingProviders(false);
    }
  };

  // Handle type change
  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      url: type === "None" ? "" : prev.url,
    }));
    fetchProviders(type);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.ar_title.trim()) {
      toast.error(t("arabicTitleRequired"));
      return;
    }
    if (!formData.en_title.trim()) {
      toast.error(t("englishTitleRequired"));
      return;
    }
    if (!isEdit && !formData.image) {
      toast.error(t("imageRequired"));
      return;
    }
    if (["Hospital", "Clinic", "Doctor"].includes(formData.type) && !formData.url) {
      toast.error(t("providerRequired"));
      return;
    }
    if (formData.type === "URL" && !formData.url) {
      toast.error(t("urlRequired"));
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = SlidersService.buildFormData(formData);

      let result;
      if (isEdit) {
        result = await SlidersService.updateSlider(slider.id, submitData);
      } else {
        result = await SlidersService.createSlider(submitData);
      }

      if (result.success) {
        toast.success(isEdit ? t("sliderUpdated") : t("sliderCreated"));
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(tc("errorSaving"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "Hospital": return <Building2 className="h-4 w-4" />;
      case "Clinic": return <Stethoscope className="h-4 w-4" />;
      case "Doctor": return <User className="h-4 w-4" />;
      case "URL": return <ExternalLink className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            {isEdit ? t("editSlider") : t("addSlider")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>{t("sliderImage")} *</Label>
            <div className="flex items-start gap-4">
              <div className="w-40 h-24 rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="slider-image"
                />
                <Label
                  htmlFor="slider-image"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  {t("uploadImage")}
                </Label>
                <p className="text-xs text-slate-500">{t("imageHint")}</p>
              </div>
            </div>
          </div>

          {/* Type Selection */}
          <div className="space-y-2">
            <Label>{t("sliderType")} *</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    {t("typeNone")}
                  </div>
                </SelectItem>
                <SelectItem value="Hospital">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {t("typeHospital")}
                  </div>
                </SelectItem>
                <SelectItem value="Clinic">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    {t("typeClinic")}
                  </div>
                </SelectItem>
                <SelectItem value="Doctor">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {t("typeDoctor")}
                  </div>
                </SelectItem>
                <SelectItem value="URL">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {t("typeURL")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">{t("typeHint")}</p>
          </div>

          {/* Provider Selection (for Hospital/Clinic/Doctor) */}
          {["Hospital", "Clinic", "Doctor"].includes(formData.type) && (
            <div className="space-y-2">
              <Label>{t("selectProvider")} *</Label>
              <Select
                value={formData.url}
                onValueChange={(val) => setFormData(prev => ({ ...prev, url: val }))}
                disabled={isLoadingProviders}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingProviders ? t("loading") : t("selectProviderPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id.toString()}>
                      <div className="flex items-center gap-2">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        {provider.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* URL Input (for URL type) */}
          {formData.type === "URL" && (
            <div className="space-y-2">
              <Label>{t("externalUrl")} *</Label>
              <div className="relative">
                <Link2 className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com"
                  className="ps-9"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* Sort and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("sortOrder")}</Label>
              <div className="relative">
                <ArrowUpDown className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  min="1"
                  value={formData.sort}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort: parseInt(e.target.value) || 1 }))}
                  className="ps-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{tc("status")}</Label>
              <div className="flex items-center gap-3 h-10">
                <Switch
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                />
                <span className={formData.status ? "text-emerald-600" : "text-slate-500"}>
                  {formData.status ? tc("active") : tc("inactive")}
                </span>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("startDate")}</Label>
              <div className="relative">
                <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  value={formData.start_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_at: e.target.value }))}
                  className="ps-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("endDate")}</Label>
              <div className="relative">
                <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  value={formData.end_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_at: e.target.value }))}
                  className="ps-9"
                />
              </div>
            </div>
          </div>

          {/* Translations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <Label className="text-base">{t("translations")}</Label>
            </div>

            {/* Language Tabs */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={activeTab === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("ar")}
              >
                العربية
              </Button>
              <Button
                type="button"
                variant={activeTab === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("en")}
              >
                English
              </Button>
            </div>

            {/* Arabic Title */}
            {activeTab === "ar" && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-xl" dir="rtl">
                <Label>{t("arabicTitle")} *</Label>
                <Input
                  value={formData.ar_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, ar_title: e.target.value }))}
                  placeholder="عنوان السلايدر بالعربية"
                />
              </div>
            )}

            {/* English Title */}
            {activeTab === "en" && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-xl" dir="ltr">
                <Label>English Title *</Label>
                <Input
                  value={formData.en_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, en_title: e.target.value }))}
                  placeholder="Slider title in English"
                />
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {tc("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin me-2" />
                  {tc("saving")}
                </>
              ) : (
                isEdit ? tc("saveChanges") : tc("add")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
