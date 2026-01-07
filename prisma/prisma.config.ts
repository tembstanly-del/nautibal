import path from 'node:path'
import type { PrismaConfig } from 'prisma'

export default {
  earlyAccess: true,
  schema: path.join(__dirname, 'schema.prisma'),

  migrate: {
    async url() {
      return process.env.DATABASE_URL!
    },
    async shadowDatabaseUrl() {
      return process.env.DIRECT_URL || process.env.DATABASE_URL!
    },
  },
} satisfies PrismaConfig
