import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, value, ...props }, ref) => {
  // Only set value prop if it was explicitly passed
  // Convert null/undefined to empty string to avoid React warnings
  const textareaProps = {};
  if (value !== undefined) {
    textareaProps.value = value === null ? "" : value;
  }

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...textareaProps}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
