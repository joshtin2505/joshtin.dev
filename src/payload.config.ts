import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Skills } from './collections/Skills'
import { Experiences } from './collections/Experiences'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Profile } from './globals/Profile'
import { HomePage } from './globals/HomePage'
import { Landing } from './globals/Landing'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Skills, Experiences, Projects, Posts],
  globals: [SiteSettings, Landing, Profile, HomePage],
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || process.env.AWS_BUCKET || 'default',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-2',
        endpoint: process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT_URL_S3,
        forcePathStyle: true,
      },
      enabled: Boolean(
        (process.env.S3_BUCKET || process.env.AWS_BUCKET) &&
        (process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID) &&
        (process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY)
      ),
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev-payload-secret-key-at-least-32-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.DATABASE_URI?.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
    },
  }),
})
