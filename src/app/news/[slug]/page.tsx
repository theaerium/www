import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../components/site/SiteShell";
import RollLabel from "../../components/site/RollLabel";
import Markdown from "../../components/site/content/Markdown";
import { GrainHeader, PressSection, SiteLink } from "../../components/site/sections";
import { routes } from "../../components/site/routes";
import { formatDate, getArticle, getArticles, readingMinutes } from "@/utils/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title} | Aerium`,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, images: [article.image], type: "article" },
  };
}

const joinNames = (names: string[]) => (names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`);

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const authorNames = joinNames(article.authors.map((author) => author.name));
  const byline = [article.authorRole, formatDate(article.date), `${readingMinutes(article.body)} min read`].filter(Boolean).join(" · ");

  return (
    <SiteShell navOverlay>
      <GrainHeader back={{ label: "All news", href: routes.media }} eyebrow={`Company news · ${article.category}`} title={article.title} size="article">
        <div className="b-byline">
          <div className="b-avatars" aria-hidden="true">
            {article.authors.map((author) => (
              <span key={author.name}>{author.initials}</span>
            ))}
          </div>
          <div>
            <div className="b-byline-names">{authorNames}</div>
            <div className="b-byline-meta">{byline}</div>
          </div>
        </div>
      </GrainHeader>

      <article className="b-white b-article">
        <div className="b-wrap">
          <div className="b-article-photo" role="img" aria-label={article.imageAlt ?? ""} style={{ ["--photo" as string]: `url(${article.image})` }} />
          <div className="b-article-body">
            <Markdown className="b-prose-article">{article.body}</Markdown>
            {article.hiringCallout && (
              <aside className="b-article-callout">
                <div>
                  <div className="b-role-row-title">We are hiring in Toronto</div>
                  <p>Forward deployed engineers who take solutions from idea to deployment.</p>
                </div>
                <SiteLink href={`${routes.careers}#open-roles`} className="b-btn b-btn-burgundy b-btn-small">
                  <RollLabel>See open roles</RollLabel>
                </SiteLink>
              </aside>
            )}
            <footer className="b-article-signoff">
              <div>{authorNames}</div>
              <span>
                {article.authorRole}, Aerium
              </span>
            </footer>
          </div>
        </div>
      </article>

      <PressSection tone="stone" />
    </SiteShell>
  );
}
