# Graphite Consulting Website

A professional, modern website for Graphite Consulting - a renovation and plumbing services company owned by Austin.

## Features

- **Modern Design**: Clean, professional graphite-themed design with orange accent colors
- **Responsive Layout**: Fully responsive design that works on all devices
- **Full-Screen Hero**: Eye-catching hero section with construction imagery
- **Services Showcase**: Detailed presentation of all services offered
- **Contact Form**: Functional contact form with email integration
- **Email Notifications**: Automated email sending to business owner and auto-reply to customers
- **Testimonials**: Customer reviews and ratings
- **Project Gallery**: Showcase of completed work
- **Smooth Navigation**: Sticky navigation with smooth scrolling

## Services Offered

1. **Renovation Services** - Home and business renovations
2. **Drain Inspections** - Camera inspections and diagnostics
3. **Deck Construction** - Custom decks, repairs, and maintenance
4. **Plumbing Applications** - Residential and commercial plumbing

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui components
- **Email**: Nodemailer with Gmail SMTP
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## Environment Variables

Add these to your `.env.local` file (optional - defaults are provided):

```
SMTP_EMAIL=ky.group.solutions@gmail.com
SMTP_PASSWORD=auvl zyme mgym kwnc
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Email Configuration

The contact form sends emails using Gmail SMTP. The credentials are configured in the code, but you can override them with environment variables.

**Email Flow**:
- Customer submits the contact form
- Business owner receives detailed lead notification at ky.group.solutions@gmail.com
- Customer receives automatic confirmation email

## Customization

### Colors
The graphite theme uses:
- **Primary**: Dark gray/black tones (#1a1a1a)
- **Secondary**: Light gray (#f5f5f5)
- **Accent**: Orange (#ff6b35)

Modify colors in `app/globals.css` under the `:root` section.

### Content
Update company information in `app/page.tsx`:
- Hero section text
- Service descriptions
- About section
- Testimonials
- Contact information

### Images
Replace placeholder images with real photos:
- Hero background image
- Service images
- Gallery photos
- About section photo

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard (optional)
4. Deploy!

The site will be live at your Vercel URL.

## Contact Information

- **Company**: Graphite Consulting
- **Owner**: Austin
- **Phone**: (825) 865-3688
- **Email**: ky.group.solutions@gmail.com

## License

© 2026 Graphite Consulting. All rights reserved.
