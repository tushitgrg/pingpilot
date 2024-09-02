"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
    {
      quote:
        "Web monitoring has revolutionized the way we keep track of our online presence. It's like having a 24/7 watchdog ensuring everything runs smoothly.",
      name: "John Doe",
      title: "CEO, Tech Innovators Inc.",
    },
    {
      quote:
        "The insights we gain from real-time web monitoring are invaluable. It's helped us stay ahead of potential issues and maintain a strong online reputation.",
      name: "Jane Smith",
      title: "Marketing Director, Digital Solutions Ltd.",
    },
    {
      quote:
        "I can't imagine running our website without this tool. The real-time alerts have saved us countless times from potential downtime and other critical issues.",
      name: "Mike Johnson",
      title: "CTO, WebGuardians",
    },
    {
      quote:
        "This service is a game-changer. We've seen a significant improvement in our site's performance and user experience since we started using it.",
      name: "Emily Davis",
      title: "Product Manager, SiteSavvy",
    },
    {
      quote:
        "The peace of mind that comes with knowing our website is being monitored around the clock is priceless. It's a must-have for any serious business.",
      name: "David Brown",
      title: "Founder, Online Ventures Co.",
    },
  ];
  
