import Link from "next/link";
import { POLICIES } from "./policies";
import AeriumLogo from "../../components/AeriumLogo";

export const metadata = {
  title: "Legal | Aerium",
  description: "Aerium legal policies and customer guidelines.",
};

export default function LegalIndexPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-16">
      <div className="mb-6">
        <AeriumLogo size="md" />
      </div>
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#FD870B]">
          Legal
        </p>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Policies & Guidelines
        </h1>
        <p className="max-w-2xl text-base text-gray-600">
          Find the latest versions of Aerium&apos;s customer policies, terms, and
          operational guidelines.
        </p>
      </header>
      <ul className="space-y-4">
        {POLICIES.map((policy) => (
          <li key={policy.slug} className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:border-aether-primary/60">
            <Link href={`/${policy.slug}`} className="flex flex-col gap-2 text-gray-900">
              <span className="text-lg font-medium">{policy.title}</span>
              <span className="text-sm text-gray-600">
                View the full policy details.
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
