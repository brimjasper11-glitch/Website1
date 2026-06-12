import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingWizard from './components/BookingWizard';
import MyBookings from './components/MyBookings';
import Testimonials from './components/Testimonials';
import TherapistSpotlight from './components/TherapistSpotlight';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { MassageService, ConfirmedBooking } from './types';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export default function App() {
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);
  const [preSelectedService, setPreSelectedService] = useState<MassageService | null>(null);
  const [preSelectedDuration, setPreSelectedDuration] = useState<number | null>(null);

  // Initialize and load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kla_mobile_spa_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse local sessional bookings", e);
    }
  }, []);

  const handleBookingConfirmed = (newBooking: ConfirmedBooking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('kla_mobile_spa_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save booking details to local persistence", e);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    const confirmedCancel = window.confirm("Are you sure you want to cancel this scheduled massage booking reference?");
    if (!confirmedCancel) return;

    const filtered = bookings.filter(b => b.id !== bookingId);
    setBookings(filtered);
    try {
      localStorage.setItem('kla_mobile_spa_bookings', JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to update booking list", e);
    }
  };

  const handlePreSelectService = (service: MassageService, duration: number) => {
    setPreSelectedService(service);
    setPreSelectedDuration(duration);
    
    // Auto scroll to booking element
    const elem = document.getElementById('booking-customizer');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      
      {/* Sticky Premium Navigation */}
      <Navbar onScrollTo={handleScrollTo} bookingCount={bookings.length} />

      {/* Main Landing Sections */}
      <main id="main-content-flow" className="flex-grow">
        
        {/* Hero Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* Services & Treatment Options Menu */}
        <Services onPreSelect={handlePreSelectService} />

        {/* Customer Experiences & Feature Highlights */}
        <Testimonials />

        {/* Certified Therapist Profiles */}
        <TherapistSpotlight />

        {/* Interactive Step-by-Step Customizer and Booking Invoice Desk */}
        <BookingWizard
          preSelectedService={preSelectedService}
          preSelectedDuration={preSelectedDuration}
          onBookingConfirmed={handleBookingConfirmed}
        />

        {/* Client Persistent Dashboard Bookings List */}
        <MyBookings bookings={bookings} onCancelBooking={handleCancelBooking} />

        {/* Common Logistics Questions */}
        <FAQ />

      </main>

      {/* Localized Footer */}
      <Footer onScrollTo={handleScrollTo} />

    </div>
  );
}
