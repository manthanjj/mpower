import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SITE_CONTENT } from "@/content/site";

export const metadata = {
  title: "Mental Wellness Journal & Articles | Bhagyashree Counselling",
  description: "Evidence-informed perspectives on anxiety, burnout, relationships, and emotional well-being.",
};

export default function BlogPage() {
  const { blogPosts } = SITE_CONTENT;

  return (
    <div className="space-y-16 py-12 md:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Wellness Journal & Insights
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Reflections, Strategies & Mental Health Insights
          </h1>
          <p className="text-lg text-[#5C6B64] leading-relaxed">
            Practical reflections and scientific frameworks to help you understand your nervous system, navigate relationships, and live with intentionality.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col justify-between border-[#E2E7E3] bg-[#FFFFFF] shadow-sm hover:shadow-md transition-all">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C6B64]">
                  <Badge variant="outline" className="text-xs text-[#2D4A3E] border-[#2D4A3E]/30">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-[#1A2421] leading-snug hover:text-[#2D4A3E] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>

                <CardDescription className="text-sm text-[#5C6B64] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 border-t border-[#E2E7E3] mt-4 flex items-center justify-between">
                <span className="text-xs text-[#5C6B64] flex items-center gap-1.5 pt-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2D4A3E] hover:underline pt-3"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
