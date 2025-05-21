import Fastify, { type FastifyInstance } from "fastify"

import { exportedSchemas } from "./test/test.schema"
import testRoutes from "./test/test.route"

function main() {
  const server: FastifyInstance = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname"
        }
      }
    }
  })
  const port = 9999
  const name = "Test"

  const schemasList = [...Object.values(exportedSchemas)]

  for (const schema of schemasList) {
    server.addSchema({
      ...schema,
      // hack until https://github.com/colinhacks/zod/issues/4412 is fixed
      $schema: "http://json-schema.org/draft-07/schema#"
    })
  }

  server.register(testRoutes, {
    prefix: "api"
  })

  server.get("/healthcheck", async (request, reply) => {
    return { hello: "world" }
  })

  server.get("/shutdown", async (request, reply) => {
    await server.close()
    reply.send({ message: "Server is shutting down" })
  })

  server.listen({ port: port, host: "0.0.0.0" }, function (err, address) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.info(`Server ${name} is ready at ${address}`)
  })
}

main()
