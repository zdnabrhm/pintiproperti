import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScheduleButton } from "@/components/schedule-button";

export function SuccessCard() {
  return (
    <Card className="bg-primary-900 border-accent mx-auto w-full max-w-lg -translate-y-[50px] border-2 text-neutral-50">
      <CardHeader className="text-center">
        <div className="bg-secondary-500/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-secondary-400 h-10 w-10" />
        </div>
        <CardTitle className="text-2xl">Thank You!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-center text-lg">
        <p>Your property check has been submitted successfully.</p>
        <p>We&apos;ll contact you soon.</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" asChild>
          <a href="/">Back to Home</a>
        </Button>
        <ScheduleButton variant="outline" className="w-full" />
      </CardFooter>
    </Card>
  );
}
