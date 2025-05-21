import { ofetch } from "ofetch"

const PORT = 9999
const BASE_URL = `http://localhost:${PORT}`
const TEST_URL = `${BASE_URL}/api/test`

async function main() {
  // wait for the server to start
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      ofetch(`${BASE_URL}/healthcheck`).then(() => {
        clearInterval(interval)
        resolve(null)
      }).catch(() => {})
    }, 1000)
  })

  // Test Schema1
  const schema1Payload = {
    required_property: "test",
    test_thing: 123,
    nested_thing: {
      nested_property: "nested",
    },
  }
  try {
    const schema1Response = await ofetch(TEST_URL, {
      method: "POST",
      body: schema1Payload,
    })
    console.log("Schema1 Response :", schema1Response)
  } catch (error) {
    console.error("Schema1 Error :", error)
  }
  console.log("")

  // Test Schema2
  const schema2Payload = {
    name: "John Doe",
    email: "test@mail.com",
  }

  try {
    const schema2Response = await ofetch(TEST_URL, {
      method: "POST",
      body: schema2Payload,
    })
    console.log("Schema2 Response :", schema2Response)
  } catch (error) {
    console.error("Schema2 Error :", error)
  }
  console.log("")

  // Test Schema3Overlapping
  const schema3Payload = {
    name: "Jane Doe",
    email: "jane@mail.com",
    extra_prop: "extra",
  }

  try {
    const schema3Response = await ofetch(TEST_URL, {
      method: "POST",
      body: schema3Payload,
    })
    console.log("Schema3 Response :", schema3Response)
    console.log("")
  } catch (error) {
    console.error("Schema3 Error :", error)
  }

  ofetch(`${BASE_URL}/shutdown`)
  process.exit(0)
}

main().catch((error) => {
  console.error("Error :", error)
  process.exit(1)
})
