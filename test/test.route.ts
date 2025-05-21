import type { FastifyPluginCallback } from "fastify"
import { testHandler } from "./test.controller"
import type { Schema1, Schema2, Schema3Overlapping } from "./test.schema"

const testRoutes: FastifyPluginCallback = (
  fastify,
  _options,
  done,
) => {
  fastify.post<{
    Body: Schema1 | Schema2 | Schema3Overlapping
  }>("/test", {
    schema: {
      body: {
        oneOf: [
          { $ref: "schema_1" },
          { $ref: "schema_2" },
          { $ref: "schema_3_overlapping" },
        ]
      }
    },
    handler: testHandler,
  })

  done()
}

export default testRoutes
