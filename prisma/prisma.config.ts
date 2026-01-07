import path from 'node:path'
import type { PrismaConfig } from 'prisma'

export default {
  earlyAccess: true,
  schema: path.join(__dirname, 'schema.prisma'),

  // For prisma db push
  db: {
    async url() {
      return process.env.DATABASE_URL!
    },
  },

  // For prisma migrate
  migrate: {
    async url() {
      return process.env.DATABASE_URL!
    },
    async shadowDatabaseUrl() {
      return process.env.DIRECT_URL || process.env.DATABASE_URL!
    },
  },
} satisfies PrismaConfig
