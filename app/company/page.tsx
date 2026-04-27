import type { Metadata } from "next";
import { CompanyPageClient } from "./CompanyPageClient";

export const metadata: Metadata = {
  title: "Hire South Asian tech talent — Recruitencer",
  description:
    "Submit a hiring request and receive a shortlist of vetted mid-to-senior software engineers, AI/ML practitioners, and DevOps specialists from Nepal and South Asia.",
};

export default function CompaniesPage() {
  return <CompanyPageClient />;
}
