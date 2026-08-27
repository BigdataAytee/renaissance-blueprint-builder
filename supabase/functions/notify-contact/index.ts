// Entry point for the notify-contact edge function.
//
// Deno.serve is the runtime's own server, so this pulls in no third-party
// module at deploy time. The request handling lives in handler.ts so the tests
// can exercise it directly.
import { handleRequest } from "./handler.ts";

Deno.serve(handleRequest);
