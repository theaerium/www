import type { Metadata } from "next";
import SolutionTemplate from "../../components/site/SolutionTemplate";
import { chemicals } from "../solutionsData";

export const metadata: Metadata = {
  title: "Specialty Chemicals | Aerium",
  description: chemicals.subhead,
};

export default function Page() {
  return <SolutionTemplate data={chemicals} />;
}
