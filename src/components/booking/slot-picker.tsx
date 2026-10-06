"use client";

import React, { useState, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Clock, Calendar as CalendarIcon, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slot } from "@/lib/slots";

interface SlotPickerProps {
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
  onNext: () => void;
}

export function SlotPicker({ selectedSlot, onSelectSlot, onNext }: SlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate next 10 selectable dates (starting tomorrow)
  const availableDates = Array.from({ length: 10 }, (_, i) => addDays(new Date(), i + 1));

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      setError(null);
      const dateStr = format(selectedDate, "yyyy-MM-dd");

      try {
        const res = await fetch(`/api/slots?date=${dateStr}`);
        if (!res.ok) throw new Error("Failed to load slots");
        const data = await res.json();
        setSlots(data.slots || []);
      } catch {
        setError("Unable to load live availability. Displaying standard schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  return (
    <div className="space-y-8">
      {/* Date Picker Horizontal Strip */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2421]">
          1. Select Session Date (IST)
        </label>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {availableDates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center min-w-[76px] py-3 px-2 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "bg-[#2D4A3E] text-[#FBFBF9] border-[#2D4A3E] shadow-sm scale-[1.02]"
                    : "bg-[#FFFFFF] text-[#1A2421] border-[#E2E7E3] hover:border-[#2D4A3E]/40"
                }`}
              >
                <span className="text-[11px] font-medium opacity-80">
                  {format(date, "EEE")}
                </span>
                <span className="text-base font-bold my-0.5">
                  {format(date, "d")}
                </span>
                <span className="text-[10px] opacity-70">
                  {format(date, "MMM")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2421]">
            2. Choose Time Slot (Indian Standard Time)
          </label>
          <span className="text-xs text-[#5C6B64] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#2D4A3E]" />
            50-60 mins per session
          </span>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-xs text-[#5C6B64] space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#2D4A3E]" />
            <span>Checking therapist availability...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isUnavailable = slot.isBooked || slot.isLocked;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => onSelectSlot(slot)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? "border-[#2D4A3E] bg-[#2D4A3E] text-[#FBFBF9] shadow-sm"
                      : isUnavailable
                      ? "border-[#E2E7E3] bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                      : "border-[#E2E7E3] bg-[#FFFFFF] text-[#1A2421] hover:border-[#2D4A3E]/50 hover:bg-[#E7EFE9]/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CalendarIcon className={`w-4 h-4 ${isSelected ? "text-[#FBFBF9]" : "text-[#2D4A3E]"}`} />
                    <span className="text-xs font-semibold">
                      {slot.displayTimeIST}
                    </span>
                  </div>

                  <div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FBFBF9]" />}
                    {slot.isBooked && (
                      <span className="text-[10px] font-bold uppercase text-[#9CA3AF] bg-[#E5E7EB] px-2 py-0.5 rounded">
                        Booked
                      </span>
                    )}
                    {slot.isLocked && !slot.isBooked && (
                      <span className="text-[10px] font-bold uppercase text-[#C86D51] bg-[#FEE2E2] px-2 py-0.5 rounded">
                        Held
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {error && (
          <p className="text-xs text-[#5C6B64] flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#C86D51]" />
            {error}
          </p>
        )}
      </div>

      {/* Selected Slot Confirmation Bar & Action */}
      <div className="pt-4 border-t border-[#E2E7E3] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {selectedSlot ? (
            <p className="text-xs text-[#1A2421]">
              Selected: <span className="font-bold text-[#2D4A3E]">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span> at <span className="font-bold text-[#2D4A3E]">{selectedSlot.displayTimeIST}</span>
            </p>
          ) : (
            <p className="text-xs text-[#5C6B64]">Please pick a date and slot above to continue.</p>
          )}
        </div>

        <Button
          type="button"
          disabled={!selectedSlot}
          onClick={onNext}
          className="w-full sm:w-auto font-semibold shadow-sm"
        >
          Proceed to Intake Form
        </Button>
      </div>
    </div>
  );
}
