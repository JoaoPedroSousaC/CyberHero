// src/server.ts
import fastify from "fastify";

// src/database/prisma-client.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();

// src/repositories/user.repository.ts
var UserRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        totalpoints: data.totalpoints ?? 0,
        paypoints: data.paypoints ?? 0,
        doneQuiz: data.doneQuiz ?? []
      }
    });
    return this.mapToInterface(created);
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapToInterface(user) : null;
  }
  async get(id) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapToInterface(user) : null;
  }
  async update(id, data) {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        totalpoints: data.totalpoints,
        paypoints: data.paypoints,
        doneQuiz: data.doneQuiz
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.user.delete({ where: { id } });
  }
  mapToInterface(prismaUser) {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password,
      totalpoints: prismaUser.totalpoints,
      paypoints: prismaUser.paypoints,
      doneQuiz: prismaUser.doneQuiz,
      createdAt: prismaUser.createdAt.toISOString(),
      updatedAt: prismaUser.updatedAt.toISOString()
    };
  }
};

// src/usecases/user.usecase.ts
var UserUseCase = class {
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }
  async create({ email, name, password, totalpoints = 0, paypoints = 0, doneQuiz = [] }) {
    const exists = await this.userRepository.findByEmail(email);
    if (exists) throw new Error("User already exists");
    return await this.userRepository.create({
      email,
      name,
      password,
      totalpoints,
      paypoints,
      doneQuiz
    });
  }
  async get(id) {
    return await this.userRepository.get(id);
  }
  async getByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }
  async update(id, data) {
    const user = await this.userRepository.get(id);
    if (!user) throw new Error("User not found");
    return await this.userRepository.update(id, data);
  }
  async delete(id) {
    const user = await this.userRepository.get(id);
    if (!user) throw new Error("User not found");
    await this.userRepository.delete(id);
  }
};

// src/routes/user.routes.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function userRoutes(fastify2) {
  const userUseCase = new UserUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, email, password, totalpoints, paypoints, doneQuiz } = req.body;
    try {
      const existingUser = await userUseCase.getByEmail(email);
      if (existingUser) {
        return reply.status(400).send({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await userUseCase.create({
        name,
        email,
        password: hashedPassword,
        totalpoints,
        paypoints,
        doneQuiz
      });
      return reply.status(201).send(data);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/login", async (req, reply) => {
    try {
      const { email, password } = req.body;
      const user = await userUseCase.getByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "supersecretkey",
        { expiresIn: "1h" }
      );
      return reply.send({ token });
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const user = await userUseCase.get(req.params.id);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await userUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await userUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/repositories/administrador.repository.ts
var AdministradorRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.administrador.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
    return this.mapToInterface(created);
  }
  async findByEmail(email) {
    const administrador = await prisma.administrador.findUnique({ where: { email } });
    return administrador ? this.mapToInterface(administrador) : null;
  }
  async get(id) {
    const administrador = await prisma.administrador.findUnique({ where: { id } });
    return administrador ? this.mapToInterface(administrador) : null;
  }
  async update(id, data) {
    const updated = await prisma.administrador.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.administrador.delete({ where: { id } });
  }
  mapToInterface(prismaAdministrador) {
    return {
      id: prismaAdministrador.id,
      name: prismaAdministrador.name,
      email: prismaAdministrador.email,
      password: prismaAdministrador.password,
      createdAt: prismaAdministrador.createdAt.toISOString(),
      updatedAt: prismaAdministrador.updatedAt.toISOString()
    };
  }
};

// src/usecases/administrador.usecase.ts
var AdministradorUseCase = class {
  constructor() {
    this.administradorRepository = new AdministradorRepositoryPrisma();
  }
  async create({ email, name, password }) {
    const exists = await this.administradorRepository.findByEmail(email);
    if (exists) throw new Error("Administrador already exists");
    return await this.administradorRepository.create({
      email,
      name,
      password
    });
  }
  async get(id) {
    return await this.administradorRepository.get(id);
  }
  async getByEmail(email) {
    return await this.administradorRepository.findByEmail(email);
  }
  async update(id, data) {
    const administrador = await this.administradorRepository.get(id);
    if (!administrador) throw new Error("Administrador not found");
    return await this.administradorRepository.update(id, data);
  }
  async delete(id) {
    const administrador = await this.administradorRepository.get(id);
    if (!administrador) throw new Error("Administrador not found");
    await this.administradorRepository.delete(id);
  }
};

// src/routes/administrador.routes.ts
import bcrypt2 from "bcrypt";
import jwt2 from "jsonwebtoken";
async function administradorRoutes(fastify2) {
  const administradorUseCase = new AdministradorUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const existingAdministrador = await administradorUseCase.getByEmail(email);
      if (existingAdministrador) {
        return reply.status(400).send({ error: "Administrador already exists" });
      }
      const hashedPassword = await bcrypt2.hash(password, 10);
      const data = await administradorUseCase.create({
        name,
        email,
        password: hashedPassword
      });
      return reply.status(201).send(data);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/login", async (req, reply) => {
    try {
      const { email, password } = req.body;
      const administrador = await administradorUseCase.getByEmail(email);
      if (!administrador) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const passwordMatch = await bcrypt2.compare(password, administrador.password);
      if (!passwordMatch) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const token = jwt2.sign(
        { administradorId: administrador.id, email: administrador.email },
        process.env.JWT_SECRET || "supersecretkey",
        { expiresIn: "1h" }
      );
      return reply.send({ token });
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const administrador = await administradorUseCase.get(req.params.id);
      if (!administrador) {
        return reply.status(404).send({ message: "Administrador not found" });
      }
      return reply.send(administrador);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await administradorUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await administradorUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/jogo.routes.ts
async function JogoRoutes(fastify2) {
  const JogoUseCase = new JogoUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, descricao, points } = req.body;
    try {
      const existingJogo = await JogoUseCase.getByName(name);
      if (existingJogo) {
        return reply.status(400).send({ error: "Jogo already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { name } = req.body;
      const Jogo = await JogoUseCase.getByName(name);
      if (!Jogo) {
        return reply.status(401).send({ error: "Invalid name" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const Jogo = await JogoUseCase.get(req.params.id);
      if (!Jogo) {
        return reply.status(404).send({ message: "Jogo not found" });
      }
      return reply.send(Jogo);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await JogoUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await JogoUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/conteudoeducativo.routes.ts
async function ConteudoEducativoRoutes(fastify2) {
  const ConteudoEducativoUseCase = new ConteudoEducativoUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, titulo, texto } = req.body;
    try {
      const existingConteudoEducativo = await ConteudoEducativoUseCase.getByTitulo(titulo);
      if (existingConteudoEducativo) {
        return reply.status(400).send({ error: "ConteudoEducativo already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { titulo } = req.body;
      const ConteudoEducativo = await ConteudoEducativoUseCase.getByTitulo(titulo);
      if (!ConteudoEducativo) {
        return reply.status(401).send({ error: "Invalid titulo or texto" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const ConteudoEducativo = await ConteudoEducativoUseCase.get(req.params.id);
      if (!ConteudoEducativo) {
        return reply.status(404).send({ message: "ConteudoEducativo not found" });
      }
      return reply.send(ConteudoEducativo);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await ConteudoEducativoUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await ConteudoEducativoUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/conteudoimagem.routes.ts
async function ConteudoImagemRoutes(fastify2) {
  const ConteudoImagemUseCase = new ConteudoImagemUseCase();
  fastify2.post("/", async (req, reply) => {
    const { url } = req.body;
    try {
      const existingConteudoImagem = await ConteudoImagemUseCase.getByUrl(url);
      if (existingConteudoImagem) {
        return reply.status(400).send({ error: "ConteudoImagem already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { titulo } = req.body;
      const ConteudoImagem = await ConteudoImagemUseCase.getByTitulo(titulo);
      if (!ConteudoImagem) {
        return reply.status(401).send({ error: "Invalid titulo or texto" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const ConteudoImagem = await ConteudoImagemUseCase.get(req.params.id);
      if (!ConteudoImagem) {
        return reply.status(404).send({ message: "ConteudoImagem not found" });
      }
      return reply.send(ConteudoImagem);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await ConteudoImagemUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await ConteudoImagemUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/loja.routes.ts
async function LojaRoutes(fastify2) {
  const LojaUseCase = new LojaUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name } = req.body;
    try {
      const existingLoja = await LojaUseCase.getByName(name);
      if (existingLoja) {
        return reply.status(400).send({ error: "Loja already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { name } = req.body;
      const Loja = await LojaUseCase.getByName(name);
      if (!Loja) {
        return reply.status(401).send({ error: "Invalid name" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const Loja = await LojaUseCase.get(req.params.id);
      if (!Loja) {
        return reply.status(404).send({ message: "Loja not found" });
      }
      return reply.send(Loja);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await LojaUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await LojaUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/medalha.routes.ts
async function MedalhaRoutes(fastify2) {
  const MedalhaUseCase = new MedalhaUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, descricao, icon } = req.body;
    try {
      const existingMedalha = await MedalhaUseCase.getByDescricao(descricao);
      if (existingMedalha) {
        return reply.status(400).send({ error: "Medalha already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { descricao } = req.body;
      const Medalha = await MedalhaUseCase.getByDescricao(descricao);
      if (!Medalha) {
        return reply.status(401).send({ error: "Invalid descricao or icon" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const Medalha = await MedalhaUseCase.get(req.params.id);
      if (!Medalha) {
        return reply.status(404).send({ message: "Medalha not found" });
      }
      return reply.send(Medalha);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await MedalhaUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await MedalhaUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/routes/medalhadisponivelnaloja.routes.ts
async function MedalhaDisponivelNaLojaRoutes(fastify2) {
  const MedalhaDisponivelNaLojaUseCase = new MedalhaDisponivelNaLojaUseCase();
  fastify2.post("/", async (req, reply) => {
    const { preco } = req.body;
    try {
      const existingMedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.getByPreco(preco);
      if (existingMedalhaDisponivelNaLoja) {
        return reply.status(400).send({ error: "MedalhaDisponivelNaLoja already exists" });
      }
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.post("/cadastrar", async (req, reply) => {
    try {
      const { preco } = req.body;
      const MedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.getByPreco(preco);
      if (!MedalhaDisponivelNaLoja) {
        return reply.status(401).send({ error: "Invalid preco" });
      }
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.get("/:id", async (req, reply) => {
    try {
      const MedalhaDisponivelNaLoja = await MedalhaDisponivelNaLojaUseCase.get(req.params.id);
      if (!MedalhaDisponivelNaLoja) {
        return reply.status(404).send({ message: "MedalhaDisponivelNaLoja not found" });
      }
      return reply.send(MedalhaDisponivelNaLoja);
    } catch (error) {
      return reply.status(500).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.put("/:id", async (req, reply) => {
    try {
      const updated = await MedalhaDisponivelNaLojaUseCase.update(req.params.id, req.body);
      return reply.send(updated);
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
  fastify2.delete("/:id", async (req, reply) => {
    try {
      await MedalhaDisponivelNaLojaUseCase.delete(req.params.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : error });
    }
  });
}

// src/server.ts
var app = fastify({});
app.register(userRoutes, {
  prefix: "/users"
});
app.register(administradorRoutes, {
  prefix: "/administrador"
});
app.register(JogoRoutes, {
  prefix: "/jogo"
});
app.register(ConteudoEducativoRoutes, {
  prefix: "/conteudoeducativo"
});
app.register(ConteudoImagemRoutes, {
  prefix: "/conteudoimagem"
});
app.register(LojaRoutes, {
  prefix: "/loja"
});
app.register(MedalhaRoutes, {
  prefix: "/medalha"
});
app.register(MedalhaDisponivelNaLojaRoutes, {
  prefix: "/medalhadisponivelnaloja"
});
var port = process.env.PORT ? parseInt(process.env.PORT) : 3333;
app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map