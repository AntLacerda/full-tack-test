import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API de Controle de Acesso",
        version: "1.0.0",
        description: "Documentação da API de Controle de Acesso"
    },
    servers: [
        {
            url: "http://localhost:3001",
            description: "Servidor local"
        }
    ],
    components: {
        schemas: {
          CreateAdminUser: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: {
                type: 'string',
                example: 'João Silva'
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'joao@email.com'
              },
              password: {
                type: 'string',
                example: 'senhaSegura123'
              }
            }
          },
          UserResponse: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'a1b2c3d4'
              },
              name: {
                type: 'string',
                example: 'João Silva'
              },
              email: {
                type: 'string',
                example: 'joao@email.com'
              },
              Permission: {
                type: 'object',
                properties: {
                  role: {
                    type: 'string',
                    example: 'admin'
                  }
                }
              }
            }
          },
          ErrorResponse: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'User already exists!'
              }
            }
          }
        }
      }      
};

const options = {
    swaggerDefinition,
    apis: ["./src/routers/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;