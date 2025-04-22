import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Controle de Acesso",
    version: "1.0.0",
    description: "Documentação da API de Controle de Acesso",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Servidor local",
    },
  ],
  components: {
    schemas: {
      CreateAdminUser: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "João Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            example: "senhaSegura123",
          },
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "a1b2c3d4",
          },
          name: {
            type: "string",
            example: "João Silva",
          },
          email: {
            type: "string",
            example: "joao@email.com",
          },
          Permission: {
            type: "object",
            properties: {
              role: {
                type: "string",
                example: "admin",
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "User already exists!",
          },
        },
      },
      UserSignup: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "João da Silva",
          },
          email: {
            type: "string",
            format: "email",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "minhaSenhaSegura123",
          },
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "minhaSenhaSegura123",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            example: "clvx7hly70001we5y9m0n5e5q",
          },
          token: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routers/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;