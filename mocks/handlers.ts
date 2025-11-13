import { randomBytes } from "node:crypto";
import { http } from "msw";
import realWorldApp from "realworld-hono-drizzle";

const bindings = {
  DATABASE_URL: "file:local.db",
  JWT_SECRET: randomBytes(64).toString("base64url"),
};

// This used to be the URL for the realworld.io API, but now it's down. We will mock requests to this URL.
export const mockBackendUrl = "https://api.realworld.io/api";

export const handlers = [
  http.all(`${mockBackendUrl}/*`, ({ request }) => {
    return realWorldApp.fetch(request, bindings);
  }),
];
