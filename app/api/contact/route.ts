import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json()

    console.log("[v0] Contact form submission received:", { name, email, phone, service, message })

    // Validate inputs
    if (!name || !email || !phone || !service || !message) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL || "ky.group.solutions@gmail.com",
        pass: process.env.SMTP_PASSWORD || "auvlzymemgymkwnc",
      },
    })

    console.log("[v0] Transporter created, attempting to send emails...")

    // Email to business owner
    const ownerMailOptions = {
      from: process.env.SMTP_EMAIL || "ky.group.solutions@gmail.com",
      to: "ky.group.solutions@gmail.com",
      subject: `New Lead from ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #ff6b35; padding-bottom: 10px;">New Lead from Graphite Consulting Website</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ff6b35; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Service Requested:</strong> ${service}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #ff6b35;">Message</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff6b35; border-radius: 4px;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>This email was sent from the Graphite Consulting website contact form.</p>
          </div>
        </div>
      `,
    }

    // Auto-reply email to customer
    const customerMailOptions = {
      from: process.env.SMTP_EMAIL || "ky.group.solutions@gmail.com",
      to: email,
      subject: "Thank you for contacting Graphite Consulting",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Graphite Consulting</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #1a1a1a;">Thank you for reaching out, ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              We've received your inquiry regarding <strong>${service}</strong> and will get back to you within 24 hours.
            </p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
              <h3 style="color: #ff6b35; margin-top: 0;">Your Message</h3>
              <p style="color: #666;">${message}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              In the meantime, if you have any urgent questions, feel free to call us at:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:8258653688" style="display: inline-block; background-color: #ff6b35; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">
                (825) 865-3688
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              <strong>Business Hours:</strong><br>
              Monday - Friday: 7:00 AM - 6:00 PM<br>
              Emergency services available 24/7
            </p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} Graphite Consulting. All rights reserved.
            </p>
            <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
              Professional Renovation, Plumbing & Construction Services
            </p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(ownerMailOptions)
    console.log("[v0] Owner notification email sent successfully")

    await transporter.sendMail(customerMailOptions)
    console.log("[v0] Customer auto-reply email sent successfully")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
