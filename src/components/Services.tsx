import React, { useState } from 'react';
import { SERVICES } from '../data';
import { MassageService } from '../types';
import { Clock, CheckSquare, Sparkles, Plus, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onPreSelect: (service: MassageService, selectedDuration: number) => void;
}

export default function Services({ onPreSelect }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({
    'nile-signature': 60,
    'shea-butter-aromatherapy': 60,
    'ruwenzori-deep-tissue': 90,
    'kampala-couples-bliss': 90,
    'nakasero-desk-relief': 30,
  });

  const categories = [
    { label: 'All Treatments', id: 'all' },
    { label: 'Classic & Relaxation', id: 'massage' },
    { label: 'Ugandan Shea Butter', id: 'aromatherapy' },
    { label: 'Couples Sanctuary', id: 'couples' },
    { label: 'Office Chair Relax', id: 'express' }
  ];

  const filteredServices = SERVICES.filter(service => 
    activeCategory === 'all' || service.category === activeCategory
  );

  const handleDurationChange = (serviceId: string, duration: number) => {
    setSelectedDurations(prev => ({
      ...prev,
      [serviceId]: duration
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="services" className="py-24 bg-[#FDF9F3] border-t border-[#2D2926]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div id="services-section-header" className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest text-[#C05B3D] uppercase font-bold">The Treatment Menu</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F4031] mt-2 font-black leading-tight">
            Indulge In Premium Full-Service Spa Therapeutics
          </h2>
          <div className="h-1 w-24 bg-[#1F4031] mx-auto mt-4 rounded-full" />
          <p className="text-[#2D2926]/80 mt-4 font-medium text-base sm:text-lg">
            We provide specialized individual, couples, and fast office treatments. Every session 
            includes transport across major Kampala sectors with a deluxe heated table, clean towels, 
            aromatherapy humidifier, and customizable massage oils.
          </p>
        </div>

        {/* Category Filters */}
        <div id="services-category-tabs" className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all uppercase cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1F4031] text-[#FDF9F3] shadow-md shadow-[#1F4031]/10'
                  : 'bg-[#1F4031]/5 text-[#1F4031] hover:bg-[#1F4031]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const currentDuration = selectedDurations[service.id] || service.durationOptions[0].duration;
            const currentPriceOption = service.durationOptions.find(o => o.duration === currentDuration) 
              || service.durationOptions[0];

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-[#2D2926]/10 hover:border-[#C05B3D]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group justify-between"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <span className="absolute top-4 right-4 z-10 bg-[#1F4031]/95 text-[#D4AF37] font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[#D4AF37]/20">
                    {service.category === 'aromatherapy' ? 'Organic Local' : 'Premium Standard'}
                  </span>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-white font-bold text-xl leading-tight font-serif">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-4">
                    <p className="text-sm text-[#2D2926]/70 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Duration Option Tabs Inside Card */}
                    <div className="space-y-2">
                      <p className="text-xs font-mono font-bold text-[#2D2926]/40 uppercase tracking-wider">Select Duration:</p>
                      <div className="flex gap-2">
                        {service.durationOptions.map((opt) => (
                          <button
                            key={opt.duration}
                            id={`duration-tab-${service.id}-${opt.duration}`}
                            onClick={() => handleDurationChange(service.id, opt.duration)}
                            className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              currentDuration === opt.duration
                                ? 'bg-[#C05B3D] text-white border-transparent font-bold shadow-sm'
                                : 'bg-[#FDF9F3] text-[#2D2926]/80 border-[#2D2926]/10 hover:bg-[#FAF3E8]'
                            }`}
                          >
                            <span className="block text-[11px] uppercase tracking-wider">
                              {opt.duration} Min
                            </span>
                            <span className="block text-[10px] opacity-80 mt-0.5">
                              {formatPrice(opt.price)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-2">
                      <p className="text-xs font-mono font-bold text-[#2D2926]/40 uppercase tracking-wider">Session Perks Only:</p>
                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start text-xs text-[#2D2926]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C05B3D] mr-2 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="mt-8 border-t border-[#2D2926]/5 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#2D2926]/40">Estimated Cost</p>
                      <p className="text-xl font-bold font-sans text-[#1F4031] tracking-tight">
                        {formatPrice(currentPriceOption.price)}
                      </p>
                    </div>

                    <button
                      id={`cta-select-service-${service.id}`}
                      onClick={() => onPreSelect(service, currentDuration)}
                      className="bg-[#1F4031] hover:bg-[#152D22] text-white font-bold text-xs py-2.5 px-4.5 rounded-full transition-all hover:scale-103 active:scale-97 cursor-pointer flex items-center space-x-1.5 shadow-xs uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Select Spa Packet</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
