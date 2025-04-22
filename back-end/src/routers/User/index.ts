import Router from "express";
import { userController } from "../../controllers/User";
import authorizarion from "../../middlewares/Authorization";
import { authentication } from "../../middlewares/Authentication";

const userRouter = Router();


/**
 * @swagger
 * /api/v1/users/save:
 *   post:
 *     summary: Cria um novo usuário com permissão de admin
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdminUser'
 *     responses:
 *       201:
 *         description: Usuário admin criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       409:
 *         description: E-mail já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Permissão de admin não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/save", userController.createAdminUser); //removido temporariamente para poder criar adm pela tela do front

export default userRouter;