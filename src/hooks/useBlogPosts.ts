import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts, type BlogPost } from "@/data/blogData";

export function useBlogPosts(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, date, read_time, category, meta_description")
      .eq("published", true)
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        const mapped: BlogPost[] = data.map((r: any) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          content: r.content,
          date: r.date,
          readTime: r.read_time,
          category: r.category,
          metaDescription: r.meta_description,
        }));
        setPosts(mapped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
}