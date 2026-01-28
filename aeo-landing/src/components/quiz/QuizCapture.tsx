import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const captureSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
});

export type CaptureFormData = z.infer<typeof captureSchema> & { phone: string };

interface QuizCaptureProps {
  onSubmit: (data: CaptureFormData) => void;
  isSubmitting: boolean;
}

export function QuizCapture({ onSubmit, isSubmitting }: QuizCaptureProps) {
  const [country, setCountry] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    // Try multiple geolocation APIs as fallbacks
    const detectCountry = async () => {
      // Try ipapi.co first (has good CORS support)
      try {
        const res = await fetch("https://ipapi.co/country/", {
          headers: { "Accept": "text/plain" }
        });
        if (res.ok) {
          const country = await res.text();
          if (country && country.length === 2) {
            setCountry(country.toLowerCase());
            return;
          }
        }
      } catch {}

      // Fallback to country.is
      try {
        const res = await fetch("https://api.country.is/");
        if (res.ok) {
          const data = await res.json();
          if (data.country) {
            setCountry(data.country.toLowerCase());
            return;
          }
        }
      } catch {}

      // Default to US
      setCountry("us");
    };

    detectCountry();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CaptureFormData, "phone">>({
    resolver: zodResolver(captureSchema),
  });

  const handleFormSubmit = (data: Omit<CaptureFormData, "phone">) => {
    if (phone.length < 8) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setPhoneError("");
    onSubmit({ ...data, phone });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Almost there!</h3>
        <p className="text-muted-foreground">
          Enter your details to get instant access to the checklist.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("name")}
            placeholder="Full Name *"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email Address *"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          {country ? (
            <PhoneInput
              defaultCountry={country}
              value={phone}
              onChange={setPhone}
            />
          ) : (
            <div className="h-11 rounded-lg border border-card-border bg-surface animate-pulse" />
          )}
          {phoneError && (
            <p className="text-destructive text-sm mt-1">{phoneError}</p>
          )}
        </div>

        <div>
          <Input
            {...register("company")}
            placeholder="Company (optional)"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <ArrowPathIcon className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            "Get Free Checklist"
          )}
        </Button>

        <p className="text-xs text-muted text-center">
          By submitting, you agree to receive occasional updates about AEO.
          Unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  );
}
