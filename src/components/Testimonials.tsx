import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Derrick Kigozi",
      location: "Kololo Apartment Resident",
      rating: 5,
      review: "Kla Mobile Spa has redefined home relaxation for me. I booked the Ruwenzori Deep Muscle Reliever after a grueling training program, and the therapist arrived exactly on time with a heated spa table, calming rainfall sounds on a speaker, and incredible strength. My lower back pain was completely gone.",
      avatar: "https://picsum.photos/seed/derrick/100/100"
    },
    {
      name: "Alithea Namara",
      location: "Corporate Professional, Naguru",
      rating: 5,
      review: "The Ugandan Shea Butter Aromatherapy is out of this world! The sheets were pristine white and warm, and the Shea Butter feels so luxurious on the skin. I didn't have to leave my house in Nakasero traffic—pure heaven. Available 24/7 is a huge plus.",
      avatar: "https://picsum.photos/seed/alithea/100/100"
    },
    {
      name: "Marcus & Flavia",
      location: "Couples Package, Bugolobi",
      rating: 5,
      review: "We booked the Kampala Couples Sanctuary for our wedding anniversary. They dispatched two certified therapists with candles and fresh oils. It felt like a five-star lodge spa inside our own living room. Absolutely professional and respectful.",
      avatar: "https://picsum.photos/seed/couples/100/100"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#1F4031] text-[#FDF9F3] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#142A20]/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Client Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FDF9F3] mt-1 font-black tracking-tight">
            Stories Of Pure Bliss In Kampala
          </h2>
          <div className="h-1 w-24 bg-[#C05B3D] mx-auto mt-4 rounded-full" />
          <p className="text-[#FDF9F3]/80 mt-4 text-base font-medium">
            Read how we transform living rooms, resort hotel rooms, and busy offices into peaceful wellness retreats.
          </p>
        </div>

        {/* Why Choose Us Highlight Cards */}
        <div id="reasons-bento-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-b border-[#FDF9F3]/10 pb-16">
          <div className="p-6 bg-[#142A20]/45 rounded-3xl border border-[#FDF9F3]/10 space-y-3">
            <span className="text-3xl">💆‍♀️</span>
            <h4 className="text-lg font-serif font-black text-[#FDF9F3]">Professional & Certified</h4>
            <p className="text-xs text-[#FDF9F3]/85 leading-relaxed font-medium">
              Every therapist undergoes extensive certified background screening and professional training checks. We prioritize premium clinical respect and deep muscle expertise.
            </p>
          </div>

          <div className="p-6 bg-[#142A20]/45 rounded-3xl border border-[#FDF9F3]/10 space-y-3">
            <span className="text-3xl">🚐</span>
            <h4 className="text-lg font-serif font-black text-[#FDF9F3]">Full Spa Setup Dispatched</h4>
            <p className="text-xs text-[#FDF9F3]/85 leading-relaxed font-medium">
              We bring it all: heavy-duty heated massage tables, pristine white sheets, organic shea butter, aromatherapy oil diffusers, and soothing spa music players.
            </p>
          </div>

          <div className="p-6 bg-[#142A20]/45 rounded-3xl border border-[#FDF9F3]/10 space-y-3">
            <span className="text-3xl">🕐</span>
            <h4 className="text-lg font-serif font-black text-[#FDF9F3]">Available 24/7 Kampala-Wide</h4>
            <p className="text-xs text-[#FDF9F3]/85 leading-relaxed font-medium">
              Whether you need early morning back stretch relief before work, desk chair massage in Nakasero, or late-night stress healing after a long flight, we dispatch 24/7.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div id="testimonials-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              id={`review-card-${idx}`}
              className="bg-[#142A20]/25 p-8 rounded-3xl border border-[#FDF9F3]/5 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                <div className="relative">
                  <MessageSquareQuote className="absolute -top-3 -left-3 w-8 h-8 text-[#D4AF37]/5 shrink-0 pointer-events-none" />
                  <p className="text-xs text-[#FDF9F3]/90 leading-relaxed italic relative z-10 pl-4 font-medium">
                    "{rev.review}"
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 border-t border-[#FDF9F3]/10 pt-6 mt-6">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#FDF9F3]/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#FDF9F3]">{rev.name}</h4>
                  <p className="text-[10px] text-[#D4AF37]/80 uppercase tracking-widest font-mono font-semibold">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
