import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, jobDescription, zipCode } = body;

    if (!name || !phone || !email || !jobDescription || !zipCode) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "katusakirnicnaa@gmail.com",
      subject: "New Quote Request",
      text: `
New quote request

Name: ${name}
Phone: ${phone}
Email: ${email}
ZIP Code: ${zipCode}

Job Description:
${jobDescription}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
