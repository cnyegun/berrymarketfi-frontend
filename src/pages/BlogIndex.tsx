import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { POSTS, type Post } from "../blog/posts";

function Cover({ post }: { post: Post }) {
  if (post.coverContain) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${post.coverBg ?? "bg-[#f5f7f4]"}`}>
        <img
          src={post.cover}
          alt=""
          className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <img
      src={post.cover}
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted">
      <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand-dark">
        {post.category}
      </span>
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span aria-hidden>·</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <PageLayout>
      {/* Header */}
      <header className="mx-auto max-w-[820px] px-6 pt-12 pb-10 text-center lg:pt-16">
        <h1 className="text-[39px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[53px]">
          The Berrymarket Journal
        </h1>
        <p className="mt-5 text-[21px] leading-relaxed text-muted">
          Field notes, thoughtful guides and quiet stories from Finland's forests — for the
          people who pick, the people who buy, and everyone who simply loves a good berry.
        </p>
      </header>

      {/* Featured */}
      <section className="mx-auto max-w-[1080px] px-6">
        <Link
          to={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl ring-1 ring-line transition-shadow hover:shadow-[0_30px_60px_-35px_rgba(20,40,30,0.4)] lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
            <Cover post={featured} />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <Meta post={featured} />
            <h2 className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
              {featured.title}
            </h2>
            <p className="mt-4 text-[18px] leading-relaxed text-muted">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[17px] font-semibold text-brand transition-all group-hover:gap-2.5">
              Read the story <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1080px] px-6 py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl ring-1 ring-line transition-shadow hover:shadow-[0_24px_50px_-35px_rgba(20,40,30,0.4)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Cover post={post} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Meta post={post} />
                <h3 className="mt-3 text-[22px] font-bold leading-snug tracking-[-0.01em] text-ink">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[17px] leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[16px] font-semibold text-brand transition-all group-hover:gap-2.5">
                  Read more <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
