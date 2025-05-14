import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
const app: FastifyInstance = fastify({})

app.register(userRoutes, {
    prefix: '/users',
    
})

app.listen({
    port: 3333,
},
() => console.log('server is running on port 3333')
)