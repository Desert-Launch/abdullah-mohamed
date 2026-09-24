// asset() (app/lib/asset.ts) reads process.env.NEXT_PUBLIC_BASE_PATH, which
// Next inlines at build time. Outside Next there is no `process`, and the
// images live in public/, which the design-sync upload doesn't carry — so
// point the base path at the production host, where every /images/* file is
// served with `Access-Control-Allow-Origin: *`. Must be the entry's FIRST
// import: asset.ts reads the value once, at module init.
const g = globalThis as { process?: { env?: Record<string, string | undefined> } };
g.process ??= {};
g.process.env ??= {};
g.process.env.NEXT_PUBLIC_BASE_PATH ??= "https://www.abdullahmohamed.dev";

export {};
