import { encode } from "@cfworker/csv";

export const onRequest: PagesFunction<Env> = async (context) => {
    const response = await context.env.DB.prepare(
      "SELECT * from registrations;"
    ).run();
    const stream = encode(response.results);
    return new Response(stream, {
        headers: {
            "Content-Type": "text/csv"
        }
    })
};  