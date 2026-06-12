import React from 'react';
import { ConfirmedBooking } from '../types';
import { SERVICES, NEIGHBORHOODS } from '../data';
import { Calendar, Clock, MapPin, Phone, Trash2, CalendarX, CheckCircle, AlertOctagon } from 'lucide-react';

interface MyBookingsProps {
  bookings: ConfirmedBooking[];
  onCancelBooking: (bookingId: string) => void;
}

export default function MyBookings({ bookings, onCancelBooking }: MyBookingsProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getServiceDetails = (serviceId: string) => {
    return SERVICES.find(s => s.id === serviceId);
  };

  const getZoneDetails = (neighborhoodId: string) => {
    return NEIGHBORHOODS.find(n => n.id === neighborhoodId);
  };

  return (
    <section id="my-bookings" className="py-24 bg-[#FDF9F3] border-t border-[#2D2926]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest text-[#C05B3D] uppercase font-bold">Client Dashboard</p>
          <h2 className="text-3xl font-serif text-[#1F4031] font-black mt-1 tracking-tight">
            Track My Scheduled Spa Sessions
          </h2>
          <div className="h-1 w-24 bg-[#1F4031] mx-auto mt-4 rounded-full" />
          <p className="text-[#2D2926]/80 mt-4 text-sm font-medium">
            Review of offline appointments booked on this device. Dispatched therapists will call to confirm.
          </p>
        </div>

        {bookings.length === 0 ? (
          /* Empty state representation */
          <div id="bookings-empty-state" className="bg-white rounded-3xl border border-[#2D2926]/10 p-10 text-center space-y-4 shadow-xs max-w-lg mx-auto">
            <div className="w-14 h-14 bg-[#1F4031]/5 text-[#1F4031] rounded-full flex items-center justify-center mx-auto">
              <CalendarX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-serif font-black text-[#1F4031]">No active bookings detected</h3>
            <p className="text-xs text-[#2D2926]/75 max-w-xs mx-auto leading-relaxed font-medium">
              You haven't scheduled any in-home massage packages yet. Configure your treatment, date, and local oils using the customizer above.
            </p>
            <a
              href="#booking-customizer"
              className="inline-block bg-[#1F4031] hover:bg-[#152D22] text-white font-bold text-xs px-6 py-3 rounded-full uppercase tracking-widest transition-all shadow-xs"
            >
              Book Treatment Now
            </a>
          </div>
        ) : (
          /* List of bookings */
          <div id="bookings-items-list" className="space-y-6">
            {bookings.map((booking) => {
              const service = getServiceDetails(booking.serviceId);
              const zone = getZoneDetails(booking.neighborhoodId);

              return (
                <div
                  key={booking.id}
                  id={`my-booking-card-${booking.id}`}
                  className="bg-white rounded-2xl border border-[#2D2926]/10 p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6 group hover:border-[#C05B3D]/30 transition-all duration-300"
                >
                  {/* Decorative indicator lines */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C05B3D]" />

                  <div className="space-y-4">
                    {/* Header line */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#2D2926]/40">ID: {booking.id}</span>
                      <span className="bg-[#FAF3E8] text-[#C05B3D] font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase flex items-center shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C05B3D] mr-1.5 animate-pulse" />
                        Pending Confirmation
                      </span>
                    </div>

                    {/* Booking Details */}
                    <div>
                      <h3 className="text-lg font-bold font-serif text-[#1F4031]">
                        {service?.name || 'Mobile Massage Treatment'} ({booking.duration} mins)
                      </h3>
                      <p className="text-xs text-[#2D2926]/70 mt-0.5 font-medium">
                        Client: <span className="font-bold text-[#2D2926]">{booking.clientName}</span> ({booking.clientPhone})
                      </p>
                    </div>

                    {/* Logistics grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#2D2926]/85 font-medium">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#C05B3D] shrink-0" />
                        <span>Date: <span className="font-bold text-[#2D2926]">{booking.bookingDate}</span></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#C05B3D] shrink-0" />
                        <span>Hours: <span className="font-bold text-[#2D2926]">{booking.bookingTime}</span></span>
                      </div>
                      <div className="flex items-start space-x-2 sm:col-span-2">
                        <MapPin className="w-4 h-4 text-[#C05B3D] shrink-0 mt-0.5" />
                        <span>Address: <span className="font-bold text-[#2D2926]">{booking.addressDetails}, {zone?.name.split(' (')[0]}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Financial aspect and Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 border-[#2D2926]/5 pt-4 md:pt-0 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-[#2D2926]/40 font-mono uppercase tracking-wider block font-bold">Estimated Total</span>
                      <span className="text-xl font-bold font-mono text-[#C05B3D]">{formatPrice(booking.totalCost)}</span>
                    </div>

                    <button
                      id={`button-cancel-booking-${booking.id}`}
                      type="button"
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-[#2D2926]/40 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 cursor-pointer flex items-center space-x-1 text-xs font-bold"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-4.5 h-4.5 shrink-0" />
                      <span className="md:hidden lg:inline">Cancel</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
