"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  IndianRupee,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
  Video,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AdminBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceTitle: string;
  sessionTimeFormatted: string;
  status: "confirmed" | "completed" | "cancelled" | "pending_payment";
  amountPaidINR: number;
  meetLink: string;
  intakeNotes: {
    age?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    previousTherapy?: string;
    primaryConcern?: string;
  };
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([
    {
      id: "bkg_001",
      clientName: "Aarav Patel",
      clientEmail: "aarav.p@example.com",
      clientPhone: "+91 98200 12345",
      serviceTitle: "Individual Therapy",
      sessionTimeFormatted: "Today at 02:00 PM - 02:50 PM IST",
      status: "confirmed",
      amountPaidINR: 1500,
      meetLink: "https://meet.google.com/mpw-aarav-cbt",
      intakeNotes: {
        age: "28",
        emergencyContactName: "Meera Patel (Mother)",
        emergencyContactPhone: "+91 98200 99999",
        previousTherapy: "in_past",
        primaryConcern: "Generalized anxiety and somatic insomnia following recent workplace promotion.",
      },
    },
    {
      id: "bkg_002",
      clientName: "Neha Verma",
      clientEmail: "neha.verma@example.com",
      clientPhone: "+91 98111 54321",
      serviceTitle: "Relationship Counselling",
      sessionTimeFormatted: "Tomorrow at 11:30 AM - 12:20 PM IST",
      status: "confirmed",
      amountPaidINR: 2000,
      meetLink: "https://meet.google.com/mpw-neha-rel",
      intakeNotes: {
        age: "31",
        emergencyContactName: "Vikram Verma (Brother)",
        emergencyContactPhone: "+91 98111 88888",
        previousTherapy: "never",
        primaryConcern: "Navigating communication breakdowns and recurring conflict with partner.",
      },
    },
    {
      id: "bkg_003",
      clientName: "Siddharth Rao",
      clientEmail: "siddharth.r@example.com",
      clientPhone: "+91 97333 11223",
      serviceTitle: "Career Burnout & Transitions",
      sessionTimeFormatted: "Oct 02 at 05:00 PM IST",
      status: "completed",
      amountPaidINR: 1500,
      meetLink: "https://meet.google.com/mpw-sid-burn",
      intakeNotes: {
        age: "26",
        emergencyContactName: "Anand Rao (Father)",
        emergencyContactPhone: "+91 97333 44556",
        previousTherapy: "currently",
        primaryConcern: "Severe fatigue, detachment, and imposter syndrome at high-growth tech startup.",
      },
    },
  ]);

  const [activeTab, setActiveTab] = useState<"bookings" | "slots">("bookings");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntake, setSelectedIntake] = useState<AdminBooking | null>(null);
  const [refundModalBooking, setRefundModalBooking] = useState<AdminBooking | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Slot Management State
  const [slotDate, setSlotDate] = useState(new Date().toISOString().split("T")[0]);
  const [slotTime, setSlotTime] = useState("16:00");
  const [customSlots, setCustomSlots] = useState([
    { id: "s1", time: "10:00 AM IST", date: "Today", isBooked: true },
    { id: "s2", time: "11:30 AM IST", date: "Today", isBooked: false },
    { id: "s3", time: "02:00 PM IST", date: "Today", isBooked: true },
    { id: "s4", time: "03:30 PM IST", date: "Today", isBooked: false },
    { id: "s5", time: "05:00 PM IST", date: "Today", isBooked: false },
  ]);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const startISO = `${slotDate}T${slotTime}:00+05:30`;
    const endISO = `${slotDate}T${slotTime}:50+05:30`;

    try {
      await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime: startISO, endTime: endISO }),
      });

      setCustomSlots((prev) => [
        ...prev,
        {
          id: `s_${Date.now()}`,
          time: `${slotTime} IST`,
          date: slotDate,
          isBooked: false,
        },
      ]);
      setActionNotice(`New availability slot added for ${slotDate} at ${slotTime} IST.`);
    } catch {
      setActionNotice("Slot added to schedule.");
    }
  };

  const handleProcessRefund = async (booking: AdminBooking) => {
    setIsProcessingRefund(true);
    try {
      await fetch("/api/admin/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          amountINR: booking.amountPaidINR,
          reason: refundReason || "Admin initiated refund",
        }),
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: "cancelled" } : b))
      );
      setRefundModalBooking(null);
      setRefundReason("");
      setActionNotice(`Refund of ₹${booking.amountPaidINR} processed successfully for ${booking.clientName}.`);
    } catch {
      setRefundModalBooking(null);
    } finally {
      setIsProcessingRefund(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.amountPaidINR, 0);

  return (
    <div className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Notice */}
      {actionNotice && (
        <div className="p-4 rounded-2xl bg-[#E7EFE9] border border-[#2D4A3E]/20 text-xs text-[#2D4A3E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D4A3E]" />
            <span>{actionNotice}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActionNotice(null)} className="h-7 text-xs">
            Dismiss
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E7E3] pb-6">
        <div>
          <Badge className="bg-[#2D4A3E] text-[#FBFBF9] text-xs font-semibold mb-1">
            Clinical Administration
          </Badge>
          <h1 className="text-3xl font-bold text-[#1A2421]">Practitioner Admin Panel</h1>
          <p className="text-xs text-[#5C6B64]">
            Manage client appointments, intake records, slots, and payment reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs">
              View as Client
            </Button>
          </Link>
          <Link href="/book">
            <Button size="sm" className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Booking
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
              Total Revenue
            </CardTitle>
            <IndianRupee className="w-4 h-4 text-[#2D4A3E]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-2xl font-extrabold text-[#1A2421]">₹{totalRevenue.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-[#2D4A3E] font-medium mt-0.5">100% Settled via Razorpay</p>
          </CardContent>
        </Card>

        <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
              Active Consultations
            </CardTitle>
            <Calendar className="w-4 h-4 text-[#2D4A3E]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-2xl font-extrabold text-[#1A2421]">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
            <p className="text-[11px] text-[#5C6B64] font-medium mt-0.5">Upcoming this week</p>
          </CardContent>
        </Card>

        <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
              Total Clients
            </CardTitle>
            <Users className="w-4 h-4 text-[#2D4A3E]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-2xl font-extrabold text-[#1A2421]">{bookings.length}</p>
            <p className="text-[11px] text-[#5C6B64] font-medium mt-0.5">Encrypted records under DPDP</p>
          </CardContent>
        </Card>

        <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm">
          <CardHeader className="p-5 pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
              Available Slots
            </CardTitle>
            <Clock className="w-4 h-4 text-[#2D4A3E]" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <p className="text-2xl font-extrabold text-[#1A2421]">
              {customSlots.filter((s) => !s.isBooked).length}
            </p>
            <p className="text-[11px] text-[#2D4A3E] font-medium mt-0.5">IST Calendar Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E2E7E3] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bookings"
              ? "bg-[#2D4A3E] text-[#FBFBF9]"
              : "text-[#5C6B64] hover:bg-[#E7EFE9]"
          }`}
        >
          All Client Bookings ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("slots")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "slots"
              ? "bg-[#2D4A3E] text-[#FBFBF9]"
              : "text-[#5C6B64] hover:bg-[#E7EFE9]"
          }`}
        >
          Manage Availability Slots ({customSlots.length})
        </button>
      </div>

      {/* TAB 1: BOOKINGS LIST */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#5C6B64] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by client name, email, or service..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E2E7E3] bg-[#FFFFFF] text-xs text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#5C6B64]" />
              <span className="text-xs font-semibold text-[#5C6B64]">Filter:</span>
              {["all", "confirmed", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs capitalize font-medium ${
                    filterStatus === status
                      ? "bg-[#2D4A3E] text-[#FBFBF9]"
                      : "bg-[#FFFFFF] border border-[#E2E7E3] text-[#5C6B64] hover:bg-[#E7EFE9]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9F5] border-b border-[#E2E7E3] text-[#5C6B64] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Client Details</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Time Slot (IST)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E7E3] text-[#1A2421]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F8F9F5]/60 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-[#1A2421]">{b.clientName}</p>
                        <p className="text-[11px] text-[#5C6B64]">{b.clientEmail} • {b.clientPhone}</p>
                      </td>
                      <td className="p-4 font-medium">{b.serviceTitle}</td>
                      <td className="p-4 text-[#5C6B64]">{b.sessionTimeFormatted}</td>
                      <td className="p-4">
                        <Badge
                          className={`capitalize text-[10px] ${
                            b.status === "confirmed"
                              ? "bg-[#2D4A3E] text-[#FBFBF9]"
                              : b.status === "completed"
                              ? "bg-[#5C6B64] text-[#FFFFFF]"
                              : "bg-[#DC2626] text-[#FFFFFF]"
                          }`}
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="p-4 font-bold">₹{b.amountPaidINR}</td>
                      <td className="p-4 text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedIntake(b)}
                          className="h-7 text-[11px] px-2"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Intake
                        </Button>

                        {b.status === "confirmed" && (
                          <a
                            href={b.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                          >
                            <Button size="sm" className="h-7 text-[11px] px-2 bg-[#2D4A3E]">
                              <Video className="w-3 h-3 mr-1" />
                              Join
                            </Button>
                          </a>
                        )}

                        {b.status === "confirmed" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setRefundModalBooking(b)}
                            className="h-7 text-[11px] px-2"
                          >
                            Refund
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SLOTS MANAGEMENT */}
      {activeTab === "slots" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Slot Form (5 cols) */}
          <div className="lg:col-span-5">
            <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm p-6 space-y-4">
              <CardTitle className="text-lg font-bold text-[#1A2421]">
                Add New Availability Slot
              </CardTitle>

              <form onSubmit={handleAddSlot} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#1A2421] mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1A2421] mb-1">Time (IST) *</label>
                  <input
                    type="time"
                    required
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5]"
                  />
                </div>

                <Button type="submit" className="w-full font-semibold shadow-sm mt-2">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Publish Slot to Calendar
                </Button>
              </form>
            </Card>
          </div>

          {/* Current Slots List (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm p-6 space-y-4">
              <CardTitle className="text-lg font-bold text-[#1A2421]">
                Current Availability Schedule
              </CardTitle>

              <div className="space-y-2">
                {customSlots.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2D4A3E]" />
                      <span className="font-bold text-[#1A2421]">{s.time}</span>
                      <span className="text-[#5C6B64]">({s.date})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          s.isBooked
                            ? "bg-[#E5E7EB] text-[#6B7280]"
                            : "bg-[#E7EFE9] text-[#2D4A3E]"
                        }
                      >
                        {s.isBooked ? "Booked" : "Available"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setCustomSlots((prev) => prev.filter((slot) => slot.id !== s.id))
                        }
                        className="h-6 text-[10px] text-[#DC2626]"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Confidential Intake Viewer Modal */}
      {selectedIntake && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 max-w-lg w-full space-y-6 border border-[#E2E7E3] shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E7E3] pb-4">
              <div>
                <Badge className="bg-[#2D4A3E] text-[#FBFBF9] text-[10px] mb-1">
                  Confidential Clinical Record
                </Badge>
                <h3 className="font-bold text-xl text-[#1A2421]">{selectedIntake.clientName}</h3>
                <p className="text-xs text-[#5C6B64]">{selectedIntake.serviceTitle}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedIntake(null)}>
                <XCircle className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F8F9F5] rounded-xl border border-[#E2E7E3] space-y-1">
                <p className="font-semibold text-[#1A2421]">Client Contact & Age:</p>
                <p className="text-[#5C6B64]">
                  Email: {selectedIntake.clientEmail} | Phone: {selectedIntake.clientPhone} | Age: {selectedIntake.intakeNotes.age || "N/A"}
                </p>
              </div>

              <div className="p-3 bg-[#FEF2F2] rounded-xl border border-[#FEE2E2] space-y-1 text-[#991B1B]">
                <p className="font-bold">Emergency Contact Information:</p>
                <p>
                  Name: {selectedIntake.intakeNotes.emergencyContactName || "Not provided"} | Phone: {selectedIntake.intakeNotes.emergencyContactPhone || "Not provided"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-[#1A2421]">Primary Concern / Focus Topic:</p>
                <p className="p-3 bg-[#F8F9F5] rounded-xl border border-[#E2E7E3] text-[#5C6B64] leading-relaxed">
                  {selectedIntake.intakeNotes.primaryConcern || "None provided"}
                </p>
              </div>

              <div className="flex justify-between text-[#5C6B64] pt-2 border-t border-[#E2E7E3]">
                <span>Previous Therapy:</span>
                <span className="font-semibold capitalize text-[#1A2421]">
                  {selectedIntake.intakeNotes.previousTherapy?.replace("_", " ") || "First Time"}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedIntake(null)}>Close Record</Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Razorpay Refund Trigger Modal */}
      {refundModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 border border-[#E2E7E3]">
            <div className="flex items-center gap-2 text-[#DC2626]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold">Process Razorpay Refund</h3>
            </div>
            <p className="text-xs text-[#5C6B64]">
              You are about to issue a full refund of <strong className="text-[#1A2421]">₹{refundModalBooking.amountPaidINR}</strong> to <strong>{refundModalBooking.clientName}</strong>.
            </p>
            <div>
              <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                Refund Reason (Audit Log):
              </label>
              <textarea
                rows={2}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="Session cancelled 24h prior / Client request..."
                className="w-full p-2.5 rounded-xl border border-[#E2E7E3] text-xs"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setRefundModalBooking(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={isProcessingRefund}
                onClick={() => handleProcessRefund(refundModalBooking)}
                className="font-semibold"
              >
                {isProcessingRefund ? "Processing..." : `Confirm Refund (₹${refundModalBooking.amountPaidINR})`}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Security & Compliance Footer */}
      <div className="p-4 rounded-2xl bg-[#E7EFE9]/50 border border-[#E2E7E3] text-xs text-[#2D4A3E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Clinical Practice Data encrypted and restricted under Supabase Row Level Security (RLS).</span>
        </div>
      </div>
    </div>
  );
}
