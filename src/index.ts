import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/demo', (c) => {
  return c.text('Hello Hono!')
})

export default app