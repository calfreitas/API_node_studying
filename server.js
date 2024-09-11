import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

/*
    Criar API de Usuários
    - criar um usuario
    - listar
    - editar
    - deletar 
*/

app.get("/users", async (req, res) => {
  //res.send('Ok, recebeu')
  //console.log(req)
  let users = [];

  if (req.query) {  
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});

app.post("/users", async (req, res) => {
  //console.log(req.body)
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  //res.send('Ok Post -- confirmar')
  //users.push(req.body)
  res.status(200).json(req.body);
});

app.put("/users/:id", async (req, res) => {
  // console.log(req)

  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  //res.send('Ok Post -- confirmar')
  //users.push(req.body)
  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).json({ message: " Usuário deletado com sucesso. " });
});

app.listen(3000);

//app.put('/users')
//app.delete('/users')

/* 
1) Tipo de rota / metodo http
2) Endereço
*/
