import type { Metadata } from "next";
import SolutionTemplate from "../../components/site/SolutionTemplate";
import { equipment } from "../solutionsData";

export const metadata: Metadata = {
  title: "Equipment Manufacturing | Aerium",
  description: equipment.subhead,
};

export default function Page() {
  return <SolutionTemplate data={equipment} />;
}
