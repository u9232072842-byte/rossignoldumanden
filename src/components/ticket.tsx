
'use client';
import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';
import { Ticket as TicketIcon, Calendar, MapPin, Users, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

type TicketComponentProps = {
  ticketId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
};

const TicketComponent = forwardRef<HTMLDivElement, TicketComponentProps>(
  ({ ticketId, eventName, eventDate, eventLocation, quantity }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-gradient-to-br from-slate-900 to-gray-900 text-white font-sans max-w-md mx-auto rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden"
        style={{ color: '#ffffff' }}
      >
        <div className="relative p-6">
          {/* Holographic effect overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50"></div>
          
          {/* Top Section */}
          <div className="flex justify-between items-start pb-4 border-b border-primary/20 border-dashed">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">Djessou M. Diabate</p>
              <h2 className="font-headline text-3xl font-bold text-white leading-tight">{eventName}</h2>
            </div>
            <Music className="w-8 h-8 text-primary shrink-0" />
          </div>

          {/* Middle Section: Details + QR */}
          <div className="flex justify-between items-center pt-6 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary/80 shrink-0" />
                <div>
                  <p className="text-xs text-primary/70">Date</p>
                  <p className="font-bold text-base">{eventDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary/80 shrink-0" />
                <div>
                  <p className="text-xs text-primary/70">Lieu</p>
                  <p className="font-bold text-base">{eventLocation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary/80 shrink-0" />
                <div>
                  <p className="text-xs text-primary/70">Quantité</p>
                  <p className="font-bold text-base">{quantity} Billet(s)</p>
                </div>
              </div>
            </div>
            
            <div className="p-2 bg-white rounded-lg shadow-lg relative shrink-0">
               <QRCode value={ticketId} size={100} bgColor="#FFFFFF" fgColor="#000000" />
               {/* Corner brackets for futuristic look */}
               <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/50 rounded-tl-md"></div>
               <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary/50 rounded-tr-md"></div>
               <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/50 rounded-bl-md"></div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/50 rounded-br-md"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="bg-black/20 px-6 py-3 text-center">
            <p className="font-mono text-xs text-primary/70 tracking-widest">{ticketId}</p>
        </div>
      </div>
    );
  }
);

TicketComponent.displayName = 'TicketComponent';

export default TicketComponent;
