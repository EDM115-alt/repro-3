import type { FastifyRequest, FastifyReply } from "fastify"
import type { Schema1, Schema2, Schema3Overlapping } from "./test.schema"

export function testHandler(
  request: FastifyRequest<{
    Body: Schema1 | Schema2 | Schema3Overlapping
  }>,
  reply: FastifyReply
) {
  const { body } = request

  // Check the type of the body
  if ("required_property" in body) {
    // Handle Schema1
    console.log("Schema1 :", body)
  } else if ("name" in body && "email" in body) {
    // Handle Schema2 or Schema3Overlapping
    console.log("Schema2 or Schema3Overlapping :", body)
  }

  reply.send({ message: "Request processed successfully" })
}

