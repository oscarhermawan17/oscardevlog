import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "oscardevlog.me <noreply@oscardevlog.me>",
    to: "oscar.hermawan90@gmail.com",
    replyTo: email,
    subject: `[Contact] ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#38BDF8">New message from oscardevlog.me</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#64748B;width:80px">Name</td>
            <td style="padding:8px 0;color:#F8FAFC">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#64748B">Email</td>
            <td style="padding:8px 0;color:#F8FAFC">${email}</td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #1E293B;margin:16px 0"/>
        <p style="color:#94A3B8;white-space:pre-wrap">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
