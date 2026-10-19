import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/site/SiteShell";
import { ArrowLink, GrainHeader, PressSection, SectionIntro } from "../components/site/sections";
import { articlePath, formatDate, getArticles, type Article } from "@/utils/content";

export const metadata: Metadata = {
  title: "Media & Events | Aerium",
  description: "Company news and where to find the Aerium team on the road in 2026.",
};

// Soonest first. `tags` render as pills; "Speaking" gets the burgundy accent.
const EVENTS = [
  {
    dates: "Nov 11–13",
    year: "2026",
    title: "SOCMA Summit",
    tags: ["Booth"],
    org: "Society of Chemical Manufacturers and Affiliates",
    body: "See the Aerium workforce live on specialty chemicals workflows.",
    href: "https://www.socma.org/forms/meeting/Microsite/2026_socma_summit,0",
  },
  {
    dates: "Nov 17–18",
    year: "2026",
    title: "CME National Manufacturing Conference",
    tags: ["Speaking", "Booth"],
    org: "Canadian Manufacturers and Exporters",
    body: "We are speaking on the panel “AI and Advanced Technologies: Driving the Next Era of Manufacturing” and exhibiting on the show floor.",
    href: "https://cme-mec.ca/connection/2026-national-manufacturing-conference/",
  },
];

function NewsMeta({ article }: { article: Article }) {
  return (
    <div className="b-news-meta">
      <span className="b-tag b-tag-accent">{article.category}</span>
      {article.date && <span>{formatDate(article.date)}</span>}
    </div>
  );
}

export default function MediaEventsPage() {
  const [featured, ...earlier] = getArticles();

  return (
    <SiteShell navOverlay>
      <GrainHeader eyebrow="Media and events" title="The latest from Aerium">
        <p className="b-header-sub">Company news and where to find the Aerium team on the road in 2026.</p>
      </GrainHeader>

      {featured && (
        <section className="b-section b-white">
          <div className="b-wrap">
            <SectionIntro eyebrow="Company news" title="News and announcements" />
            <article className="b-news-feature" data-reveal="rise">
              <Link href={articlePath(featured.slug)} className="b-news-feature-photo" aria-label={featured.title} style={{ ["--photo" as string]: `url(${featured.image})` }} />
              <div className="b-news-feature-copy">
                <div className="b-news-feature-text">
                  <NewsMeta article={featured} />
                  <h3 className="b-news-feature-title">
                    <Link href={articlePath(featured.slug)}>{featured.title}</Link>
                  </h3>
                  <p className="b-body-copy">{featured.summary}</p>
                </div>
                <ArrowLink href={articlePath(featured.slug)}>Read the article</ArrowLink>
              </div>
            </article>
            {earlier.length > 0 && (
              <div className="b-news-list" data-reveal="stagger">
                {earlier.map((article) => (
                  <Link key={article.slug} href={articlePath(article.slug)} className="b-news-row">
                    <NewsMeta article={article} />
                    <span className="b-news-row-title">{article.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="b-section b-stone">
        <div className="b-wrap">
          <SectionIntro eyebrow="Events" title="On the calendar" lede="Come see the Aerium workforce live, or catch us on stage." />
          <div className="b-list-card" data-reveal="stagger">
            {EVENTS.map((event) => (
              <div key={event.title} className="b-event">
                <div className="b-event-date">
                  <span>{event.dates}</span>
                  <small>{event.year}</small>
                </div>
                <div className="b-event-main">
                  <div className="b-role-row-title">
                    <span className="b-event-title">{event.title}</span>
                    {event.tags.map((tag) => (
                      <span key={tag} className={`b-tag ${tag === "Speaking" ? "b-tag-accent" : ""}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="b-role-row-detail">{event.org}</div>
                  <p className="b-body-copy">{event.body}</p>
                </div>
                <div className="b-event-link">
                  <ArrowLink href={event.href} external>
                    Event details
                  </ArrowLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PressSection />
    </SiteShell>
  );
}
