import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

const SYSTEM_PROMPT = `Ти асистент Влада — професійного handyman в Charlotte, NC (зона обслуговування: 25 миль).

Дані бізнесу:
- Компанія: TurchV LLC Handyman
- Мінімальний виклик: $130
- Типовий діапазон: $130–$500
- Послуги: монтаж TV, ремонт гіпсокартону, збірка меблів, світильники, полиці, дрібний ремонт, горищні драбини, утилізатор відходів, заміна тумби, ремонт сайдингу, клумби та інше

ВАЖЛИВО для варіантів відповіді:
- НІКОЛИ не пиши що Влад щось не робить або чимось не займається
- Кожен варіант максимум 2-3 речення — коротко і по суті
- Починається з "Hi [ім'я]! Thanks for reaching out."
- Задай 1-2 конкретних питання під тип роботи:
  * Дах → висота будинку, де протікає?
  * TV → тип стіни, розмір TV?
  * Гіпсокартон → розмір пошкодження?
  * Меблі → бренд/модель?
  * Світильники → потрібна нова проводка?
- Якщо клієнт не надав фото — в одному з варіантів попроси надіслати фото
- Тон: дружній, короткий, впевнений

Відповідай ТІЛЬКИ валідним JSON (без markdown, без зайвого тексту):

{
  "jobSummary": "1-2 речення українською — що потрібно клієнту",
  "estimatedScope": "small | medium | large",
  "scopeReason": "Коротке пояснення українською",
  "estimatedPrice": "наприклад $130–$180",
  "replyOptions": [
    {
      "ua": "Короткий чорновик українською — варіант А",
      "en": "Hi [name]! Thanks for reaching out. [1-2 речення англійською]"
    },
    {
      "ua": "Короткий чорновик українською — варіант Б",
      "en": "Hi [name]! Thanks for reaching out. [1-2 речення англійською]"
    },
    {
      "ua": "Короткий чорновик українською — варіант В (якщо немає фото — попросити надіслати)",
      "en": "Hi [name]! Thanks for reaching out. [1-2 речення + прохання фото якщо немає]"
    }
  ],
  "internalNotes": "Нотатки для Влада українською: інструменти, доступ, дозволи, ZIP поза зоною, що видно на фото тощо"
}`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const zipCode = formData.get("zipCode") as string;
    const photo = formData.get("photo") as File | null;

    if (!name || !phone || !email || !jobDescription || !zipCode) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Build message content using Anthropic SDK types
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ] as const;
    type AllowedMime = (typeof allowedMimes)[number];

    const messages: Anthropic.MessageParam[] = [];
    let photoAttached = false;
    let photoBuffer: Buffer | null = null;
    let photoExt = "jpg";

    const textContent = `New quote request:
Name: ${name}
Phone: ${phone}
Email: ${email}
ZIP: ${zipCode}
Job description: ${jobDescription}`;

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      photoBuffer = Buffer.from(bytes);
      photoExt = (photo.name?.split(".").pop() || "jpg").toLowerCase();
      const mimeType: AllowedMime = allowedMimes.includes(
        photo.type as AllowedMime,
      )
        ? (photo.type as AllowedMime)
        : "image/jpeg";

      messages.push({
        role: "user",
        content: [
          { type: "text", text: textContent },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType,
              data: photoBuffer.toString("base64"),
            },
          },
        ],
      });
      photoAttached = true;
    } else {
      messages.push({
        role: "user",
        content: textContent,
      });
    }

    const claudeResponse = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages,
    });

    const rawText =
      claudeResponse.content[0].type === "text"
        ? claudeResponse.content[0].text
        : "";

    console.log("Claude raw response:", rawText);

    let analysis: {
      jobSummary: string;
      estimatedScope: string;
      scopeReason: string;
      estimatedPrice: string;
      replyOptions: { ua: string; en: string }[];
      internalNotes: string;
    };

    try {
      const cleaned = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = {
        jobSummary: jobDescription,
        estimatedScope: "unknown",
        scopeReason: "Could not auto-analyse",
        estimatedPrice: "Starting at $130",
        replyOptions: [
          {
            ua: "Дякуємо за звернення! Коли вам зручно?",
            en: `Hi ${name}! Thanks for reaching out. When works best for you?`,
          },
          {
            ua: "Можете надіслати фото для точнішої оцінки?",
            en: `Hi ${name}! Thanks for reaching out. Could you send a photo so I can give a more accurate estimate?`,
          },
          {
            ua: "Робота орієнтовно від $130. Коли зручно?",
            en: `Hi ${name}! Thanks for reaching out. Based on your description the job starts at $130. What's your availability?`,
          },
        ],
        internalNotes: "Claude parse error — перевір вручну",
      };
    }

    const scopeColor =
      analysis.estimatedScope === "small"
        ? "#16a34a"
        : analysis.estimatedScope === "medium"
          ? "#d97706"
          : "#dc2626";

    const mapsUrl = `https://www.google.com/maps/dir/Charlotte+NC/${zipCode}+NC`;

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,sans-serif;">
<div style="max-width:640px;margin:32px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">

  <div style="background:#1d4ed8;padding:28px 32px;">
    <p style="margin:0;color:#bfdbfe;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">New Quote Request</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;">TurchV LLC Handyman</h1>
  </div>

  <div style="padding:28px 32px 0;">
    <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Customer</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#64748b;width:100px;">Name</td><td style="padding:6px 0;font-weight:600;color:#0f172a;">${name}</td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Phone</td><td style="padding:6px 0;"><a href="tel:${phone}" style="color:#1d4ed8;font-weight:600;">${phone}</a></td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#1d4ed8;font-weight:600;">${email}</a></td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">ZIP</td><td style="padding:6px 0;font-weight:600;color:#0f172a;">${zipCode} — <a href="${mapsUrl}" target="_blank" style="color:#1d4ed8;">Directions from Charlotte</a></td></tr>
      <tr><td style="padding:6px 0;color:#64748b;">Photo</td><td style="padding:6px 0;color:#0f172a;">${photoAttached ? "Attached below" : "Not provided"}</td></tr>
    </table>
  </div>

  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Job Description</h2>
    <div style="background:#f8fafc;border-left:4px solid #1d4ed8;border-radius:8px;padding:14px 18px;color:#334155;line-height:1.6;">${jobDescription}</div>
  </div>

  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Claude Analysis</h2>
    <div style="background:#f0f9ff;border-radius:12px;padding:20px;">
      <p style="margin:0 0 12px;color:#0f172a;"><strong>Summary:</strong> ${analysis.jobSummary}</p>
      <p style="margin:0 0 8px;">
        <strong>Scope:</strong>
        <span style="margin-left:8px;padding:2px 12px;border-radius:20px;background:${scopeColor};color:#fff;font-size:13px;font-weight:600;text-transform:uppercase;">${analysis.estimatedScope}</span>
      </p>
      <p style="margin:0 0 12px;color:#64748b;font-size:14px;">${analysis.scopeReason}</p>
      <p style="margin:0;color:#0f172a;"><strong>Estimated Price:</strong> ${analysis.estimatedPrice}</p>
    </div>
  </div>

  ${
    photoAttached
      ? `
  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Photo from Client</h2>
    <img src="cid:clientphoto" style="max-width:100%;border-radius:12px;display:block;" alt="Client photo" />
  </div>`
      : ""
  }

  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 16px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Reply Options</h2>
    ${analysis.replyOptions
      .map((opt: { ua: string; en: string }, i: number) => {
        const subject = encodeURIComponent(`Re: Handyman Quote Request`);
        const body = encodeURIComponent(opt.en);
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        return `
      <div style="margin-bottom:16px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="background:#f8fafc;padding:12px 18px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">UA — для Влада</p>
          <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;">${opt.ua}</p>
        </div>
        <div style="padding:12px 18px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;">EN — для клієнта</p>
          <p style="margin:0 0 12px;color:#334155;font-size:14px;line-height:1.6;">${opt.en}</p>
          <a href="${mailtoLink}" style="display:inline-block;background:#1d4ed8;color:#fff;font-size:13px;font-weight:600;padding:8px 18px;border-radius:8px;text-decoration:none;">Send to client</a>
        </div>
      </div>`;
      })
      .join("")}
  </div>

  ${
    analysis.internalNotes
      ? `
  <div style="padding:24px 32px 0;">
    <h2 style="margin:0 0 12px;font-size:15px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;">Notes for Vlad</h2>
    <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:14px 18px;color:#92400e;">${analysis.internalNotes}</div>
  </div>`
      : ""
  }

  <div style="padding:28px 32px;margin-top:24px;border-top:1px solid #f1f5f9;text-align:center;color:#94a3b8;font-size:13px;">
    TurchV LLC Handyman · Charlotte, NC · <a href="tel:+17049128521" style="color:#1d4ed8;">+1 (704) 912-8521</a>
  </div>

</div>
</body>
</html>`;

    const attachments: {
      filename: string;
      content: Buffer;
      content_id?: string;
      inline?: boolean;
    }[] = [];
    if (photoAttached && photoBuffer) {
      attachments.push({
        filename: `client-photo-${Date.now()}.${photoExt}`,
        content: photoBuffer,
        content_id: "clientphoto",
        inline: true,
      });
    }

    await resend.emails.send({
      from: "TurchV Handyman <onboarding@resend.dev>",
      to: ["turchvladhandyman@gmail.com"],
      subject: `New Quote: ${name} - ZIP ${zipCode} - ${analysis.estimatedScope?.toUpperCase()}`,
      html: emailHtml,
      ...(attachments.length > 0 && { attachments }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
