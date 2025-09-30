import express from 'express'
// import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
// import * as trpcExpress from '@trpc/server/adapters/express'
// import { appRouter } from './trpc'
// import { inferAsyncReturnType } from '@trpc/server'
// import bodyParser from 'body-parser'
// import { IncomingMessage } from 'http'
// import { stripeWebhookHandler } from './webhooks'
// import nextBuild from 'next/dist/build'
// import path from 'path'
// import { PayloadRequest } from 'payload/types'
// import { parse } from 'url'

const app = express()
const PORT = Number(process.env.PORT) || 3000

// const createContext = ({
//   req,
//   res,
// }: trpcExpress.CreateExpressContextOptions) => ({
//   req,
//   res,
// })

// export type ExpressContext = inferAsyncReturnType<
//   typeof createContext
// >

// export type WebhookRequest = IncomingMessage & {
//   rawBody: Buffer
// }

const start = async () => {
  // Geçici: webhook, Payload, TRPC ve cart route devre dışı

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    app.listen(PORT, async () => {
      // console.log(`App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start()
