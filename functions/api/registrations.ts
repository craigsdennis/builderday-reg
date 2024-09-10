type Registration = {
  full_name: string,
  email: string,
  company?: string,
  country?: string,
}

export const onRequest: PagesFunction<Env> = async (context) => {
    // Validate Payload
    const payload: Registration = await context.request.json();
    console.log("Form submitted", payload);
    // Store in D1
    const results = await context.env.DB.prepare(`INSERT (full_name, email, company, country) VALUES (?, ?, ?, ?)`)
      .bind(payload.full_name, payload.email, payload.company, payload.country);

    // TODO: Verify

    // Return the registration success HTML snippet
    const successHTML = `<div id="w-node-_7359cbf4-b772-4df1-c9d9-410a96581110-46e7247d" class="event-info invert left heft">
        <div class="subhead-2 space-20 black how neurops signup ty">You're in. See you there!</div>
        <div class="body-text black wash">Look out for emails with reminders and info so you can best participate on stream.</div>
        <a href="#" class="cta-button-white traditional black add w-inline-block">
          <div class="text-cta white">Add to Calendar</div><img src="images/Frame-3.svg" loading="lazy" alt="" class="image-81">
        </a>
        <div class="div-block-327">
          <a href="#" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Google</div><img src="images/Frame-5.svg" loading="lazy" alt="" class="image-81">
          </a>
          <a href="#" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Apple</div><img src="images/Apple_logo_grey.svg" loading="lazy" alt="" class="image-81 apple">
          </a>
          <a href="#" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Yahoo</div><img src="images/yahoo-icon.webp" loading="lazy" alt="" class="image-81 y">
          </a>
        </div>
        <a href="https://discord.com/invite/cloudflaredev" target="_blank" class="link-block-11 secondary discord w-inline-block"><img src="images/Play-video.svg" loading="lazy" alt="" class="play-icon black">
          <div class="text-cta">Join the Discussion</div><img src="images/Frame-4.svg" loading="lazy" alt="" class="image-82">
        </a>
      </div>
        `
      console.log("Returning", successHTML);
    return Response.json({html: successHTML});
  }