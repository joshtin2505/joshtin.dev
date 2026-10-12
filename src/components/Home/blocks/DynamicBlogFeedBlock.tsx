import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogPostItem } from '@/lib/payload/queries'

interface DynamicBlogFeedBlockProps {
  block: {
    title?: string
    subtitle?: string
    limit?: number
  }
  posts: BlogPostItem[]
}

export function DynamicBlogFeedBlock({ block, posts }: DynamicBlogFeedBlockProps) {
  const displayTitle = block.title || 'Artículos y Experiencias'
  const displaySubtitle =
    block.subtitle ||
    'Notas técnicas, lecciones aprendidas y reflexiones sobre desarrollo de software y arquitectura web.'

  return (
    <section id="blog" className="max-w-5xl mx-auto px-4 py-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
            <BookOpen className="size-4" />
            <span>Blog Técnico</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {displayTitle}
          </h2>
        </div>
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'hidden sm:inline-flex gap-1.5 text-xs font-mono')}
        >
          <span>Ver todos</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <p className="text-muted-foreground text-sm max-w-2xl mb-8 leading-relaxed font-sans">
        {displaySubtitle}
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col justify-between border border-border bg-card/60 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Reciente'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readTime} min
                  </span>
                </div>

                <h3 className="text-base font-semibold text-foreground tracking-tight line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] py-0 px-2 font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Leer artículo</span>
                  <ArrowRight className="size-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-dashed border-border text-center bg-card/30">
          <BookOpen className="size-8 mx-auto text-muted-foreground/60 mb-3" />
          <p className="text-sm text-foreground font-medium">Próximamente artículos técnicos</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
            Actualmente documentando aprendizajes y casos prácticos sobre Next.js, Payload CMS y arquitecturas modernas.
          </p>
        </div>
      )}
    </section>
  )
}
