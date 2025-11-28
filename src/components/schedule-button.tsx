import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function ScheduleButton() {
  useEffect(() => {
    (async function () {
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
      data-cal-namespace="30min"
      data-cal-link="zidan-abraham/30min"
      data-cal-config='{"layout":"month_view","theme":"light"}'
    >
      Schedule a Free Consultation
    </Button>
  );
}
