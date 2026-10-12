import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import BasicLayout from '@/components/layouts/BasicLayout'
import { RichText } from '@/components/blog/RichText'
import { Badge } from '@/components/ui/badge'
import { getPostBySlug } from '@/lib/payload/queries'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'es')

  if (!post) {
    return {
      title: 'Artículo no encontrado | Justin Castro Perez',
    }
  }

  return {
    title: `${post.title} | Justin Castro Perez`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Justin Castro Perez'],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'es')

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Justin Castro Perez',
      url: 'https://joshtin.tech',
    },
    image: post.coverImageUrl || undefined,
  }

  return (
    <BasicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-mono mb-8 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Volver al blog</span>
        </Link>

        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Reciente'}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readTime} min de lectura
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-mono py-0.5 px-2.5">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {post.coverImageUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 ring-1 ring-border/80">
            <Image
              src={post.coverImageUrl}
              alt={`Imagen de portada de ${post.title}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="border-t border-border/80 pt-10">
          <RichText content={post.content} />
        </div>
      </article>
    </BasicLayout>
  )
}
