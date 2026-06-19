import {
  CalendarDays,
  Heart,
  MessageCircle,
  Rocket,
  UserRound,
} from "lucide-react";
import Image from "next/image";

export const dynamic = "force-static";

const featuredPost = {
  author: "Orbit Aerostructures",
  category: "Rocketry",
  comments: 8,
  date: "June 12, 2026",
  excerpt:
    "A quick look at how composite choices, fin geometry, and payload constraints shape our current airframe decisions.",
  image: "/images/misc/SpaceX.jpg",
  likes: 42,
  readTime: "6 min read",
  title: "Building a Competition-Ready Airframe",
};

const posts = [
  {
    author: "Avionics Team",
    category: "Avionics",
    comments: 5,
    date: "May 28, 2026",
    excerpt:
      "Telemetry, data logging, and flight-state detection notes from the latest onboard electronics review.",
    image: "/images/misc/avionics.jpeg",
    likes: 31,
    readTime: "4 min read",
    title: "What the Flight Computer Needs to Know",
  },
  {
    author: "Aerostructures Team",
    category: "Design",
    comments: 3,
    date: "May 10, 2026",
    excerpt:
      "Tradeoffs between stability, drag, and manufacturability while selecting nosecone and fin profiles.",
    image: "/images/misc/aero.svg",
    likes: 24,
    readTime: "5 min read",
    title: "Design Notes from the Wind Side",
  },
  {
    author: "Operations",
    category: "Team",
    comments: 6,
    date: "April 22, 2026",
    excerpt:
      "How the team coordinates documentation, sponsorship tasks, subsystem reviews, and launch-readiness planning.",
    image: "/images/misc/Earth.png",
    likes: 29,
    readTime: "3 min read",
    title: "Keeping a Rocket Team Moving",
  },
];

function InteractionStats({
  likes,
  comments,
}: {
  likes: number;
  comments: number;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 border border-white/15 px-3 transition hover:border-white/40 hover:bg-white/10"
      >
        <Heart className="h-4 w-4" />
        <span>{likes}</span>
      </button>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 border border-white/15 px-3 transition hover:border-white/40 hover:bg-white/10"
      >
        <MessageCircle className="h-4 w-4" />
        <span>{comments}</span>
      </button>
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen px-5 pb-20 pt-10 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-sm text-blue-100">
              <Rocket className="h-4 w-4" />
              Orbit Journal
            </div>
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Blogs
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-right">
            Updates from the team on design, avionics, testing, operations, and
            the work behind each launch cycle.
          </p>
        </div>

        <article className="grid overflow-hidden border border-white/15 bg-black/80 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-72">
            <Image
              src={featuredPost.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-white/60">
                <span className="border border-blue-300/30 px-2 py-1 text-blue-100">
                  {featuredPost.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {featuredPost.date}
                </span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                {featuredPost.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/75">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-sm text-white/65">
                <UserRound className="h-4 w-4" />
                {featuredPost.author}
              </div>
              <InteractionStats
                likes={featuredPost.likes}
                comments={featuredPost.comments}
              />
            </div>
          </div>
        </article>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="overflow-hidden border border-white/15 bg-black/75"
            >
              <div className="relative aspect-[16/10] bg-white/5">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-72 flex-col justify-between gap-6 p-5">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-white/55">
                    <span className="border border-white/15 px-2 py-1 text-white/75">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 leading-7 text-white/70">{post.excerpt}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 text-sm text-white/60">
                    <UserRound className="h-4 w-4" />
                    {post.author}
                  </div>
                  <InteractionStats
                    likes={post.likes}
                    comments={post.comments}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
