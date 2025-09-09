"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));

// src/database/prisma-client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
async function userRoutes(fastify2) {
  const userUseCase = new UserUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, email, password, totalpoints, paypoints, doneQuiz } = req.body;
    try {
      const existingUser = await userUseCase.getByEmail(email);
      if (existingUser) {
        return reply.status(400).send({ error: "User already exists" });
      }
      const hashedPassword = await import_bcrypt.default.hash(password, 10);
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
      const passwordMatch = await import_bcrypt.default.compare(password, user.password);
      if (!passwordMatch) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const token = import_jsonwebtoken.default.sign(
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
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
async function administradorRoutes(fastify2) {
  const administradorUseCase = new AdministradorUseCase();
  fastify2.post("/", async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const existingAdministrador = await administradorUseCase.getByEmail(email);
      if (existingAdministrador) {
        return reply.status(400).send({ error: "Administrador already exists" });
      }
      const hashedPassword = await import_bcrypt2.default.hash(password, 10);
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
      const passwordMatch = await import_bcrypt2.default.compare(password, administrador.password);
      if (!passwordMatch) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
      const token = import_jsonwebtoken2.default.sign(
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

// src/repositories/jogo.repository.ts
var JogoRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.Jogo.create({
      data: {
        name: data.name,
        descricao: data.descricao,
        points: data.points
      }
    });
    return this.mapToInterface(created);
  }
  async findByName(Name) {
    const jogo = await prisma.jogo.findUnique({ where: { Name } });
    return jogo ? this.mapToInterface(jogo) : null;
  }
  async get(id) {
    const Jogo = await prisma.jogo.findUnique({ where: { id } });
    return Jogo ? this.mapToInterface(Jogo) : null;
  }
  async update(id, data) {
    const updated = await prisma.Jogo.update({
      where: { id },
      data: {
        name: data.name,
        descricao: data.descricao,
        points: data.points
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.Jogo.delete({ where: { id } });
  }
  mapToInterface(prismaJogo) {
    return {
      id: prismaJogo.id,
      name: prismaJogo.name,
      descricao: prismaJogo.descricao,
      points: prismaJogo.points,
      createdAt: prismaJogo.createdAt.toISOString(),
      updatedAt: prismaJogo.updatedAt.toISOString()
    };
  }
};

// src/usecases/jogo.usecase.ts
var JogoUseCase = class {
  constructor() {
    this.JogoRepository = new JogoRepositoryPrisma();
  }
  async create({ descricao, name, points }) {
    const exists = await this.JogoRepository.findByName(name);
    if (exists) throw new Error("Jogo already exists");
    return await this.JogoRepository.create({
      descricao,
      name,
      points
    });
  }
  async get(id) {
    return await this.JogoRepository.get(id);
  }
  async getByName(name) {
    return await this.JogoRepository.findByName(name);
  }
  async update(id, data) {
    const Jogo = await this.JogoRepository.get(id);
    if (!Jogo) throw new Error("Jogo not found");
    return await this.JogoRepository.update(id, data);
  }
  async delete(id) {
    const Jogo = await this.JogoRepository.get(id);
    if (!Jogo) throw new Error("Jogo not found");
    await this.JogoRepository.delete(id);
  }
};

// src/routes/jogo.routes.ts
async function JogoRoutes(fastify2) {
  const jogo = new JogoUseCase();
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

// src/repositories/conteudoeducativo.repository.ts
var ConteudoEducativoRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.ConteudoEducativo.create({
      data: {
        name: data.name,
        titulo: data.titulo,
        texto: data.texto
      }
    });
    return this.mapToInterface(created);
  }
  async findByTitulo(Titulo) {
    const conteudoeducativo = await prisma.conteudoeducativo.findUnique({ where: { Titulo } });
    return conteudoeducativo ? this.mapToInterface(conteudoeducativo) : null;
  }
  async get(id) {
    const ConteudoEducativo = await prisma.conteudoeducativo.findUnique({ where: { id } });
    return ConteudoEducativo ? this.mapToInterface(ConteudoEducativo) : null;
  }
  async update(id, data) {
    const updated = await prisma.ConteudoEducativo.update({
      where: { id },
      data: {
        name: data.name,
        titulo: data.titulo,
        texto: data.texto
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.ConteudoEducativo.delete({ where: { id } });
  }
  mapToInterface(prismaConteudoEducativo) {
    return {
      id: prismaConteudoEducativo.id,
      name: prismaConteudoEducativo.name,
      titulo: prismaConteudoEducativo.titulo,
      texto: prismaConteudoEducativo.texto,
      createdAt: prismaConteudoEducativo.createdAt.toISOString(),
      updatedAt: prismaConteudoEducativo.updatedAt.toISOString()
    };
  }
};

// src/usecases/conteudoeducativo.usecase.ts
var ConteudoEducativoUseCase = class {
  constructor() {
    this.ConteudoEducativoRepository = new ConteudoEducativoRepositoryPrisma();
  }
  async create({ titulo, name, texto }) {
    const exists = await this.ConteudoEducativoRepository.findByTitulo(titulo);
    if (exists) throw new Error("ConteudoEducativo already exists");
    return await this.ConteudoEducativoRepository.create({
      titulo,
      name,
      texto
    });
  }
  async get(id) {
    return await this.ConteudoEducativoRepository.get(id);
  }
  async getBytitulo(titulo) {
    return await this.ConteudoEducativoRepository.findByTitulo(titulo);
  }
  async update(id, data) {
    const ConteudoEducativo = await this.ConteudoEducativoRepository.get(id);
    if (!ConteudoEducativo) throw new Error("ConteudoEducativo not found");
    return await this.ConteudoEducativoRepository.update(id, data);
  }
  async delete(id) {
    const ConteudoEducativo = await this.ConteudoEducativoRepository.get(id);
    if (!ConteudoEducativo) throw new Error("ConteudoEducativo not found");
    await this.ConteudoEducativoRepository.delete(id);
  }
};

// src/routes/conteudoeducativo.routes.ts
async function ConteudoEducativoRoutes(fastify2) {
  const conteudoeducativo = new ConteudoEducativoUseCase();
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

// src/repositories/conteudoimagem.repository.ts
var ConteudoImagemRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.ConteudoImagem.create({
      data: {
        url: data.url
      }
    });
    return this.mapToInterface(created);
  }
  async findByUrl(Id) {
    const conteudoimagem = await prisma.conteudoimagem.findUnique({ where: { Url } });
    return conteudoimagem ? this.mapToInterface(conteudoimagem) : null;
  }
  async get(id) {
    const ConteudoImagem = await prisma.conteudoimagem.findUnique({ where: { id } });
    return ConteudoImagem ? this.mapToInterface(ConteudoImagem) : null;
  }
  async update(id, data) {
    const updated = await prisma.ConteudoImagem.update({
      where: { id },
      data: {
        url: data.url
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.ConteudoImagem.delete({ where: { id } });
  }
  mapToInterface(prismaConteudoImagem) {
    return {
      id: prismaConteudoImagem.id,
      url: prismaConteudoImagem.url,
      createdAt: prismaConteudoImagem.createdAt.toISOString(),
      updatedAt: prismaConteudoImagem.updatedAt.toISOString()
    };
  }
};

// src/usecases/conteudoimagem.usecase.ts
var ConteudoImagemUseCase = class {
  constructor() {
    this.ConteudoImagemRepository = new ConteudoImagemRepositoryPrisma();
  }
  async create({ url: url2 }) {
    const exists = await this.ConteudoImagemRepository.findByUrl(url2);
    if (exists) throw new Error("ConteudoImagem already exists");
    return await this.ConteudoImagemRepository.create({
      url: url2
    });
  }
  async get(id) {
    return await this.ConteudoImagemRepository.get(id);
  }
  async getBytitulo(titulo) {
    return await this.ConteudoImagemRepository.findByUrl(url);
  }
  async update(id, data) {
    const ConteudoImagem = await this.ConteudoImagemRepository.get(id);
    if (!ConteudoImagem) throw new Error("ConteudoImagem not found");
    return await this.ConteudoImagemRepository.update(id, data);
  }
  async delete(id) {
    const ConteudoImagem = await this.ConteudoImagemRepository.get(id);
    if (!ConteudoImagem) throw new Error("ConteudoImagem not found");
    await this.ConteudoImagemRepository.delete(id);
  }
};

// src/routes/conteudoimagem.routes.ts
async function ConteudoImagemRoutes(fastify2) {
  const conteudoimagem = new ConteudoImagemUseCase();
  fastify2.post("/", async (req, reply) => {
    const { url: url2 } = req.body;
    try {
      const existingConteudoImagem = await ConteudoImagemUseCase.getByUrl(url2);
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

// src/repositories/loja.repository.ts
var LojaRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.Loja.create({
      data: {
        name: data.name
      }
    });
    return this.mapToInterface(created);
  }
  async findByName(Name) {
    const loja = await prisma.loja.findUnique({ where: { Name } });
    return loja ? this.mapToInterface(loja) : null;
  }
  async get(id) {
    const Loja = await prisma.loja.findUnique({ where: { id } });
    return Loja ? this.mapToInterface(Loja) : null;
  }
  async update(id, data) {
    const updated = await prisma.Loja.update({
      where: { id },
      data: {
        name: data.name
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.Loja.delete({ where: { id } });
  }
  mapToInterface(prismaLoja) {
    return {
      id: prismaLoja.id,
      name: prismaLoja.name,
      createdAt: prismaLoja.createdAt.toISOString(),
      updatedAt: prismaLoja.updatedAt.toISOString()
    };
  }
};

// src/usecases/loja.usecase.ts
var LojaUseCase = class {
  constructor() {
    this.LojaRepository = new LojaRepositoryPrisma();
  }
  async create({ name }) {
    const exists = await this.LojaRepository.findByName(name);
    if (exists) throw new Error("Loja already exists");
    return await this.LojaRepository.create({
      name
    });
  }
  async get(id) {
    return await this.LojaRepository.get(id);
  }
  async getByName(name) {
    return await this.LojaRepository.findByName(name);
  }
  async update(id, data) {
    const Loja = await this.LojaRepository.get(id);
    if (!Loja) throw new Error("Loja not found");
    return await this.LojaRepository.update(id, data);
  }
  async delete(id) {
    const Loja = await this.LojaRepository.get(id);
    if (!Loja) throw new Error("Loja not found");
    await this.LojaRepository.delete(id);
  }
};

// src/routes/loja.routes.ts
async function LojaRoutes(fastify2) {
  const loja = new LojaUseCase();
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

// src/repositories/medalha.repository.ts
var MedalhaRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.Medalha.create({
      data: {
        name: data.name,
        descricao: data.descricao,
        icon: data.icon
      }
    });
    return this.mapToInterface(created);
  }
  async findByDescricao(Descricao) {
    const medalha = await prisma.medalha.findUnique({ where: { Descricao } });
    return medalha ? this.mapToInterface(medalha) : null;
  }
  async get(id) {
    const Medalha = await prisma.medalha.findUnique({ where: { id } });
    return Medalha ? this.mapToInterface(Medalha) : null;
  }
  async update(id, data) {
    const updated = await prisma.Medalha.update({
      where: { id },
      data: {
        name: data.name,
        descricao: data.descricao,
        icon: data.icon
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.Medalha.delete({ where: { id } });
  }
  mapToInterface(prismaMedalha) {
    return {
      id: prismaMedalha.id,
      name: prismaMedalha.name,
      descricao: prismaMedalha.descricao,
      icon: prismaMedalha.icon,
      createdAt: prismaMedalha.createdAt.toISOString(),
      updatedAt: prismaMedalha.updatedAt.toISOString()
    };
  }
};

// src/usecases/medalha.usecase.ts
var MedalhaUseCase = class {
  constructor() {
    this.MedalhaRepository = new MedalhaRepositoryPrisma();
  }
  async create({ descricao, name, icon }) {
    const exists = await this.MedalhaRepository.findByDescricao(descricao);
    if (exists) throw new Error("Medalha already exists");
    return await this.MedalhaRepository.create({
      descricao,
      name,
      icon
    });
  }
  async get(id) {
    return await this.MedalhaRepository.get(id);
  }
  async getBydescricao(descricao) {
    return await this.MedalhaRepository.findByDescricao(descricao);
  }
  async update(id, data) {
    const Medalha = await this.MedalhaRepository.get(id);
    if (!Medalha) throw new Error("Medalha not found");
    return await this.MedalhaRepository.update(id, data);
  }
  async delete(id) {
    const Medalha = await this.MedalhaRepository.get(id);
    if (!Medalha) throw new Error("Medalha not found");
    await this.MedalhaRepository.delete(id);
  }
};

// src/routes/medalha.routes.ts
async function MedalhaRoutes(fastify2) {
  const medalha = new MedalhaUseCase();
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

// src/repositories/medalhadisponivelnaloja.repository.ts
var MedalhaDisponivelNaLojaRepositoryPrisma = class {
  async create(data) {
    const created = await prisma.MedalhaDisponivelNaLoja.create({
      data: {
        preco: data.preco
      }
    });
    return this.mapToInterface(created);
  }
  async findByName(Name) {
    const medalhadisponivelnaloja = await prisma.medalhadisponivelnaloja.findUnique({ where: { Name } });
    return medalhadisponivelnaloja ? this.mapToInterface(medalhadisponivelnaloja) : null;
  }
  async get(id) {
    const MedalhaDisponivelNaLoja = await prisma.medalhadisponivelnaloja.findUnique({ where: { id } });
    return MedalhaDisponivelNaLoja ? this.mapToInterface(MedalhaDisponivelNaLoja) : null;
  }
  async update(id, data) {
    const updated = await prisma.MedalhaDisponivelNaLoja.update({
      where: { id },
      data: {
        preco: data.preco
      }
    });
    return this.mapToInterface(updated);
  }
  async delete(id) {
    await prisma.MedalhaDisponivelNaLoja.delete({ where: { id } });
  }
  mapToInterface(prismaMedalhaDisponivelNaLoja) {
    return {
      id: prismaMedalhaDisponivelNaLoja.id,
      preco: prismaMedalhaDisponivelNaLoja.preco,
      createdAt: prismaMedalhaDisponivelNaLoja.createdAt.toISOString(),
      updatedAt: prismaMedalhaDisponivelNaLoja.updatedAt.toISOString()
    };
  }
};

// src/usecases/medalhadisponivelnaloja.usecase.ts
var MedalhaDisponivelNaLojaUseCase = class {
  constructor() {
    this.MedalhaDisponivelNaLojaRepository = new MedalhaDisponivelNaLojaRepositoryPrisma();
  }
  async create({ preco }) {
    const exists = await this.MedalhaDisponivelNaLojaRepository.findByPreco(preco);
    if (exists) throw new Error("MedalhaDisponivelNaLoja already exists");
    return await this.MedalhaDisponivelNaLojaRepository.create({
      preco
    });
  }
  async get(id) {
    return await this.MedalhaDisponivelNaLojaRepository.get(id);
  }
  async getByPreco(preco) {
    return await this.MedalhaDisponivelNaLojaRepository.findByPreco(preco);
  }
  async update(id, data) {
    const MedalhaDisponivelNaLoja = await this.MedalhaDisponivelNaLojaRepository.get(id);
    if (!MedalhaDisponivelNaLoja) throw new Error("MedalhaDisponivelNaLoja not found");
    return await this.MedalhaDisponivelNaLojaRepository.update(id, data);
  }
  async delete(id) {
    const MedalhaDisponivelNaLoja = await this.MedalhaDisponivelNaLojaRepository.get(id);
    if (!MedalhaDisponivelNaLoja) throw new Error("MedalhaDisponivelNaLoja not found");
    await this.MedalhaDisponivelNaLojaRepository.delete(id);
  }
};

// src/routes/medalhadisponivelnaloja.routes.ts
async function MedalhaDisponivelNaLojaRoutes(fastify2) {
  const medalhadisponivelnaloja = new MedalhaDisponivelNaLojaUseCase();
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
var import_cors = __toESM(require("@fastify/cors"));
var app = (0, import_fastify.default)({});
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
var PORT = process.env.PORT || 3e3;
app.register(import_cors.default, {
  origin: "*"
});
app.listen({
  port: Number(process.env.PORT) || 3e3,
  host: "0.0.0.0"
}, () => {
  console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map