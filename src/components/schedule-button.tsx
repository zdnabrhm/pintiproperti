import { getCalApi } from "@calcom/embed-react";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function ScheduleButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Button>) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "auto",
        cssVarsPerTheme: {
          light: { "cal-brand": "#EBAB07" },
          dark: { "cal-brand": "#FEDF62" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      data-cal-namespace="30min"
      data-cal-link="zidan-abraham/30min"
      data-cal-config='{"layout":"month_view","theme":"light"}'
      {...props}
    >
      Schedule a Free Consultation
    </Button>
  );
}
