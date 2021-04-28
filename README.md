# singl

> A tiny utility library with ts + batteries included to easily create singletons in JavaScript

## Usage

They say an example is worth more than 100 words 😉

### Async

```typescript
import { singletonAsync } from 'singl'

import mongoose from 'mongoose'

export const connection = singletonAsync<typeof mongoose>(
   // This function initializes the singleton
   async () => {
      const instance = await mongoose.connect(
         'mongodb://some-arbitary-connection-uri:27017/test',
         {
            useNewUrlParser: true,
            useUnifiedTopology: true
         }
      )
      return instance
   },
   // This optional function is responsible for specifing
   // wether the instance should re-init or not
   async instance => !instance.connection
)
```

### Sync

```typescript
import { singleton } from 'singl'

import Redis from 'ioredis'

export const redis = singleton<Redis.Redis>(
   // This function initializes the singleton
   () => {
      return new Redis()
   },
   // This optional function is responsible for specifing
   // wether the instance should re-init or not
   instance => instance.status === 'connected'
)
```
