import 'reflect-metadata'
import { Squiggle } from './app/Squiggle.js'

const app = new Squiggle()

await app.init()

app.listen(3000)
