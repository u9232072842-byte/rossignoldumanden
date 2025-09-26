'use client';
import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';
import { Ticket as TicketIcon, Calendar, MapPin, Users } from 'lucide-react';

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
        className="bg-card text-card-foreground font-sans p-6 max-w-md mx-auto rounded-lg border-2 border-dashed border-primary"
        style={{ color: '#141414' }}
      >
        <div className="text-center pb-4 border-b border-dashed border-muted-foreground">
          <h2 className="font-headline text-3xl font-bold text-primary">{eventName}</h2>
          <p className="text-lg font-semibold">Billet Électronique</p>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-bold">{eventDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Lieu</p>
                <p className="font-bold">{eventLocation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Quantité</p>
                <p className="font-bold">{quantity} Billet(s)</p>
              </div>
            </div>
          </div>
          <div className="p-2 bg-white rounded-md">
             <QRCode value={ticketId} size={100} bgColor="#FFFFFF" fgColor="#000000" />
          </div>
        </div>
        <div className="text-center pt-4 mt-4 border-t border-dashed border-muted-foreground">
          <p className="text-xs text-muted-foreground">Scannez ce code à l'entrée</p>
          <p className="font-mono text-xs mt-1">{ticketId}</p>
        </div>
      </div>
    );
  }
);

TicketComponent.displayName = 'TicketComponent';

export default TicketComponent;
