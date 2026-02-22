import { readFile, readdir } from "fs/promises";
import path from "path";
import Header from "../../components/header";
import Footer from "../../components/footer";
import CareersList from "../../components/careers/CareersList";

interface CareerMeta {
  location?: string;
  employmentType?: string;
  locationType?: string;
  department?: string;
  compensation?: string;
}

interface Career {
  title: string;
  content: string;
  meta: CareerMeta;
  slug: string;
}

function parseCareerMarkdown(markdown: string): Career {
  const lines = markdown.split("\n");

  // Extract title from first # heading
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine
    ? titleLine.replace("# ", "").trim()
    : "Untitled Position";

  // Extract metadata from #### lines
  const meta: CareerMeta = {};
  const metaPatterns: { pattern: RegExp; key: keyof CareerMeta }[] = [
    { pattern: /^####\s*Location:\s*(.+)$/i, key: "location" },
    { pattern: /^####\s*Employment Type:\s*(.+)$/i, key: "employmentType" },
    { pattern: /^####\s*Location Type:\s*(.+)$/i, key: "locationType" },
    { pattern: /^####\s*Department:\s*(.+)$/i, key: "department" },
    { pattern: /^####\s*Compensation:\s*(.+)$/i, key: "compensation" },
  ];

  for (const line of lines) {
    for (const { pattern, key } of metaPatterns) {
      const match = line.match(pattern);
      if (match) {
        meta[key] = match[1].trim();
      }
    }
  }

  // Remove title and metadata lines from content, keep the rest
  const contentLines = lines.filter((line) => {
    if (line.startsWith("# ")) return false;
    for (const { pattern } of metaPatterns) {
      if (pattern.test(line)) return false;
    }
    return true;
  });

  // Remove leading empty lines
  while (contentLines.length > 0 && contentLines[0].trim() === "") {
    contentLines.shift();
  }

  const content = contentLines.join("\n").trim();

  return {
    title,
    content,
    meta,
    slug: "",
  };
}

async function getCareers(): Promise<Career[]> {
  const careersDirectory = path.join(process.cwd(), "public", "careers");

  try {
    const files = await readdir(careersDirectory);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    const careers = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(careersDirectory, file);
        const content = await readFile(filePath, "utf8");
        const career = parseCareerMarkdown(content);
        career.slug = file.replace(".md", "");
        return career;
      }),
    );

    return careers;
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFF8F5" }}>
      <Header />
      <main className="pt-8 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title card */}
          <div
            style={{
              border: "2px solid #FD870B",
              boxShadow: "4px 4px 0px #FD870B",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "#390007",
                padding: "0.75rem 1.5rem",
                borderBottom: "2px solid #FD870B",
              }}
            >
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: "#FD870B" }}
              >
                Careers
              </span>
            </div>
            <div className="p-8 sm:p-10" style={{ background: "#FFF8F5" }}>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                Interested in doing your best work? Join us!
              </h1>
            </div>
          </div>

          {careers.length > 0 ? (
            <CareersList careers={careers} />
          ) : (
            <div className="bevel-box">
              <p
                className="text-lg"
                style={{ color: "#6B3030" }}
              >
                No open positions at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
