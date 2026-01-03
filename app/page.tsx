"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Wrench, ChevronDown, Menu, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GraphiteConsulting() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [videoLoaded, setVideoLoaded] = useState(false)
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
      service: selectedService,
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      e.currentTarget.reset()
      setSelectedService("")
    } catch (error) {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      e.currentTarget.reset()
      setSelectedService("")
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
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-lg sm:text-2xl font-bold text-foreground truncate">Graphite Consulting</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("home")}
                className="font-bold hover:text-accent-orange transition-colors text-base text-chart-1"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="font-bold hover:text-accent-orange transition-colors text-chart-1 text-base"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-bold hover:text-accent-orange transition-colors text-chart-1 text-base"
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
            <div className="md:hidden py-3 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left py-2 px-4 text-sm font-semibold hover:text-accent-orange transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 px-4 text-sm font-semibold hover:text-accent-orange transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 px-4 text-sm font-semibold hover:text-accent-orange transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 mx-4 bg-accent-orange hover:bg-accent-orange/90 text-white"
              >
                Get Quote
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Loading Screen */}
      {!videoLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-sm sm:text-base">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoLoaded(true)}
            className="w-full h-full object-fill"
          >
            <source
              src="https://rpockdpjwjy9bsjo.public.blob.vercel-storage.com/Gen-4_5%20Macro%20cinematic%20shot%20of%20a%20holographic%20wireframe%20scan%20emanating%20from%20a%20inspection%20camera%20head%2C%20revealing%20a%20hairline%20crack%20in%20a%20giant%2C%20damp%20concrete%20sewer%20pipe%20Cyberpunk%20blue%20light%2C%20photorealis%20.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-balance">
            Building Excellence, One Project at a Time
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-muted-light max-w-2xl mx-auto text-balance">
            Professional renovation, plumbing, and construction services you can trust
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold px-6 sm:px-8 w-full sm:w-auto"
            >
              Get Free Quote
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-white font-semibold px-6 sm:px-8 w-full sm:w-auto"
            >
              Our Services
            </Button>
          </div>
          <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-sm sm:text-base">
            <Phone className="w-5 h-5 flex-shrink-0" />
            <a href="tel:8258653688" className="font-semibold hover:text-accent-orange transition-colors">
              (825) 865-3688
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("services")}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Comprehensive solutions for all your renovation, construction, and plumbing needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Renovation Services</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Transform your residential or commercial space with our expert renovation services. From kitchen and
                  bathroom remodels to complete home makeovers, we bring your vision to life with precision and
                  craftsmanship.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Kitchen and bathroom remodeling</span>
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
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Drain Inspections</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  State-of-the-art camera inspection technology to diagnose drain and sewer line issues quickly and
                  accurately. Prevent costly repairs with our comprehensive inspection services.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>HD camera inspections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Detailed diagnostics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Preventative maintenance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Deck Construction</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Create the perfect outdoor living space with our custom deck construction services. From design to
                  completion, we build beautiful, durable decks that enhance your property value.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Custom deck design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Deck repairs and finishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Outdoor structures</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-accent-orange">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Plumbing Services</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Complete residential and commercial plumbing solutions. From routine repairs to complex installations,
                  our licensed plumbers deliver reliable service you can count on.
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Emergency plumbing repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />
                    <span>Fixture installation</span>
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

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Ready to start your project? Contact us today for a free consultation and quote
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:8258653688"
                      className="text-muted-foreground hover:text-accent-orange transition-colors break-all text-sm sm:text-base"
                    >
                      (825) 865-3688
                    </a>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Mon-Fri: 7am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:ky.group.solutions@gmail.com"
                      className="text-muted-foreground hover:text-accent-orange transition-colors break-all text-sm sm:text-base"
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
                    <p className="text-muted-foreground text-sm sm:text-base">Serving the greater metro area</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-background rounded-lg">
                <h4 className="font-bold mb-2">Emergency Services</h4>
                <p className="text-muted-foreground text-sm">
                  24/7 emergency plumbing services available. Call us anytime for urgent repairs.
                </p>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6">Request a Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm">
                        Name
                      </Label>
                      <Input id="name" name="name" required placeholder="Your full name" className="text-sm" />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="(123) 456-7890"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-sm">
                        Service Type
                      </Label>
                      <Select name="service" required value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="text-sm">
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
                      <Label htmlFor="message" className="text-sm">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your project..."
                        rows={4}
                        className="text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white text-sm"
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
      <footer className="bg-background border-t border-border py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-accent-orange rounded flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Graphite</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Professional renovation, plumbing, and construction services delivered with excellence.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("services")}
                  className="block text-xs sm:text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-xs sm:text-sm text-muted-foreground hover:text-accent-orange transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Connect With Us</h4>
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.666 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.849-.07-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.204.013 3.663.07 4.849.149 3.227 1.664 4.771 4.919 4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>{new Date().getFullYear()} Graphite Consulting. All rights reserved. Owned by Austin</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
