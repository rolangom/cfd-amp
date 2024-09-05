
import type { NextRequest } from 'next/server'
import { db } from '../../../src/db'
import { users as usersTable } from '../../../schemas/users'

export async function GET(request: NextRequest) {
  const users = await db.select().from(usersTable)
  return new Response(JSON.stringify(users))
}
