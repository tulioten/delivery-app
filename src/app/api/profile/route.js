import { getServerSession } from 'next-auth'
import mongoose from 'mongoose'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/models/User'
import UserInfo from '@/models/UserInfo'

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)

  const data = await req.json()
  const { name, image, ...userInformation } = data
  const session = await getServerSession(authOptions)
  const email = session.user.email

  await User.updateOne({ email }, { name, image })
  await UserInfo.findOneAndUpdate({ email }, userInformation, { upsert: true })

  return Response.json(true)
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)

  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) {
    return Response.json({})
  }

  const user = await User.findOne({ email }).lean()
  const userInfo = await UserInfo.findOne({ email }).lean()

  const userData = { ...user, ...userInfo }

  return Response.json(userData)
}
