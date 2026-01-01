"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Wrench, Camera, Hammer, Droplet, ChevronDown, Menu, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GraphiteConsulting() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent-orange rounded flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Graphite Consulting</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium hover:text-accent-orange transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-accent-orange hover:bg-accent-orange/90 text-white"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-accent-orange transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-accent-orange transition-colors"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/construction-worker-in-hard-hat-at-modern-construc.jpg" alt="Construction site" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Building Excellence, One Project at a Time
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-light max-w-2xl mx-auto text-balance">
            Professional renovation, plumbing, and construction services you can trust
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-white text-lg px-8"
            >
              Get Free Quote
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-foreground text-lg px-8"
            >
              Our Services
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <a href="tel:8258653688" className="text-xl font-semibold hover:text-accent-orange transition-colors">
              (825) 865-3688
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Comprehensive solutions for all your renovation, construction, and plumbing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-orange/20 transition-colors">
                  <Wrench className="w-8 h-8 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Renovation Services</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Transform your residential or commercial space with our expert renovation services. From kitchen and
                  bathroom remodels to complete home makeovers, we bring your vision to life with precision and
                  craftsmanship.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Kitchen & bathroom remodeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Basement finishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Commercial renovations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-orange/20 transition-colors">
                  <Camera className="w-8 h-8 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Drain Inspections</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  State-of-the-art camera inspection technology to diagnose drain and sewer line issues quickly and
                  accurately. Prevent costly repairs with our comprehensive inspection services.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>HD camera inspections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Detailed diagnostics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Preventative maintenance plans</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-orange/20 transition-colors">
                  <Hammer className="w-8 h-8 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Deck Construction</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Create the perfect outdoor living space with our custom deck construction services. From design to
                  completion, we build beautiful, durable decks that enhance your property value.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Custom deck design & build</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Deck repairs & refinishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Pergolas & outdoor structures</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-orange/20 transition-colors">
                  <Droplet className="w-8 h-8 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Plumbing Applications</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Complete residential and commercial plumbing solutions. From routine repairs to complex installations,
                  our licensed plumbers deliver reliable service you can count on.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Emergency plumbing repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Fixture installation & replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Water heater services</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img
                src="/professional-contractor-with-blueprints-at-constru.jpg"
                alt="Austin - Owner"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Austin</h2>
              <h3 className="text-xl text-accent-orange font-semibold mb-4">Owner & Master Craftsman</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 15 years of experience in the construction and renovation industry, Austin founded Graphite
                  Consulting with a simple mission: to deliver exceptional craftsmanship and unparalleled customer
                  service.
                </p>
                <p>
                  What started as a one-man operation has grown into a trusted team of skilled professionals, but our
                  commitment to quality and attention to detail remains unchanged. Every project, big or small, receives
                  the same level of dedication and expertise.
                </p>
                <p>
                  At Graphite Consulting, we believe in building lasting relationships with our clients. We take the
                  time to understand your vision, provide honest recommendations, and execute with precision. Your
                  satisfaction is our success.
                </p>
              </div>
              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <h4 className="font-bold text-lg mb-2">Our Promise</h4>
                <p className="text-muted-foreground">
                  Quality workmanship, transparent pricing, and reliable service on every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              A showcase of our completed projects and craftsmanship
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <img
              src="/modern-kitchen-renovation.png"
              alt="Kitchen renovation"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/wooden-deck-construction.png"
              alt="Deck construction"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/bathroom-plumbing-installation.png"
              alt="Plumbing work"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/basement-renovation-finished.jpg"
              alt="Basement renovation"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/commercial-building-renovation.jpg"
              alt="Commercial renovation"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/outdoor-deck-with-pergola.jpg"
              alt="Outdoor deck"
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent-orange" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "Austin and his team completely transformed our outdated kitchen into a modern masterpiece.
                  Professional, punctual, and the quality is outstanding!"
                </p>
                <p className="font-semibold">Sarah Mitchell</p>
                <p className="text-sm text-muted-foreground">Kitchen Renovation</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent-orange" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "We had a plumbing emergency and Graphite Consulting responded immediately. Fast, reliable, and fair
                  pricing. Highly recommend!"
                </p>
                <p className="font-semibold">James Rodriguez</p>
                <p className="text-sm text-muted-foreground">Emergency Plumbing</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-accent-orange" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "Our custom deck exceeded all expectations. Austin's attention to detail and craftsmanship is second
                  to none. Worth every penny!"
                </p>
                <p className="font-semibold">Emily Chen</p>
                <p className="text-sm text-muted-foreground">Deck Construction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Ready to start your project? Contact us today for a free consultation and quote
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:8258653688"
                      className="text-muted-foreground hover:text-accent-orange transition-colors"
                    >
                      (825) 865-3688
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri: 7am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:ky.group.solutions@gmail.com"
                      className="text-muted-foreground hover:text-accent-orange transition-colors break-all"
                    >
                      ky.group.solutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Service Area</h4>
                    <p className="text-muted-foreground">Serving the greater metro area</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-background rounded-lg">
                <h4 className="font-bold mb-2">Emergency Services Available</h4>
                <p className="text-muted-foreground text-sm">
                  24/7 emergency plumbing services available. Call us anytime for urgent repairs.
                </p>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" name="name" required placeholder="Your full name" />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="(123) 456-7890" />
                    </div>

                    <div>
                      <Label htmlFor="service">Service Type *</Label>
                      <Select name="service" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renovation">Renovation Services</SelectItem>
                          <SelectItem value="drain-inspection">Drain Inspection</SelectItem>
                          <SelectItem value="deck-construction">Deck Construction</SelectItem>
                          <SelectItem value="plumbing">Plumbing Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your project..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-accent-orange rounded flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Graphite Consulting</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Professional renovation, plumbing, and construction services delivered with excellence.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("services")}
                  className="block text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="block text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Graphite Consulting. All rights reserved. | Owned by Austin</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
