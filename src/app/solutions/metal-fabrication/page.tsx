import type { Metadata } from "next";
import SolutionTemplate from "../../components/site/SolutionTemplate";
import { metal } from "../solutionsData";

export const metadata: Metadata = {
  title: "Metal Fabrication | Aerium",
  description: metal.subhead,
};

export default function Page() {
  return <SolutionTemplate data={metal} />;
}
