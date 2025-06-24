"use client"

import type React from "react"
import Header from "@/components/Header"
import AboutSection from "@/components/AboutSection"
import FeaturesSection from "@/components/FeaturesSection"
import ContactSection from "@/components/ContactSection"
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"
import PartnersSection from "@/components/PartnersSection"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}