"use server";

import { z } from "zod";
import { sendContactEmail, hasResend } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().max(200).optional().or(z.literal("")),
  budget: z.string().max(50).optional().or(z.literal("")),
  message: z.string().min(20),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  startedAt: z.string().optional(),
  locale: z.enum(["sk", "en"]),
});

export type ContactState = {
  status: "idle" | "success" | "error" | "mailto";
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as "name" | "email" | "message";
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.code;
      }
    }
    return { status: "error", fieldErrors };
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return { status: "success" };
  }

  const started = data.startedAt ? Number(data.startedAt) : 0;
  if (started && Date.now() - started < 1500) {
    return { status: "success" };
  }

  if (!hasResend()) {
    return { status: "mailto" };
  }

  const result = await sendContactEmail({
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    budget: data.budget || undefined,
    message: data.message,
    locale: data.locale,
  });

  if (!result.ok) {
    return { status: "error", error: "send-failed" };
  }
  return { status: "success" };
}
