import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, value, ...props }, ref) => {
  // Only set value prop if it was explicitly passed
  // Convert null/undefined to empty string to avoid React warnings
  const inputProps = {};
  if (value !== undefined) {
    inputProps.value = value === null ? "" : value;
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...inputProps}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
