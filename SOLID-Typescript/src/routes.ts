import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const router = Router();

router.get("/users", (request, response) => {
  return response.status(201).send({ hello: "wtf" });
});

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

export { router };
