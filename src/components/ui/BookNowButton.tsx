"use client";

import { useBooking } from "@/components/ui/BookingDrawer";

export function BookNowButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
