import ReactMarkdown from "react-markdown";
import { SiteLink } from "../sections";

/** Renders a content file's markdown body; `className` picks the prose style (role or article). */
export default function Markdown({ children, className }: { children: string; className: string }) {
  return (
    <div className={className}>
      <ReactMarkdown components={{ a: ({ href = "#", children: label }) => <SiteLink href={href}>{label}</SiteLink> }}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
