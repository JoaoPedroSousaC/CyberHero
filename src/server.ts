import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { administradorRoutes } from "./routes/administrador.routes";
import { jogoRoutes } from "./routes/jogo.routes";
import { conteudoeducativoRoutes } from "./routes/conteudoeducativo.routes";
import { conteudoimagemRoutes } from "./routes/conteudoimagem.routes";
import { lojaRoutes } from "./routes/loja.routes";
import { medalhaRoutes} from "./routes/medalha.routes";
import { medalhadisponivelnalojaRoutes} from "./routes/medalhadisponivelnaloja.routes";
const app: FastifyInstance = fastify({})

app.register(userRoutes, {
    prefix: '/users',
    
})

app.register(administradorRoutes, {
    prefix: '/administrador',
    
})

app.register( jogoRoutes, {
    prefix: '/jogo',
    
})

app.register(conteudoeducativoRoutes, {
    prefix: '/conteudoeducativo',
    
})

app.register(conteudoimagemRoutes, {
    prefix: '/conteudoimagem',
    
})

app.register(lojaRoutes, {
    prefix: '/loja',
    
})

app.register(medalhaRoutes, {
    prefix: '/medalha',
    
})

app.register(medalhadisponivelnalojaRoutes, {
    prefix: '/medalhadisponivelnaloja',
    
})

app.listen({
    port: 3333,
},
() => console.log('server is running on port 3333')
)