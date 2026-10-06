"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Video,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  ShieldCheck,
  RefreshCw,
  XCircle,
  PhoneCall,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BookingItem {
  id: string;
  serviceTitle: string;
  sessionTimeFormatted: string;
  status: "confirmed" | "rescheduled" | "cancelled" | "completed";
  meetLink: string;
  amountDisplay: string;
  durationMinutes: number;
}

export default function DashboardClientView() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("booking_success") === "true";

  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "bkg_curr_101",
      serviceTitle: "Individual Therapy",
      sessionTimeFormatted: "Tomorrow at 11:30 AM - 12:20 PM (IST)",
      status: "confirmed",
      meetLink: "https://meet.google.com/mpw-heal-cal",
      amountDisplay: "₹1,500",
      durationMinutes: 50,
    },
    {
      id: "bkg_prev_102",
      serviceTitle: "Anxiety & Stress Management",
      sessionTimeFormatted: "Sep 28, 2026 at 02:00 PM - 02:50 PM (IST)",
      status: "completed",
      meetLink: "https://meet.google.com/mpw-anx-prev",
      amountDisplay: "₹1,500",
      durationMinutes: 50,
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<BookingItem | null>(null);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleCancelBooking = async (id: string) => {
    try {
      await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, reason: cancelReason || "Cancelled by client" }),
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
      setCancelBookingId(null);
      setCancelReason("");
      setActionSuccess("Your session has been cancelled. If eligible under the 24h policy, a refund has been initiated.");
    } catch {
      setCancelBookingId(null);
    }
  };

  const handleRescheduleBooking = async (id: string) => {
    try {
      await fetch("/api/bookings/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: id,
          newSlotId: "slot_rescheduled_new",
          newSessionTime: new Date(Date.now() + 3 * 86400000).toISOString(),
        }),
      });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                status: "rescheduled",
                sessionTimeFormatted: "Rescheduled: In 3 Days at 02:00 PM IST",
              }
            : b
        )
      );
      setRescheduleBookingId(null);
      setActionSuccess("Your appointment has been successfully rescheduled to a new time slot.");
    } catch {
      setRescheduleBookingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Booking Celebration Banner */}
      {isSuccess && (
        <div className="p-6 rounded-3xl bg-[#2D4A3E] text-[#FBFBF9] shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E7EFE9] text-[#2D4A3E] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Appointment Confirmed!</h2>
              <p className="text-xs text-[#E7EFE9]">
                Your booking and payment were processed successfully. Google Meet link and receipt have been emailed to you.
              </p>
            </div>
          </div>
          <a
            href={bookings[0].meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button size="sm" className="bg-[#FBFBF9] text-[#2D4A3E] hover:bg-[#E7EFE9] font-bold">
              <Video className="w-4 h-4 mr-1.5" />
              Join Google Meet
            </Button>
          </a>
        </div>
      )}

      {/* Action Success Alert */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-[#E7EFE9] border border-[#2D4A3E]/20 text-xs text-[#2D4A3E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D4A3E]" />
            <span>{actionSuccess}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActionSuccess(null)} className="text-xs h-7">
            Dismiss
          </Button>
        </div>
      )}

      {/* Header & Role Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E7E3] pb-6">
        <div>
          <Badge variant="secondary" className="px-3 py-0.5 text-xs font-semibold mb-1">
            Client Portal
          </Badge>
          <h1 className="text-3xl font-bold text-[#1A2421]">My Therapy Dashboard</h1>
          <p className="text-xs text-[#5C6B64]">
            Manage your scheduled consultations, joining links, and session receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/book">
            <Button size="sm" className="font-semibold shadow-sm">
              <Calendar className="w-4 h-4 mr-1.5" />
              Book Another Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#2D4A3E]" />
          Upcoming Consultations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings
            .filter((b) => b.status === "confirmed" || b.status === "rescheduled")
            .map((item) => (
              <Card key={item.id} className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm flex flex-col justify-between">
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        item.status === "confirmed"
                          ? "bg-[#2D4A3E] text-[#FBFBF9]"
                          : "bg-[#C86D51] text-[#FFFFFF]"
                      }
                    >
                      {item.status === "confirmed" ? "Confirmed ✓" : "Rescheduled"}
                    </Badge>
                    <span className="text-xs text-[#5C6B64] font-medium">
                      {item.durationMinutes} mins • {item.amountDisplay}
                    </span>
                  </div>

                  <div>
                    <CardTitle className="text-xl font-bold text-[#1A2421]">
                      {item.serviceTitle}
                    </CardTitle>
                    <p className="text-xs font-semibold text-[#2D4A3E] mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.sessionTimeFormatted}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="p-3.5 rounded-2xl bg-[#F8F9F5] border border-[#E2E7E3] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#5C6B64]">Encrypted Joining Link:</span>
                      <a
                        href={item.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#2D4A3E] flex items-center gap-1 hover:underline"
                      >
                        Open Room <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full font-bold shadow-sm gap-2">
                        <Video className="w-4 h-4" />
                        Join Google Meet Call
                      </Button>
                    </a>
                  </div>

                  {/* Actions: Reschedule, Cancel, Receipt */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2E7E3] text-xs">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRescheduleBookingId(item.id)}
                        className="text-[#5C6B64] hover:text-[#2D4A3E] font-medium hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reschedule
                      </button>
                      <span className="text-[#E2E7E3]">•</span>
                      <button
                        type="button"
                        onClick={() => setCancelBookingId(item.id)}
                        className="text-[#DC2626] hover:underline font-medium flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(item)}
                      className="text-[#2D4A3E] font-semibold hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Receipt
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Past Sessions & History */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1A2421]">Past Session History</h2>
        <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl overflow-hidden shadow-sm">
          <div className="divide-y divide-[#E2E7E3]">
            {bookings
              .filter((b) => b.status === "completed" || b.status === "cancelled")
              .map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1A2421]">{item.serviceTitle}</h4>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-[#5C6B64]">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#5C6B64]">{item.sessionTimeFormatted}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#1A2421]">{item.amountDisplay}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(item)}
                      className="text-xs gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Reschedule Confirmation Modal */}
      {rescheduleBookingId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-[#E2E7E3]">
            <h3 className="text-lg font-bold text-[#1A2421]">Reschedule Session</h3>
            <p className="text-xs text-[#5C6B64]">
              You can reschedule free of charge up to 24 hours prior to your session time. Would you like to select the next available slot?
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setRescheduleBookingId(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleRescheduleBooking(rescheduleBookingId)} className="font-semibold">
                Confirm Reschedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelBookingId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-[#E2E7E3]">
            <div className="flex items-center gap-2 text-[#DC2626]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold">Cancel Session</h3>
            </div>
            <p className="text-xs text-[#5C6B64] leading-relaxed">
              Cancellations made 24 hours or more in advance are eligible for a 100% refund.
            </p>
            <div>
              <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                Reason for cancellation (optional):
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Schedule conflict / health reasons..."
                className="w-full p-2.5 rounded-xl border border-[#E2E7E3] text-xs"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setCancelBookingId(null)}>
                Keep Appointment
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleCancelBooking(cancelBookingId)}
                className="font-semibold"
              >
                Confirm Cancellation & Refund
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Downloadable Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 max-w-lg w-full space-y-6 border border-[#E2E7E3]">
            <div className="flex items-center justify-between border-b border-[#E2E7E3] pb-4">
              <div>
                <h3 className="font-bold text-lg text-[#1A2421]">Payment Receipt</h3>
                <p className="text-xs text-[#5C6B64]">Receipt #{selectedReceipt.id}</p>
              </div>
              <Badge className="bg-[#2D4A3E] text-[#FBFBF9]">Paid ✓</Badge>
            </div>

            <div className="space-y-3 text-xs text-[#1A2421]">
              <div className="flex justify-between">
                <span className="text-[#5C6B64]">Consultation:</span>
                <span className="font-semibold">{selectedReceipt.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6B64]">Date & Time:</span>
                <span>{selectedReceipt.sessionTimeFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6B64]">Payment Method:</span>
                <span>Razorpay (UPI / Net Banking)</span>
              </div>
              <div className="pt-2 border-t border-[#E2E7E3] flex justify-between font-bold text-sm">
                <span>Total Amount Paid:</span>
                <span className="text-[#2D4A3E]">{selectedReceipt.amountDisplay}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9F5] rounded-xl border border-[#E2E7E3] text-[11px] text-[#5C6B64]">
              Clinical psychological consultation provided by Bhagyashree (Licensed Psychologist). DPDP Act compliant.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button onClick={() => window.print()} className="gap-2 font-semibold">
                <Download className="w-4 h-4" />
                Print / Save PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Helpline Strip in Dashboard */}
      <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <PhoneCall className="w-4 h-4 shrink-0 text-[#DC2626]" />
          <span>In acute emotional crisis? Tele-MANAS: 14416 (24/7 Toll-Free)</span>
        </div>
        <div className="flex items-center gap-2 text-[#7F1D1D]">
          <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
          <span>Confidentiality Protected under DPDP Act</span>
        </div>
      </div>
    </div>
  );
}
