import { z } from "zod/v4"

const schema_1 = z.object({
  required_property: z.string(),
  test_thing: z.number(),
  nested_thing: z.object({
    nested_property: z.string(),
  }),
}).meta({ $id: "schema_1" })

const schema_2 = z.object({
  name: z.string(),
  email: z.email(),
}).meta({ $id: "schema_2" })

const schema_3_overlapping = z.object({
  name: z.string(),
  email: z.email(),
  extra_prop: z.string().optional(),
}).meta({ $id: "schema_3_overlapping" })

export type Schema1 = z.infer<typeof schema_1>
export type Schema2 = z.infer<typeof schema_2>
export type Schema3Overlapping = z.infer<typeof schema_3_overlapping>

const schemas = [
  schema_1,
  schema_2,
  schema_3_overlapping,
]

export const exportedSchemas = schemas.map((schema) => {
  return z.toJSONSchema(schema, {
    target: "draft-7",
    unrepresentable: "any",
  })
})
