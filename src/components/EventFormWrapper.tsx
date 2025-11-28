"use client";

import { Suspense } from 'react';
import EventForm from './EventForm';
import { EventData } from '@/lib/eventData';

interface EventFormWrapperProps {
  eventData: EventData;
}

const EventFormWrapper: React.FC<EventFormWrapperProps> = ({ eventData }) => {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Loading form...</div>}>
      <EventForm eventData={eventData} />
    </Suspense>
  );
};

export default EventFormWrapper;

