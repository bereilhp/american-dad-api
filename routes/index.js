async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { message: "Welcome to the American Dad API!" };
  });
}

module.exports = routes;
