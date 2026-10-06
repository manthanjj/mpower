import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONTENT } from "@/content/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SITE_CONTENT.blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = SITE_CONTENT.blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} | Bhagyashree Counselling`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = SITE_CONTENT.blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6B64] hover:text-[#2D4A3E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all articles
        </Link>

        {/* Post Header */}
        <header className="space-y-4 border-b border-[#E2E7E3] pb-8">
          <div className="flex items-center gap-3 text-xs">
            <Badge variant="secondary" className="font-semibold text-[#2D4A3E]">
              {post.category}
            </Badge>
            <span className="text-[#5C6B64] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-[#5C6B64] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight leading-[1.18]">
            {post.title}
          </h1>

          <p className="text-lg text-[#5C6B64] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-[#1A2421] space-y-6 text-base leading-relaxed bg-[#FFFFFF] p-8 md:p-12 rounded-3xl border border-[#E2E7E3] shadow-sm">
          {post.content.trim().split("\n\n").map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#1A2421] mt-6 mb-2">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").map((li) => li.replace("- ", ""));
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm text-[#5C6B64]">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.startsWith("1. ")) {
              const items = block.split("\n").map((li) => li.replace(/^\d+\.\s*/, ""));
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-sm text-[#5C6B64]">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-sm md:text-base text-[#5C6B64] leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="bg-[#2D4A3E] text-[#FBFBF9] rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Looking for personalized support?</h3>
          <p className="text-sm text-[#E7EFE9] max-w-xl mx-auto">
            Book a confidential 1-on-1 session to work through your specific goals with guided psychological care.
          </p>
          <div className="pt-2">
            <Link href="/book">
              <Button size="lg" className="bg-[#FBFBF9] text-[#2D4A3E] hover:bg-[#E7EFE9] font-bold">
                Book a Session Online <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
