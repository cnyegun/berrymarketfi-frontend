import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { getPost, POSTS, type Block, type Post } from "../blog/posts";

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 text-[26px] font-bold tracking-[-0.01em] text-ink sm:text-[31px]">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mt-5 text-[20px] leading-[1.8] text-muted">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <figure key={i} className="my-10 border-l-4 border-brand pl-6">
          <blockquote className="text-[24px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            “{block.text}”
          </blockquote>
        </figure>
      );
    case "ul":
      return (
        <ul key={i} className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[20px] leading-[1.7] text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

function Banner({ post }: { post: Post }) {
  return (
    <div className="aspect-[16/7] overflow-hidden rounded-3xl">
      {post.coverContain ? (
        <div className={`flex h-full w-full items-center justify-center ${post.coverBg ?? "bg-[#f5f7f4]"}`}>
          <img src={post.cover} alt="" className="h-full w-full object-contain p-8" />
        </div>
      ) : (
        <img src={post.cover} alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-[640px] px-6 py-28 text-center">
          <h1 className="text-[34px] font-extrabold tracking-[-0.01em] text-ink">
            We couldn't find that story
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-muted">
            It may have wandered off into the forest. Let's get you back to the journal.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-[17px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <ArrowLeft size={17} /> Back to the journal
          </Link>
        </div>
      </PageLayout>
    );
  }

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageLayout>
      {/* Header */}
      <header className="mx-auto max-w-[760px] px-6 pt-12 pb-8 text-center lg:pt-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand transition-all hover:gap-2.5"
        >
          <ArrowLeft size={15} /> The Berrymarket Journal
        </Link>
        <p className="mt-6 text-[16px] font-semibold italic text-brand">
          {post.category}
        </p>
        <h1 className="mt-3 text-[37px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[48px]">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[15px] text-muted">
          <span className="font-semibold text-ink">{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Banner */}
      <figure className="mx-auto max-w-[1080px] px-6">
        <Banner post={post} />
        {post.credit && (
          <figcaption className="mt-2 px-1 text-right text-[14px] text-muted/70">
            Photo: {post.credit.author} ·{" "}
            <a
              href={post.credit.source}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-brand"
            >
              {post.credit.license}
            </a>{" "}
            · Wikimedia Commons
          </figcaption>
        )}
      </figure>

      {/* Body */}
      <article className="mx-auto max-w-[720px] px-6 pb-6 pt-8">
        {post.content.map(renderBlock)}
      </article>

      {/* Keep reading */}
      <section className="mx-auto max-w-[1080px] px-6 pb-20 pt-8">
        <div className="border-t border-line pt-10">
          <h2 className="text-[25px] font-extrabold tracking-[-0.01em] text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex items-center gap-4 rounded-2xl ring-1 ring-line p-4 transition-shadow hover:shadow-[0_16px_36px_-28px_rgba(20,40,30,0.45)]"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  {p.coverContain ? (
                    <div className={`flex h-full w-full items-center justify-center ${p.coverBg ?? "bg-[#f5f7f4]"}`}>
                      <img src={p.cover} alt="" className="h-full w-full object-contain p-2" />
                    </div>
                  ) : (
                    <img src={p.cover} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="text-[14px] font-semibold italic text-brand">
                    {p.category}
                  </p>
                  <p className="mt-1 text-[17px] font-bold leading-snug text-ink">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-1.5 text-[17px] font-semibold text-brand transition-all hover:gap-2.5"
          >
            See all stories <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
