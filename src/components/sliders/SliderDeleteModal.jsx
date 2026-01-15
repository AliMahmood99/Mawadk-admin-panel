"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import SlidersService from "@/lib/services/sliders.service";

export default function SliderDeleteModal({
  open,
  onOpenChange,
  slider,
  onSuccess,
}) {
  const t = useTranslations("sliders");
  const tc = useTranslations("common");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!slider) return;

    setIsDeleting(true);
    try {
      const result = await SlidersService.deleteSlider(slider.id);
      if (result.success) {
        toast.success(t("sliderDeleted"));
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(tc("errorDeleting"));
    } finally {
      setIsDeleting(false);
    }
  };

  if (!slider) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg">{t("deleteSlider")}</DialogTitle>
              <DialogDescription className="mt-1">
                {t("deleteSliderConfirm")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="my-4 p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            {slider.image ? (
              <img
                src={slider.image}
                alt={slider.title}
                className="w-16 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-slate-400" />
              </div>
            )}
            <div>
              <p className="font-medium text-slate-900">{slider.title}</p>
              <p className="text-sm text-slate-500">ID: {slider.id}</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <strong>{tc("warning")}:</strong> {t("deleteWarning")}
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isDeleting}
          >
            {tc("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin me-2" />
                {tc("deleting")}
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 me-2" />
                {tc("delete")}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
