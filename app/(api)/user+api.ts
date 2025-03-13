import { neon } from '@neondatabase/serverless'

export async function POST(req: Request) {
  console.log('- Create User -', req)

  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { name, email, clerkId } = await req.json()

    console.log('req', name, email, clerkId)

    if (!name || !email || !clerkId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO users (name, email, clerk_id)
      VALUES (${name}, ${email}, ${clerkId})
    `

    return Response.json({ data: result }, { status: 200 })
  } catch (err: any) {
    console.log(err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}
