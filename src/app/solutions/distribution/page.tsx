import type { Metadata } from "next";
import SolutionTemplate from "../../components/site/SolutionTemplate";
import { distribution } from "../solutionsData";

export const metadata: Metadata = {
  title: "Distribution | Aerium",
  description: distribution.subhead,
};

export default function Page() {
  return <SolutionTemplate data={distribution} />;
}
