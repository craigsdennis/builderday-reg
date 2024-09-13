export const onRequest: PagesFunction<Env> = async (context) => {
  const response = await context.env.DB.prepare(
    "SELECT count(*) as 'REGISTRATION_COUNT' from registrations;"
  ).run();
  console.log({ results: response.results });
  const html = `<html>
    <head>
      <title>Builder Day</title>
        <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/peter-saulitis-portfolio.webflow.css" rel="stylesheet" type="text/css">

    </head>
    <body>
        <h2>Admin</h2>
        <a href="/admin/download">Download ${response.results[0].REGISTRATION_COUNT} registrations as CSV ⬇️</a>
    </body>

    </html>`;
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
};
