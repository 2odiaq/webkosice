import { Resend } from "resend";
import { site } from "@/lib/site";

type SendArgs = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  locale: string;
};

export function hasResend() {
  return Boolean(process.env.RESEND_API_KEY);
}

function resendFromHeader(): string {
  const raw = process.env.RESEND_FROM?.trim();
  if (!raw) {
    return `${site.name} <noreply@send.webkosice.com>`;
  }
  if (raw.includes("<") && raw.includes(">")) {
    return raw;
  }
  return `${site.name} <${raw}>`;
}

export async function sendContactEmail(args: SendArgs) {
  if (!hasResend()) {
    return { ok: false, reason: "no-resend" as const };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const destination = process.env.CONTACT_EMAIL ?? site.email;

  const subject = `[${site.name}] ${args.name} — ${args.locale.toUpperCase()}`;
  const body = [
    `New contact form submission`,
    ``,
    `Name:     ${args.name}`,
    `Email:    ${args.email}`,
    `Company:  ${args.company ?? "—"}`,
    `Budget:   ${args.budget ?? "—"}`,
    `Locale:   ${args.locale}`,
    ``,
    `Message:`,
    args.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: destination,
    replyTo: args.email,
    subject,
    text: body,
  });

  if (error) {
    return { ok: false, reason: "resend-error" as const, error };
  }
  return { ok: true as const };
}
