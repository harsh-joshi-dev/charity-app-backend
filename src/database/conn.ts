import mongoose from 'mongoose'

const mongoURI: string = process.env.MONGO_URI as string

mongoose.connect(mongoURI).then(() => {
  console.log('Database connection successfully established')
}).catch((error: any) => {
  console.log('Database connection issue:', error.message)
})
