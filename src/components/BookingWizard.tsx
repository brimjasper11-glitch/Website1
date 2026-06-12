import React, { useState, useEffect } from 'react';
import { SERVICES, ADD_ONS, THERAPISTS, NEIGHBORHOODS } from '../data';
import { MassageService, AddOnOption, Therapist, KampalaNeighborhood, NewBooking, ConfirmedBooking } from '../types';
import { Clock, Check, Sparkles, MapPin, Calendar, Clock5, UserCheck, ShieldCheck, Mail, Phone, ShoppingCart, HelpCircle, AlertCircle, Copy, CheckCircle } from 'lucide-react';

interface BookingWizardProps {
  preSelectedService: MassageService | null;
  preSelectedDuration: number | null;
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
}

export default function BookingWizard({ preSelectedService, preSelectedDuration, onBookingConfirmed }: BookingWizardProps) {
  // Wizard steps
  const [step, setStep] = useState<number>(1);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Selected state
  const [selectedService, setSelectedService] = useState<MassageService>(preSelectedService || SERVICES[0]);
  const [selectedDuration, setSelectedDuration] = useState<number>(preSelectedDuration || SERVICES[0].durationOptions[0].duration);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [therapistPreference, setTherapistPreference] = useState<string>('any');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>(NEIGHBORHOODS[0].id);
  const [oilPreference, setOilPreference] = useState<string>('shea-butter-lavender');
  
  // Custom address, dates & client details
  const [addressDetails, setAddressDetails] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Surcharges & Calculations
  const [isLateNightSurcharge, setIsLateNightSurcharge] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Set selected parameters when preSelectedService updates from above
  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
      if (preSelectedDuration) {
        setSelectedDuration(preSelectedDuration);
      } else {
        setSelectedDuration(preSelectedService.durationOptions[0].duration);
      }
      // Scroll to the booking wizard automatically
      const elem = document.getElementById('booking-customizer');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preSelectedService, preSelectedDuration]);

  // Surcharge logic based on selected time
  useEffect(() => {
    if (bookingTime) {
      const hour = parseInt(bookingTime.split(':')[0], 10);
      if (hour >= 22 || hour < 5) {
        setIsLateNightSurcharge(true);
      } else {
        setIsLateNightSurcharge(false);
      }
    } else {
      setIsLateNightSurcharge(false);
    }
  }, [bookingTime]);

  // Set default modern date and time
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setBookingDate(`${yyyy}-${mm}-${dd}`);
    setBookingTime('14:30');
  }, []);

  const currentPriceOption = selectedService.durationOptions.find(o => o.duration === selectedDuration) 
    || selectedService.durationOptions[0];

  const serviceCost = currentPriceOption.price;

  const addOnsCost = selectedAddOns.reduce((acc, currentId) => {
    const option = ADD_ONS.find(a => a.id === currentId);
    return acc + (option ? option.price : 0);
  }, 0);

  const neighborhood = NEIGHBORHOODS.find(n => n.id === selectedNeighborhood) || NEIGHBORHOODS[0];
  const transportationCost = neighborhood.transportFee;

  const lateNightSurchargeCost = isLateNightSurcharge ? 20000 : 0;
  const totalCost = serviceCost + addOnsCost + transportationCost + lateNightSurchargeCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId) 
        : [...prev, addOnId]
    );
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    const service = SERVICES.find(s => s.id === sId);
    if (service) {
      setSelectedService(service);
      setSelectedDuration(service.durationOptions[0].duration);
    }
  };

  // Compile booking statistics into text for WhatsApp
  const generateWhatsAppMessage = () => {
    const chosenAddOns = selectedAddOns
      .map(id => ADD_ONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const selectedTherapistName = therapistPreference === 'any' 
      ? 'Any certified professional' 
      : therapistPreference === 'female' 
      ? 'Female therapist preference' 
      : therapistPreference === 'male' 
      ? 'Male therapist preference' 
      : THERAPISTS.find(t => t.id === therapistPreference)?.name || 'Specified therapist';

    const text = `*KLA MOBILE SPA BOOKING REQUEST* 🌿🧘‍♀️\n---------------------------------\n` +
      `• *Client Name:* ${clientName || 'GUEST CLIENT'}\n` +
      `• *Phone Number:* ${clientPhone || 'N/A'}\n` +
      `• *Treatment Package:* ${selectedService.name} (${selectedDuration} Mins)\n` +
      `• *Custom Add-Ons:* ${chosenAddOns || 'None selected'}\n` +
      `• *Ugandan Shea Customization:* ${oilPreference === 'shea-butter-lavender' ? 'Shea Butter + Lavender Essential' : oilPreference === 'shea-butter-eucalyptus' ? 'Shea Butter + Eucalyptus oil' : 'Classic Coconut and floral oils'}\n` +
      `• *Therapist Preference:* ${selectedTherapistName}\n` +
      `• *Kampala Zone:* ${neighborhood.name}\n` +
      `• *Detailed Address:* ${addressDetails || 'Provided upon dispatcher callback'}\n` +
      `• *Scheduled slot:* ${bookingDate} at ${bookingTime} ${isLateNightSurcharge ? '(Late Night Hour dispatch)' : ''}\n` +
      `---------------------------------\n` +
      `• *Service Cost:* ${formatPrice(serviceCost)}\n` +
      `• *Sessional Excursion Add-Ons:* ${formatPrice(addOnsCost)}\n` +
      `• *Kampala transport logistics:* ${formatPrice(transportationCost)}\n` +
      `${isLateNightSurcharge ? `• *Late-Night premium:* ${formatPrice(lateNightSurchargeCost)}\n` : ''}` +
      `💰 *Total Estimated cost:* ${formatPrice(totalCost)}\n` +
      `---------------------------------\n` +
      `_Kindly confirm therapist availability for this scheduled slot. Web reference ID: ${Math.floor(1000 + Math.random() * 9000)}_`;

    return encodeURIComponent(text);
  };

  const executeWhatsAppLaunch = () => {
    const formattedTel = "256751234567"; // Real business line or mock gateway
    const waUrl = `https://wa.me/${formattedTel}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  const copyWhatsAppPayload = () => {
    const chosenAddOns = selectedAddOns
      .map(id => ADD_ONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const selectedTherapistName = therapistPreference === 'any' 
      ? 'Any certified' 
      : THERAPISTS.find(t => t.id === therapistPreference)?.name || therapistPreference + ' therapist';

    const plainText = `KLA MOBILE SPA BOOKING REQUEST\n---------------------------------\n` +
      `Client: ${clientName || 'GUEST'}\n` +
      `Phone: ${clientPhone || 'N/A'}\n` +
      `Treatment: ${selectedService.name} (${selectedDuration} Mins)\n` +
      `Aromatherapy Pack: ${oilPreference}\n` +
      `Add-Ons: ${chosenAddOns || 'None'}\n` +
      `Therapist: ${selectedTherapistName}\n` +
      `Zone: ${neighborhood.name}\n` +
      `Address: ${addressDetails}\n` +
      `Schedule: ${bookingDate} @ ${bookingTime}\n` +
      `---------------------------------\n` +
      `Total Cost: ${formatPrice(totalCost)}`;

    navigator.clipboard.writeText(plainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !addressDetails || !bookingDate || !bookingTime) {
      alert('Please fill out all scheduling details, phone number, and address fields to confirm your therapist.');
      return;
    }

    const bookingId = `SPA-${Date.now().toString().slice(-6)}-UG`;
    const confirmed: ConfirmedBooking = {
      id: bookingId,
      serviceId: selectedService.id,
      duration: selectedDuration,
      addOns: selectedAddOns,
      therapistPreference: therapistPreference,
      neighborhoodId: selectedNeighborhood,
      addressDetails: addressDetails,
      clientName: clientName,
      clientPhone: clientPhone,
      bookingDate: bookingDate,
      bookingTime: bookingTime,
      specialInstructions: specialInstructions,
      createdAt: new Date().toISOString(),
      totalCost: totalCost,
      status: 'pending_confirmation'
    };

    setLastConfirmedBooking(confirmed);
    onBookingConfirmed(confirmed);
    setSuccessModalOpen(true);
  };

  return (
    <section id="booking-customizer" className="py-24 bg-[#1F4031] text-[#FDF9F3] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#142A20]/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">24/7 Dispatch Desk</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FDF9F3] mt-1 font-black tracking-tight">
            Configure Your Spa Session
          </h2>
          <div className="h-1 w-24 bg-[#C05B3D] mx-auto mt-4 rounded-full" />
          <p className="text-[#FDF9F3]/80 mt-4 text-base font-medium">
            Craft your custom wellness kit on-the-fly. Choose your local aromatherapy, therapist 
            demographic, and Kampala sector. Our therapists bring the entire table and oils package directly to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT PANEL: The Wizard Steps */}
          <div className="lg:col-span-7 bg-[#142A20]/50 border border-[#FDF9F3]/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 border-b border-[#FDF9F3]/10 pb-5 text-xs font-mono text-[#FDF9F3]/60 font-semibold gap-2 overflow-x-auto">
              <button type="button" onClick={() => setStep(1)} className={`pb-2 shrink-0 cursor-pointer ${step === 1 ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-black' : 'hover:text-[#FDF9F3]'}`}>1. Treatments & Extras</button>
              <button type="button" onClick={() => setStep(2)} className={`pb-2 shrink-0 cursor-pointer ${step === 2 ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-black' : 'hover:text-[#FDF9F3]'}`}>2. Therapist & Aroma</button>
              <button type="button" onClick={() => setStep(3)} className={`pb-2 shrink-0 cursor-pointer ${step === 3 ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-black' : 'hover:text-[#FDF9F3]'}`}>3. Zone & Schedule</button>
              <button type="button" onClick={() => setStep(4)} className={`pb-2 shrink-0 cursor-pointer ${step === 4 ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-black' : 'hover:text-[#FDF9F3]'}`}>4. Confirm</button>
            </div>

            <form onSubmit={handleSubmitBooking}>
              
              {/* STEP 1: SERVICE AND ADD-ONS */}
              {step === 1 && (
                <div id="step-1-content" className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-serif text-amber-gold-100 font-semibold flex items-center space-x-2">
                    <span className="flex items-center justify-center bg-gold-accent-400 text-emerald-luxury-900 rounded-full w-6 h-6 text-xs font-bold font-mono">1</span>
                    <span>Choose Massage Therapy Package</span>
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold">Select Base Service:</label>
                    <select
                      id="booking-service-select"
                      value={selectedService.id}
                      onChange={handleServiceChange}
                      className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500 cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Active Service duratonal toggles */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold">Session Length & Duration:</label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedService.durationOptions.map((opt) => (
                        <button
                          key={opt.duration}
                          id={`booking-duration-opt-${opt.duration}`}
                          type="button"
                          onClick={() => setSelectedDuration(opt.duration)}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                            selectedDuration === opt.duration
                              ? 'bg-gradient-to-br from-gold-accent-500 to-terracotta-500 text-emerald-luxury-950 font-extrabold border-transparent shadow shadow-gold-accent-500/20'
                              : 'bg-emerald-luxury-900 border-emerald-luxury-700 text-amber-gold-100 hover:bg-emerald-luxury-800'
                          }`}
                        >
                          <span className="block text-[10px] uppercase font-bold">{opt.duration} mins</span>
                          <span className="block mt-0.5 text-xs opacity-80">{formatPrice(opt.price)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Add-ons Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Optional Luxury Excursion Add-Ons:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="booking-addons">
                      {ADD_ONS.map((option) => {
                        const isChecked = selectedAddOns.includes(option.id);
                        return (
                          <div
                            key={option.id}
                            id={`addon-card-${option.id}`}
                            onClick={() => handleAddOnToggle(option.id)}
                            className={`p-3.5 rounded-xl border flex justify-between items-start cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-luxury-800 border-gold-accent-500/50 text-gold-accent-400'
                                : 'bg-emerald-luxury-900/60 border-emerald-luxury-800 text-amber-gold-100/70 hover:bg-emerald-luxury-900 hover:border-emerald-luxury-700'
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="block text-xs font-bold leading-tight">{option.name}</span>
                              <span className="block text-[10px] opacity-80 leading-snug">{option.description}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="block text-xs font-mono font-bold">+{formatPrice(option.price)}</span>
                              <span className={`inline-flex items-center justify-center border rounded w-4 h-4 ml-auto mt-2 transition-all ${
                                isChecked ? 'bg-gold-accent-400 border-gold-accent-400 text-emerald-luxury-950' : 'border-emerald-luxury-700'
                              }`}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      id="step1-next-btn"
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-gold-accent-500 hover:bg-gold-accent-600 text-emerald-luxury-950 py-3 px-8 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Next: Therapist Selection & Aroma
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: THERAPIST PREFERENCE & KMP BOTANICAL CUSTOMIZATION */}
              {step === 2 && (
                <div id="step-2-content" className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-serif text-amber-gold-100 font-semibold flex items-center space-x-2">
                    <span className="flex items-center justify-center bg-gold-accent-400 text-emerald-luxury-900 rounded-full w-6 h-6 text-xs font-bold font-mono">2</span>
                    <span>Staff Demographics & Aromatherapy</span>
                  </h3>

                  {/* Certified Therapist Choice */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Therapist Assignment:</label>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setTherapistPreference('any')}
                        className={`py-3.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          therapistPreference === 'any'
                            ? 'bg-emerald-luxury-800 border-gold-accent-500 text-gold-accent-400 font-bold'
                            : 'bg-emerald-luxury-900 border-emerald-luxury-800 text-amber-gold-100/70 hover:bg-emerald-luxury-850'
                        }`}
                      >
                        <span className="block text-xl">✨</span>
                        <span className="block text-xs mt-1 font-bold">Any Certified</span>
                        <span className="block text-[9px] opacity-60">Instantly allocated</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTherapistPreference('female')}
                        className={`py-3.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          therapistPreference === 'female'
                            ? 'bg-emerald-luxury-800 border-gold-accent-500 text-gold-accent-400 font-bold'
                            : 'bg-emerald-luxury-900 border-emerald-luxury-800 text-amber-gold-100/70 hover:bg-emerald-luxury-850'
                        }`}
                      >
                        <span className="block text-xl">👩‍⚕️</span>
                        <span className="block text-xs mt-1 font-bold">Female Staff</span>
                        <span className="block text-[9px] opacity-60">Highly trained</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTherapistPreference('male')}
                        className={`py-3.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          therapistPreference === 'male'
                            ? 'bg-emerald-luxury-800 border-gold-accent-500 text-gold-accent-400 font-bold'
                            : 'bg-emerald-luxury-900 border-emerald-luxury-800 text-amber-gold-100/70 hover:bg-emerald-luxury-850'
                        }`}
                      >
                        <span className="block text-xl">👨‍⚕️</span>
                        <span className="block text-xs mt-1 font-bold">Male Staff</span>
                        <span className="block text-[9px] opacity-60">Muscle focus</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-amber-gold-200/50 font-mono italic">
                      Note: You can request specific named staff below if you prefer a repeated therapist.
                    </p>

                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold">Request Specific Therapist (Optional):</label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {THERAPISTS.map((therapist) => (
                          <div
                            key={therapist.id}
                            onClick={() => setTherapistPreference(therapist.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              therapistPreference === therapist.id
                                ? 'bg-emerald-luxury-850 border-gold-accent-500 text-gold-accent-400'
                                : 'bg-emerald-luxury-900/40 border-emerald-luxury-800/60 text-amber-gold-100/70 hover:bg-emerald-luxury-900'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{therapist.avatar}</span>
                              <div>
                                <h4 className="text-xs font-bold">{therapist.name}</h4>
                                <p className="text-[10px] opacity-75">{therapist.specialties[0]} • Rating ★ {therapist.rating}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono bg-emerald-luxury-800 text-amber-gold-300 py-0.5 px-2 rounded">
                                {therapist.completedSessions}+ sessions
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Oil Preference Customization */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Infused Aromatherapy Oil Customization:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label id="oil-box-shea-lavender" className="relative block">
                        <input
                          type="radio"
                          name="oil"
                          value="shea-butter-lavender"
                          checked={oilPreference === 'shea-butter-lavender'}
                          onChange={() => setOilPreference('shea-butter-lavender')}
                          className="peer sr-only"
                        />
                        <div className="p-3 bg-emerald-luxury-900 border border-emerald-luxury-800 peer-checked:border-gold-accent-500 text-amber-gold-100 peer-checked:text-gold-accent-400 rounded-xl cursor-pointer text-center text-xs space-y-1 transition-all">
                          <span className="block text-base">🏺</span>
                          <span className="block font-bold">Northern Shea Butter</span>
                          <span className="block text-[9px] opacity-70">Organic Lavender</span>
                        </div>
                      </label>

                      <label id="oil-box-shea-eucalyptus" className="relative block">
                        <input
                          type="radio"
                          name="oil"
                          value="shea-butter-eucalyptus"
                          checked={oilPreference === 'shea-butter-eucalyptus'}
                          onChange={() => setOilPreference('shea-butter-eucalyptus')}
                          className="peer sr-only"
                        />
                        <div className="p-3 bg-emerald-luxury-900 border border-emerald-luxury-800 peer-checked:border-gold-accent-500 text-amber-gold-100 peer-checked:text-gold-accent-400 rounded-xl cursor-pointer text-center text-xs space-y-1 transition-all">
                          <span className="block text-base">🌿</span>
                          <span className="block font-bold">Shea & Mint</span>
                          <span className="block text-[9px] opacity-70">Clear Airways</span>
                        </div>
                      </label>

                      <label id="oil-box-coconut" className="relative block">
                        <input
                          type="radio"
                          name="oil"
                          value="coconut-citrus"
                          checked={oilPreference === 'coconut-citrus'}
                          onChange={() => setOilPreference('coconut-citrus')}
                          className="peer sr-only"
                        />
                        <div className="p-3 bg-emerald-luxury-900 border border-emerald-luxury-800 peer-checked:border-gold-accent-500 text-amber-gold-100 peer-checked:text-gold-accent-400 rounded-xl cursor-pointer text-center text-xs space-y-1 transition-all">
                          <span className="block text-base">🥥</span>
                          <span className="block font-bold">Tropical Coconut</span>
                          <span className="block text-[9px] opacity-70">Light Citrus Blend</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-amber-gold-200 border border-emerald-luxury-800 hover:bg-emerald-luxury-800/40 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-gold-accent-500 hover:bg-gold-accent-600 text-emerald-luxury-950 py-3 px-8 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Next: Zone & Scheduling
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: KAMPALA ZONE & DATE/TIME SELECT */}
              {step === 3 && (
                <div id="step-3-content" className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-serif text-amber-gold-100 font-semibold flex items-center space-x-2">
                    <span className="flex items-center justify-center bg-gold-accent-400 text-emerald-luxury-900 rounded-full w-6 h-6 text-xs font-bold font-mono">3</span>
                    <span>Kampala Zone & Scheduling</span>
                  </h3>

                  {/* Neighborhood Choice */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold">Select Kampala Neighborhood Sector:</label>
                    <select
                      id="booking-neighborhood-select"
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500 cursor-pointer"
                    >
                      {NEIGHBORHOODS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name} (+{formatPrice(n.transportFee)} transport)
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-amber-gold-200/60 leading-relaxed italic">
                      {neighborhood.description}
                    </p>
                  </div>

                  {/* Scheduling fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-accent-400" />
                        <span>Date Of Session:</span>
                      </label>
                      <input
                        type="date"
                        id="booking-date-input"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                        <Clock5 className="w-3.5 h-3.5 text-gold-accent-400" />
                        <span>Preferred Start Time:</span>
                      </label>
                      <input
                        type="time"
                        id="booking-time-input"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        required
                        className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Late night alarm warning */}
                  {isLateNightSurcharge && (
                    <div className="p-3 bg-amber-gold-700/30 border border-amber-gold-600 rounded-xl text-xs space-y-1 text-amber-gold-100 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-gold-accent-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Late-Night Safe Dispatch Premium Activated</span>
                        <span className="block mt-0.5 font-light text-[11px] opacity-90">
                          Because your booking starts after 10 PM (22:00) until 5 AM, a flat surcharge of UGX 20,000 has been applied for direct midnight therapist transport support.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Physical Address description */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold">Physical Destination Details:</label>
                    <textarea
                      id="booking-address-input"
                      value={addressDetails}
                      onChange={(e) => setAddressDetails(e.target.value)}
                      required
                      placeholder="e.g. Kololo Court Apartments, Block B, Flat 4, or Kampala Sheraton Hotel Room 302..."
                      rows={3}
                      className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-amber-gold-200 border border-emerald-luxury-800 hover:bg-emerald-luxury-800/40 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="bg-gold-accent-500 hover:bg-gold-accent-600 text-emerald-luxury-950 py-3 px-8 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Next: Client Info & Confirm
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT INFO & SUBMIT */}
              {step === 4 && (
                <div id="step-4-content" className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-serif text-amber-gold-100 font-semibold flex items-center space-x-2">
                    <span className="flex items-center justify-center bg-gold-accent-400 text-emerald-luxury-900 rounded-full w-6 h-6 text-xs font-bold font-mono">4</span>
                    <span>Secure Client & Confirmation</span>
                  </h3>

                  {/* Contact Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Your Name:</label>
                      <input
                        type="text"
                        id="booking-client-name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        placeholder="e.g. Florence K."
                        className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Phone / WhatsApp Number (Required):</label>
                      <input
                        type="tel"
                        id="booking-client-phone"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                        placeholder="e.g. +256 772 123456"
                        className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-amber-gold-200/50 uppercase tracking-widest font-bold block">Special Instructions or Health Notes (Optional):</label>
                      <textarea
                        id="booking-special-instructions"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any health notes, pressure preferences, access instructions..."
                        rows={2}
                        className="w-full bg-emerald-luxury-900 text-amber-gold-100 border border-emerald-luxury-700 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold-accent-500"
                      />
                    </div>
                  </div>

                  {/* Kampala Payment Note */}
                  <div className="p-3.5 bg-emerald-luxury-950 border border-emerald-luxury-800 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-gold-accent-400">💳 Payment Methods Accepted on Arrival:</span>
                    <p className="text-[11px] opacity-80 mt-0.5 leading-relaxed">
                      We support stress-free payments options including MTN Mobile Money, Airtel Money, 
                      reputable Credit/Debit cards, or Cash directly following completion of your mobile spa treatment.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-amber-gold-200 border border-emerald-luxury-800 hover:bg-emerald-luxury-800/40 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Back
                    </button>
                    
                    <button
                      id="booking-confirm-submit-button"
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-gold-accent-500 to-terracotta-500 hover:from-gold-accent-600 hover:to-terracotta-600 text-emerald-luxury-950 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-widest text-center transition-all shadow-md cursor-pointer"
                    >
                      Schedule Treatment & Confirm
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT PANEL: Live Invoice Calculator */}
          <div className="lg:col-span-5 bg-emerald-luxury-950/70 border border-emerald-luxury-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2 text-gold-accent-500">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Session Pricing Breakdown</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-gold-200/40">Treatment Model Selected</span>
                <div className="flex justify-between items-start mt-2">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-amber-gold-50">{selectedService.name}</h4>
                    <p className="text-xs font-mono text-gold-accent-400/80 mt-1">{selectedDuration} Minutes duration slot</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-amber-gold-50">{formatPrice(serviceCost)}</span>
                </div>
              </div>

              {/* Oils chosen */}
              <div className="border-t border-emerald-luxury-850 pt-3">
                <span className="text-[11px] font-mono uppercase text-amber-gold-200/40">Customized Aromas</span>
                <p className="text-xs text-amber-gold-100 font-medium mt-1">
                  {oilPreference === 'shea-butter-lavender' 
                    ? '🏺 Organic Northern Shea Butter & Lavender' 
                    : oilPreference === 'shea-butter-eucalyptus' 
                    ? '🌿 Northern Shea & Refreshing Mint' 
                    : '🥥 Tropical Coconut & Citrus Infusion'}
                </p>
              </div>

              {/* Add-ons detail list */}
              {selectedAddOns.length > 0 && (
                <div className="border-t border-emerald-luxury-850 pt-3 space-y-1.5" id="breakdown-addons-list">
                  <span className="text-[11px] font-mono uppercase text-amber-gold-200/40">Selected Accessories:</span>
                  {selectedAddOns.map((id) => {
                    const option = ADD_ONS.find(o => o.id === id);
                    if (!option) return null;
                    return (
                      <div key={id} className="flex justify-between text-xs text-amber-gold-100/70">
                        <span>✦ {option.name}</span>
                        <span className="font-mono">{formatPrice(option.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Transport fee segment */}
              <div className="border-t border-emerald-luxury-850 pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-medium text-amber-gold-100">Transport Logistics Fee ({neighborhood.name.split(' (')[0]}):</span>
                </div>
                <span className="font-mono text-amber-gold-50">{formatPrice(transportationCost)}</span>
              </div>

              {/* Late Night Surcharge segment */}
              {isLateNightSurcharge && (
                <div className="border-t border-emerald-luxury-850 pt-3 flex justify-between items-center text-xs text-amber-gold-300">
                  <span>● Late-Night (10PM-5AM) Safe Travel Fee:</span>
                  <span className="font-mono">+{formatPrice(20000)}</span>
                </div>
              )}

              {/* Total segment */}
              <div className="border-t border-emerald-luxury-800 pt-5 flex justify-between items-baseline">
                <span className="text-sm font-serif font-bold text-amber-gold-100">Estimated Total Cost:</span>
                <span className="text-2xl font-bold text-gold-accent-400 font-mono" id="breakdown-total-cost">
                  {formatPrice(totalCost)}
                </span>
              </div>
            </div>

            {/* Instant conversion box to encourage bookings */}
            <div className="bg-emerald-luxury-900/60 p-4 rounded-2xl border border-emerald-luxury-800 space-y-4">
              <span className="block text-xs font-bold text-amber-gold-200 uppercase tracking-widest text-center">Fastest Channel booking via WhatsApp</span>
              <p className="text-[11px] text-amber-gold-100/70 leading-relaxed text-center">
                Need your therapist immediately or prefer secure direct correspondence? Send your compiled receipt details to our reception on WhatsApp. Available 24/7.
              </p>
              
              <div className="flex gap-2.5">
                <button
                  id="whatsapp-dispatch-btn"
                  type="button"
                  onClick={executeWhatsAppLaunch}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </button>

                <button
                  id="copy-invoice-btn"
                  type="button"
                  onClick={copyWhatsAppPayload}
                  className="bg-emerald-luxury-800 hover:bg-emerald-luxury-700 text-amber-gold-100 p-3 rounded-xl hover:text-gold-accent-400 transition-all cursor-pointer relative"
                  title="Copy booking details to clipboard"
                >
                  {copiedText ? <Check className="w-4 h-4 text-green-400 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                  {copiedText && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-luxury-950 border border-emerald-luxury-700 text-gold-accent-400 text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL DIALOG */}
      {successModalOpen && lastConfirmedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            id="success-modal-panel"
            className="bg-white text-gray-900 p-6 sm:p-8 rounded-3xl max-w-lg w-full text-center relative shadow-2xl border border-gold-accent-500/20 animate-fade-in"
          >
            <div className="w-16 h-16 bg-emerald-luxury-100 text-emerald-luxury-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-luxury-200">
              <CheckCircle className="w-10 h-10 stroke-[2]" />
            </div>

            <p className="text-[11px] font-mono tracking-widest text-[#CB532B] uppercase font-bold">Booking Scheduled Offline</p>
            <h3 className="text-2xl font-serif text-emerald-luxury-900 font-bold mt-1">
              Therapist Reservation Pending
            </h3>
            
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Congratulations <span className="font-bold text-gray-900">{lastConfirmedBooking.clientName}</span>, your booking ID 
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold text-emerald-luxury-800 ml-1">
                {lastConfirmedBooking.id}
              </span> was successfully initialized. 
            </p>

            {/* Quick Summary list in Modal */}
            <div className="my-5 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Service Packet:</span>
                <span className="font-bold text-emerald-luxury-900">{selectedService.name} ({selectedDuration} mins)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Delivery Zone:</span>
                <span className="font-bold">{neighborhood.name.split(' (')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Scheduled Time:</span>
                <span className="font-bold text-emerald-luxury-900">{lastConfirmedBooking.bookingDate} at {lastConfirmedBooking.bookingTime}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold text-sm text-emerald-luxury-900">
                <span>Estimated Cost:</span>
                <span className="font-mono text-[#CB532B]">{formatPrice(lastConfirmedBooking.totalCost)}</span>
              </div>
            </div>

            <p className="text-[12px] text-gray-500 leading-snug">
              🌿 Our dispatch coordinator is checking resource allocations. To expedite therapist dispatch instantly, please tap the button below to text our office on WhatsApp!
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                id="modal-cta-whatsapp"
                onClick={() => {
                  executeWhatsAppLaunch();
                  setSuccessModalOpen(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Verify Instantly on WhatsApp</span>
              </button>

              <button
                id="modal-cta-dismiss"
                onClick={() => {
                  setSuccessModalOpen(false);
                }}
                className="px-6 py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded-full text-xs uppercase cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
