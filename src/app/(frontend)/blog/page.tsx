import type { Metadata } from 'next'
import Link from 'next/link'
import BasicLayout from '@/components/layouts/BasicLayout'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLatestPosts } from '@/lib/payload/queries'
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Notas Técnicas | Justin Castro Perez',
  description:
    'Artículos, guías y aprendizajes sobre ingeniería de software, desarrollo frontend con Next.js y arquitecturas cloud.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogIndexPage() {
  const posts = await getLatestPosts('es', 20)

  return (
    <BasicLayout>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono mb-8 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-2 mb-2 text-primary font-mono text-xs uppercase tracking-wider">
          <BookOpen className="size-4" />
          <span>Publicaciones</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Blog & Experiencias Técnicas
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl mb-12 leading-relaxed">
          Documentando retos de ingeniería, optimizaciones de rendimiento y arquitectura de aplicaciones web en producción.
        </p>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col justify-between border border-border bg-card/60 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('es-ES', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Reciente'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readTime} min
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground tracking-tight line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-mono py-0 px-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0 border-t border-border/40 mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1 pt-4"
                  >
                    <span>Leer artículo completo</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl border border-dashed border-border text-center bg-card/40 my-8">
            <BookOpen className="size-10 mx-auto text-muted-foreground/60 mb-4" />
            <h3 className="text-lg text-foreground font-semibold">Próximamente nuevas publicaciones</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Estoy escribiendo artículos sobre Next.js 15, integración de Payload CMS y mejores prácticas de accesibilidad. ¡Vuelve pronto!
            </p>
          </div>
        )}
      </div>
    </BasicLayout>
  )
}
