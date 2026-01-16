"use client";

import { useState, useEffect, useRef } from "react";
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
  Building2, Stethoscope, User, ExternalLink, Link2, ArrowUpDown,
  ImagePlus, Settings, Languages
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
  const fileInputRef = useRef(null);

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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(t("invalidImageType") || "Please select an image file");
        return;
      }
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(t("imageTooLarge") || "Image must be less than 2MB");
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(isEdit ? slider?.image : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.ar_title.trim()) {
      toast.error(t("arabicTitleRequired") || "Arabic title is required");
      setActiveTab("ar");
      return;
    }
    if (!formData.en_title.trim()) {
      toast.error(t("englishTitleRequired") || "English title is required");
      setActiveTab("en");
      return;
    }
    if (!isEdit && !formData.image && !imagePreview) {
      toast.error(t("imageRequired") || "Image is required");
      return;
    }
    if (["Hospital", "Clinic", "Doctor"].includes(formData.type) && !formData.url) {
      toast.error(t("providerRequired") || "Please select a provider");
      return;
    }
    if (formData.type === "URL" && !formData.url) {
      toast.error(t("urlRequired") || "URL is required");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[Slider Form] Submitting data:", formData);
      const submitData = SlidersService.buildFormData(formData);

      let result;
      if (isEdit) {
        result = await SlidersService.updateSlider(slider.id, submitData);
      } else {
        result = await SlidersService.createSlider(submitData);
      }

      console.log("[Slider Form] Response:", result);

      if (result.success) {
        toast.success(isEdit ? t("sliderUpdated") : t("sliderCreated"));
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.message || tc("errorSaving"));
      }
    } catch (error) {
      console.error("[Slider Form] Error:", error);
      toast.error(tc("errorSaving"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Type options with icons
  const typeOptions = [
    { value: "None", label: t("typeNone") || "No Link", icon: ImageIcon, color: "text-slate-500" },
    { value: "Hospital", label: t("typeHospital") || "Hospital", icon: Building2, color: "text-blue-600" },
    { value: "Clinic", label: t("typeClinic") || "Clinic", icon: Stethoscope, color: "text-purple-600" },
    { value: "Doctor", label: t("typeDoctor") || "Doctor", icon: User, color: "text-teal-600" },
    { value: "URL", label: t("typeURL") || "External URL", icon: ExternalLink, color: "text-orange-600" },
  ];

  const selectedType = typeOptions.find(opt => opt.value === formData.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 rounded-lg bg-primary/10">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            {isEdit ? t("editSlider") : t("addSlider")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-primary" />
                <Label className="text-sm font-semibold">{t("sliderImage")} *</Label>
              </div>

              <div className="flex gap-4">
                {/* Image Preview */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-48 h-28 rounded-xl overflow-hidden border-2 border-dashed transition-all cursor-pointer group
                    ${imagePreview
                      ? "border-primary/30 bg-primary/5"
                      : "border-slate-200 bg-slate-50 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <Upload className="h-8 w-8 text-slate-300 group-hover:text-primary transition-colors" />
                      <span className="text-xs text-slate-400 group-hover:text-primary transition-colors">
                        {t("clickToUpload") || "Click to upload"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Info */}
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {imagePreview ? t("changeImage") : t("uploadImage")}
                  </Button>
                  {imagePreview && formData.image && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <X className="h-4 w-4" />
                      {t("removeImage") || "Remove"}
                    </Button>
                  )}
                  <p className="text-xs text-slate-500">
                    {t("imageHint") || "PNG, JPG max 2MB"}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-primary" />
                <Label className="text-sm font-semibold">{t("settings") || "Settings"}</Label>
              </div>

              {/* Type Selection */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("sliderType")} *</Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="bg-white">
                    <SelectValue>
                      {selectedType && (
                        <div className="flex items-center gap-2">
                          <selectedType.icon className={`h-4 w-4 ${selectedType.color}`} />
                          {selectedType.label}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">{t("typeHint") || "Select the destination type when clicking the slider"}</p>
              </div>

              {/* Provider Selection (for Hospital/Clinic/Doctor) */}
              {["Hospital", "Clinic", "Doctor"].includes(formData.type) && (
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">{t("selectProvider")} *</Label>
                  <Select
                    value={formData.url}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, url: val }))}
                    disabled={isLoadingProviders}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder={isLoadingProviders ? t("loading") : t("selectProviderPlaceholder") || "Select provider..."} />
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
                  <Label className="text-xs text-slate-600">{t("externalUrl")} *</Label>
                  <div className="relative">
                    <Link2 className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="ps-9 bg-white"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {/* Sort, Status Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">{t("sortOrder")}</Label>
                  <div className="relative">
                    <ArrowUpDown className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="number"
                      min="1"
                      value={formData.sort}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort: parseInt(e.target.value) || 1 }))}
                      className="ps-9 bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">{tc("status")}</Label>
                  <div className="flex items-center gap-3 h-10 px-3 bg-white rounded-md border">
                    <Switch
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                    />
                    <Badge variant={formData.status ? "default" : "secondary"} className={formData.status ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                      {formData.status ? tc("active") : tc("inactive")}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">{t("startDate")}</Label>
                  <div className="relative">
                    <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="date"
                      value={formData.start_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_at: e.target.value }))}
                      className="ps-9 bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">{t("endDate")}</Label>
                  <div className="relative">
                    <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="date"
                      value={formData.end_at}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_at: e.target.value }))}
                      className="ps-9 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Translations Section */}
            <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm font-semibold text-blue-900">{t("translations")}</Label>
                </div>

                {/* Language Tabs */}
                <div className="flex gap-1 p-1 bg-white rounded-lg shadow-sm">
                  <Button
                    type="button"
                    variant={activeTab === "ar" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("ar")}
                    className={`h-8 px-3 ${activeTab === "ar" ? "shadow-sm" : ""}`}
                  >
                    العربية
                  </Button>
                  <Button
                    type="button"
                    variant={activeTab === "en" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("en")}
                    className={`h-8 px-3 ${activeTab === "en" ? "shadow-sm" : ""}`}
                  >
                    English
                  </Button>
                </div>
              </div>

              {/* Arabic Title */}
              {activeTab === "ar" && (
                <div className="space-y-2 p-4 bg-white rounded-lg" dir="rtl">
                  <Label className="text-sm font-medium">{t("arabicTitle")} *</Label>
                  <Input
                    value={formData.ar_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, ar_title: e.target.value }))}
                    placeholder="عنوان السلايدر بالعربية"
                    className="text-right"
                  />
                </div>
              )}

              {/* English Title */}
              {activeTab === "en" && (
                <div className="space-y-2 p-4 bg-white rounded-lg" dir="ltr">
                  <Label className="text-sm font-medium">English Title *</Label>
                  <Input
                    value={formData.en_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, en_title: e.target.value }))}
                    placeholder="Slider title in English"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex-shrink-0 px-6 py-4 border-t bg-slate-50/80 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              {tc("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
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
