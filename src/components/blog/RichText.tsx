import React from 'react'
import Link from 'next/link'

interface TextNode {
  type: 'text'
  text: string
  format?: number
}

interface ElementNode {
  type: string
  tag?: string
  children?: Array<ElementNode | TextNode>
  format?: string | number
  url?: string
  newTab?: boolean
  listType?: 'bullet' | 'number'
  value?: number
  [key: string]: unknown
}

interface RichTextProps {
  content: unknown
  className?: string
}

// Lexical text format bitmasks
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16

function serializeNode(node: ElementNode | TextNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    const textNode = node as TextNode
    let textElement: React.ReactNode = textNode.text

    if (textNode.format) {
      if (textNode.format & IS_BOLD) {
        textElement = <strong key="b">{textElement}</strong>
      }
      if (textNode.format & IS_ITALIC) {
        textElement = <em key="i">{textElement}</em>
      }
      if (textNode.format & IS_UNDERLINE) {
        textElement = <u key="u">{textElement}</u>
      }
      if (textNode.format & IS_STRIKETHROUGH) {
        textElement = <s key="s">{textElement}</s>
      }
      if (textNode.format & IS_CODE) {
        textElement = (
          <code key="c" className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-primary">
            {textElement}
          </code>
        )
      }
    }
    return <React.Fragment key={index}>{textElement}</React.Fragment>
  }

  const elem = node as ElementNode
  const children = elem.children?.map((child, i) => serializeNode(child, i))

  switch (elem.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-base text-muted-foreground leading-relaxed mb-4">
          {children}
        </p>
      )
    case 'heading': {
      const tag = elem.tag || 'h2'
      if (tag === 'h1' || tag === 'h2') {
        return (
          <h2 key={index} className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-4">
            {children}
          </h2>
        )
      }
      if (tag === 'h3') {
        return (
          <h3 key={index} className="text-xl font-semibold tracking-tight text-foreground mt-6 mb-3">
            {children}
          </h3>
        )
      }
      return (
        <h4 key={index} className="text-lg font-medium tracking-tight text-foreground mt-4 mb-2">
          {children}
        </h4>
      )
    }
    case 'list': {
      if (elem.listType === 'number') {
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-4 pl-4 text-muted-foreground">
            {children}
          </ol>
        )
      }
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-4 pl-4 text-muted-foreground">
          {children}
        </ul>
      )
    }
    case 'listitem':
      return (
        <li key={index} className="leading-relaxed">
          {children}
        </li>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary pl-4 my-6 italic text-foreground/90 bg-muted/20 py-2 rounded-r"
        >
          {children}
        </blockquote>
      )
    case 'link':
      return (
        <Link
          key={index}
          href={elem.url || '#'}
          target={elem.newTab ? '_blank' : undefined}
          rel={elem.newTab ? 'noreferrer noopener' : undefined}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      )
    default:
      return <div key={index}>{children}</div>
  }
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content || typeof content !== 'object' || !('root' in content)) {
    return null
  }

  const root = (content as { root?: { children?: Array<ElementNode | TextNode> } }).root
  if (!root?.children) return null

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      {root.children.map((child, i) => serializeNode(child, i))}
    </div>
  )
}
