import type { Metadata } from "next";
import { TalentPageClient } from "./TalentPageClient";

export const metadata: Metadata = {
  title: "Join the Talent Pool — Recruitencer",
  description:
    "Mid-to-senior engineers from Nepal and South Asia: join Recruitencer's talent pool and connect with remote-first global tech companies.",
};

export default function TalentPage() {
  return <TalentPageClient />;
}
