"use client";
import React from "react";
import { motion } from "motion/react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Featured lead organizer (Head of Department), shown above the coordinators.
const leadOrganizer = {
  roleTag: "CONVENER · HEAD OF DEPARTMENT",
  name: "Dr. T. V. Madhusudhana Rao",
  designation: "Professor & Head, Department of AI & DS · VIIT",
  phone: "", // add the phone (10 digits) to show a clickable dialer button
  image: "/organizers/hod.jpg",
};

// Clickable phone → opens the device dialer (tel:), always visible.
function ContactButton({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) {
  const digits = phone.replace(/\D/g, "");
  return (
    <a
      href={`tel:+91${digits}`}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "group/phone inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide text-red-300 transition-colors hover:border-red-500/60 hover:bg-red-500/20 hover:text-white",
        className,
      )}
    >
      <Phone
        className="h-3.5 w-3.5 transition-transform group-hover/phone:rotate-12"
        strokeWidth={2}
      />
      +91 {phone}
    </a>
  );
}

const facultyCoordinators = [
  {
    name: "Dr. P. Visweswara Rao",
    role: "Associate Professor, AI&DS · IEEE Senior Member · Advisor, IEEE CIS Student Branch",
    phone: "",
    image: "/organizers/pvr.jpg",
  },
  {
    name: "Dr. J. Peter Praveen",
    role: "Associate Professor · Deputy HoD, AI&DS",
    phone: "",
    image: "/organizers/praveen.png",
  },
];

// Student coordinators with Money Heist Dali Mask icons
const studentCoordinators = [
  {
    name: "S. Manohar",
    contact: "9381716121",
    avatar: "/organizers/manohar.jpg",
  },
  {
    name: "M. Sai Deepika",
    contact: "7981954548",
    avatar: "/organizers/deepika.png",
  },
  {
    name: "B. Chaitanya Surya Deva",
    contact: "8143245575",
    avatar: "/organizers/chaitanya.jpg",
  },
  {
    name: "R.D.V. Prasad",
    contact: "7382612327",
    avatar: "/organizers/prasad.jpg",
  },
  {
    name: "S. Rohit",
    contact: "6300138007",
    avatar: "/organizers/rohit.jpg",
  },
];


export default function Organizers() {
  return (
    <section id="organizers" className="relative py-24 px-4 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-red-500/60 mb-4 font-mono"
          >
            The Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black text-white"
          >
            Meet the{" "}
            <SquigglyText scale={[5, 8]} className="text-red-500">
              Organizers
            </SquigglyText>
          </motion.h2>
        </div>

        {/* ── Faculty Section — featured lead card + redesigned coordinator cards ── */}
        <div className="mb-20">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-8 font-mono">
            Faculty Coordinators
          </p>

          {/* Featured lead organizer (top) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 max-w-5xl"
          >
            <CardContainer className="w-full">
              <CardBody className="w-full rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/[0.09] via-black to-zinc-950 p-6 shadow-2xl transition-all duration-300 hover:border-red-500/50 sm:p-7">
                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:text-left">
                    <CardItem translateZ="60">
                      <img
                        src={leadOrganizer.image}
                        alt={leadOrganizer.name}
                        loading="lazy"
                        decoding="async"
                        className="h-24 w-24 shrink-0 rounded-2xl border border-red-500/40 object-cover object-top shadow-xl shadow-red-600/20"
                      />
                    </CardItem>
                    <CardItem translateZ="40" className="min-w-0">
                      <span className="inline-block rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-red-400">
                        {leadOrganizer.roleTag}
                      </span>
                      <h3 className="mt-3 text-xl font-black tracking-tight text-white sm:text-2xl">
                        {leadOrganizer.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/55 sm:text-sm">
                        {leadOrganizer.designation}
                      </p>
                    </CardItem>
                  </div>
                  {leadOrganizer.phone && (
                    <CardItem translateZ="50" className="shrink-0">
                      <ContactButton phone={leadOrganizer.phone} />
                    </CardItem>
                  )}
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Two faculty coordinators */}
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {facultyCoordinators.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="h-full"
              >
                <CardContainer className="h-full w-full" containerClassName="h-full w-full py-0">
                  <CardBody className="group/card flex h-full w-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 p-6 transition-all duration-300 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-600/10">
                    <CardItem translateZ="50" className="flex w-full items-center gap-4">
                      <img
                        src={f.image}
                        alt={f.name}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 shrink-0 rounded-2xl border border-red-500/30 object-cover shadow-lg transition-transform duration-300 group-hover/card:scale-105"
                      />
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
                          Faculty Coordinator
                        </span>
                        <h3 className="mt-1 text-lg font-bold tracking-tight text-white">
                          {f.name}
                        </h3>
                      </div>
                    </CardItem>

                    <CardItem translateZ="30" className="mt-4 w-full">
                      <p className="text-xs leading-relaxed text-white/55">
                        {f.role}
                      </p>
                    </CardItem>

                    {f.phone && (
                      <CardItem
                        translateZ="40"
                        className="mt-5 flex w-full items-center justify-between border-t border-white/10 pt-4"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                          Direct Contact
                        </span>
                        <ContactButton phone={f.phone} />
                      </CardItem>
                    )}
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Student Coordinators with Money Heist Dali Mask DPs + 3D Card Floating Effect ── */}
        <div className="mb-24">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-8 font-mono">
            Student Coordinators
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {studentCoordinators.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <CardContainer className="w-full">
                  <CardBody className="w-full bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 border border-white/10 hover:border-red-500/40 rounded-2xl p-5 text-center flex flex-col items-center">
                    <CardItem translateZ="60">
                      <div className={`h-16 w-16 rounded-full overflow-hidden border-2 border-red-500/40 bg-black mb-3 shadow-lg shadow-red-500/30 flex items-center justify-center ${s.avatar.endsWith(".svg") ? "p-1" : ""}`}>
                        <img
                          src={s.avatar}
                          alt={s.name}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full ${s.avatar.endsWith(".svg") ? "object-contain" : "object-cover"}`}
                        />
                      </div>
                    </CardItem>
                    <CardItem translateZ="40">
                      <h4 className="text-sm font-bold text-white mb-1">
                        {s.name}
                      </h4>
                    </CardItem>
                    <CardItem translateZ="20" className="mt-1">
                      <ContactButton phone={s.contact} className="px-3 py-1 text-[11px]" />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Organized By Section with MacbookScroll ── */}
        <div className="relative">
          <MacbookScroll
            title={
              <span className="text-2xl sm:text-4xl font-extrabold text-white">
                Organized <SquigglyText className="text-red-500">By</SquigglyText>
              </span>
            }
          >
            {/* Laptop screen content — college header at top, accreditation row below */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-4 py-5">
              {/* College header (transparent, trimmed) */}
              <img
                src="/vignan-header.png"
                alt="Vignan's Institute of Information Technology (Autonomous), Duvvada, Visakhapatnam"
                loading="lazy"
                decoding="async"
                className="h-auto w-[195px] max-w-[50%] shrink-0 object-contain"
              />
              {/* Accreditation row — NAAC · NIRF · UGC · IIC (CIS SBC) */}
              <img
                src="/row1-accreditations.png"
                alt="NAAC A+ (CGPA 3.4/4) · NIRF 2025 India Ranking 201-300 · UGC Autonomous · Institution's Innovation Council (CIS SBC)"
                loading="lazy"
                decoding="async"
                className="h-auto w-[270px] max-w-[66%] shrink-0 object-contain"
              />
              {/* Student branches & club row — IEEE SB · CIS SBC · Matrix Club */}
              <img
                src="/row2-clubs.png"
                alt="Vignan's Visakhapatnam IEEE Student Branch · IEEE Computational Intelligence Society Student Branch Chapter (CIS SBC) · Matrix Club AI&DS VIIT"
                loading="lazy"
                decoding="async"
                className="h-auto w-[260px] max-w-[64%] shrink-0 object-contain"
              />
            </div>
          </MacbookScroll>
        </div>

      </div>
    </section>
  );
}
