const request = require("supertest");

const app = require("./backend/server");

/**
 * Tests the registration feature of the website
 * Registers testMember with attributes:
 *      name: tester
 *      email: test@test.com
 *      password: test123
 */
describe("Registers test user", (done) => {
  it("should respond with a json 200 response", (done) => {
    const testMember = {
      firstname: "tester",
      lastname: "Mc. Tester",
      email: "test@test.com",
      password: "test123",
      password2: "test123",
      number: "999999999",
    };
    request(app)
      .post("/api/members/register")
      .send(testMember)
      .expect(200, done);
  });
});

/**
 * Returns a JSON object with all registered members
 */
describe("Return list of all registered members", (done) => {
  it("responds with a json object", (done) => {
    request(app)
      .get("/api/members")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

/**
 * Deletes the testMember that we registered earlier
 */
describe("Deletes test user", (done) => {
  it("should respond with a json object", (done) => {
    request(app)
      .post("/api/members")
      .send({ email: "test@test.com" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
