"use client"

import type React from "react"
import Header from "@/components/Header"
import AboutSection from "@/components/AboutSection"
import FeaturesSection from "@/components/FeaturesSection"
import ContactSection from "@/components/ContactSection"
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}