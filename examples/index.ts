import { singleton, singletonAsync } from '..'

import mongoose from 'mongoose'
import Redis from 'ioredis'

export const mongo = singletonAsync<typeof mongoose>(
   async () => {
      console.log('Instanciating mongoose')
      const instance = await mongoose.connect(
         'mongodb://some-arbitary-connection-uri:27017/test',
         {
            useNewUrlParser: true,
            useUnifiedTopology: true
         }
      )
      return instance
   },
   async instance => !instance.connection
)

export const redis = singleton<Redis.Redis>(
   () => {
      return new Redis()
   },
   instance => instance.status === 'connected'
)

const main = async () => {
   const db1 = await mongo()
   console.log('Mongoose connection state is', db1.connection.readyState)

   // Somewhere in another file
   const db2 = await mongo()
   console.log('Mongoose connection state is', db2.connection.readyState)

   console.log(
      'Both mongoose instances refer to the same object',
      Object.is(db1, db2)
   ) // This should return true

   const red1 = redis()
   console.log('Redis connection state is', red1.status)

   const red2 = redis()
   console.log('Redis connection state is', red2.status)

   console.log(
      'Both redis instances refer to the same object',
      Object.is(red1, red2)
   ) // This should return true
}

main()
