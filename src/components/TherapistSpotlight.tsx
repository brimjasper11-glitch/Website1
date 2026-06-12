import React from 'react';
import { THERAPISTS } from '../data';
import { Star, Shield, Award, CalendarCheck, Utensils, Volume2 } from 'lucide-react';

export default function TherapistSpotlight() {
  return (
    <section id="therapists" className="py-24 bg-[#FDF9F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest text-[#C05B3D] uppercase font-bold">Expert Care</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F4031] mt-1 font-black tracking-tight">
            Meet Our Certified Mobile Therapists
          </h2>
          <div className="h-1 w-24 bg-[#1F4031] mx-auto mt-4 rounded-full" />
          <p className="text-[#2D2926]/80 mt-4 text-base font-medium leading-relaxed">
            Our practitioners hold advanced certifications in human anatomy, clinical massage deep-strokes, 
            and modern spa hygiene. Respect, professional behavior, and customer privacy are guaranteed.
          </p>
        </div>

        {/* Therapist Spotlight Cards */}
        <div id="therapist-list-spotlight" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THERAPISTS.map((therapist) => (
            <div
              key={therapist.id}
              id={`therapist-spot-card-${therapist.id}`}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2D2926]/10 flex flex-col justify-between hover:border-[#C05B3D]/30 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Avatar and name header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#FDF9F3] text-[#1F4031] flex items-center justify-center text-4xl shadow-inner border border-[#2D2926]/10">
                    {therapist.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#1F4031] font-serif leading-tight">
                      {therapist.name}
                    </h3>
                    <p className="text-[10px] text-[#C05B3D] font-mono tracking-wider uppercase mt-0.5 font-bold">
                      {therapist.gender === 'female' ? 'Female' : 'Male'} Specialist
                    </p>
                    <div className="flex items-center text-[#D4AF37] mt-1">
                      <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span className="text-xs font-bold ml-1">{therapist.rating}</span>
                      <span className="text-[10px] text-[#2D2926]/55 font-medium ml-1.5">
                        ({therapist.completedSessions}+ Completed)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-[#2D2926]/85 leading-relaxed italic font-medium">
                  "{therapist.bio}"
                </p>

                {/* Specialties tags */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#2D2926]/40 uppercase tracking-wider font-bold block">Areas of Specialization:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {therapist.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FDF9F3] text-[#1F4031] border border-[#1F4031]/10 text-[10px] font-bold px-2.5 py-1 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="border-t border-[#2D2926]/5 mt-6 pt-4 flex items-center justify-between text-[11px] text-[#2D2926]/60">
                <div className="flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-[#1F4031]" />
                  <span className="font-bold text-[#1F4031]">Licensed in Uganda</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-[#C05B3D]" />
                  <span className="font-bold text-[#C05B3D]">Verified Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What they bring bento item */}
        <div id="what-therapist-brings" className="mt-16 bg-[#1F4031] text-[#FDF9F3] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#FDF9F3]/10 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h4 className="text-lg font-serif font-black text-[#FDF9F3] flex items-center space-x-2">
              <span className="text-lg">📦</span>
              <span>Our Professional Mobile Kit</span>
            </h4>
            <p className="text-xs text-[#FDF9F3]/85 leading-relaxed font-medium">
              When our therapist arrives, they are fully self-sufficient. Within 10 minutes, they set up standard professional heavy-duty massage tables, warm aromatherapy heaters, fresh sheets, and a calming rainfall audio system. **You only need to relax.**
            </p>
          </div>
          <a
            href="#booking-customizer"
            className="bg-[#C05B3D] hover:bg-[#A94F34] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap shrink-0 cursor-pointer shadow-md hover:scale-103 active:scale-97 transition-all text-center"
          >
            Configure Session Now
          </a>
        </div>

      </div>
    </section>
  );
}
