import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const list = [
    {
      q: "Which specific areas of Kampala do you deliver to?",
      a: "We currently serve central residential and commercial zones including Kololo, Nakasero, Kitante, Bugolobi, Muyenga, Naguru, Bukoto, Ntinda, Luzira, Kiwatule, Naalya, Munyonyo, Ggaba, and Lubowa. We also cater to hotels and lakeside resorts in the Entebbe Corridor upon request."
    },
    {
      q: "What do I need to prepare in my apartment or hotel room before the therapist arrives?",
      a: "You do not need to prepare any equipment! Our certified therapist arrives with a high-end mobile massage table, sterile white linens, organic Ugandan Shea butter, heated stones, and sound systems. We only require a small, clean space (about 2m x 2.5m) to set up the table and a standard power outlet for aromatherapy diffusers."
    },
    {
      q: "How does the 24/7 late-night booking work? Is it secure?",
      a: "We operate 24 hours a day, 7 days a week. For late-night appointments (scheduled between 10:00 PM and 5:00 AM), we have strict safety protocols. Our therapists are accompanied by our private, dedicated company drivers who drop them off and wait nearby until the session is completed."
    },
    {
      q: "What payment methods do you support in Kampala?",
      a: "Following your session, you can pay via MTN Mobile Money (MTN MoMo), Airtel Money, Cash (UGX, USD, or EUR), or standard Credit/Debit cards. All pricing is fully transparent with no hidden taxes."
    },
    {
      q: "Can I choose my therapist's gender?",
      a: "Yes. During step 2 of our Booking Customizer, you can select whether you prefer a female therapist, a male therapist, or any available professional. We highly respect personal boundaries and religious/cultural preferences."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#FDF9F3] border-t border-[#2D2926]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest text-[#C05B3D] uppercase font-bold">Logistics & Support</p>
          <h2 className="text-3xl font-serif text-[#1F4031] font-black mt-1 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-[#1F4031] mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordions */}
        <div id="faq-accordions-group" className="space-y-4">
          {list.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white border border-[#2D2926]/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:border-[#C05B3D]/30"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center bg-transparent focus:outline-none cursor-pointer"
                >
                  <span className="text-base font-bold text-[#1F4031] font-serif pr-4 leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#2D2926]/40 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C05B3D]' : ''}`} />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 opacity-100 border-t border-[#2D2926]/5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 sm:p-6 text-xs text-[#2D2926]/80 leading-relaxed bg-[#FDF9F3]/40 font-medium">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp hotline support footer box */}
        <div id="faq-hotline" className="mt-12 bg-[#1F4031]/5 border border-[#1F4031]/10 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3 text-left">
            <span className="w-10 h-10 bg-[#C05B3D]/10 rounded-full flex items-center justify-center text-lg shrink-0">🌿</span>
            <div>
              <h4 className="text-sm font-bold text-[#1F4031] font-serif">Still have a unique question?</h4>
              <p className="text-[11px] text-[#2D2926]/70">Contact our 24/7 reception via WhatsApp call or text.</p>
            </div>
          </div>
          <a
            href="https://wa.me/256751234567"
            target="_blank"
            rel="noreferrer"
            className="bg-[#1F4031] hover:bg-[#152D22] text-[#FDF9F3] font-bold text-xs py-2.5 px-5 rounded-full inline-flex items-center space-x-1 uppercase tracking-widest"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
            <span>Chat Live Customer Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
}
