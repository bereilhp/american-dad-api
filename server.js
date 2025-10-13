const fastify = require("fastify")({
  logger: {
    level: "info",
  }
});

const charactersRoutes = require("./routes/characters");
const indexRoutes = require("./routes/index");

fastify.register(charactersRoutes);
fastify.register(indexRoutes);

fastify.listen({ port: 3000 }, () => {
  console.log("Server running at http://localhost:3000");
});
