type Registration = {
  full_name: string,
  email: string,
  company?: string,
  country?: string,
}

export const onRequest: PagesFunction<Env> = async (context) => {
    console.log("onRequest starting...", context.request);
    // Validate Payload
    const payload: Registration = await context.request.json();
    console.log("Form submitted", payload);
    // Store in D1
    const results = await context.env.DB.prepare(`INSERT INTO registrations (full_name, email, company, country) VALUES (?, ?, ?, ?);`)
      .bind(payload.full_name, payload.email, payload.company, payload.country)
      .run();

    // TODO: Verify

    const cloudflareTvLink = "https://cloudflare.tv/event/builder-day-live-stream/xvm4qdgm";

    const nativeCalLink = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:https://cloudflare.tv/event/builder-day-live-stream/xvm4qdgm
METHOD:PUBLISH
DTSTART:20240926T180000Z
DTEND:20240926T190000Z
SUMMARY:Builder Day Live Stream
DESCRIPTION:This is and isn't your typical &quot;developer week&quot; stream. Yes, we'll be announcing new products and demo'ing all the things. But there will be no black turtlenecks. Building is fun and we're gonna have some - by interacting with our developer community, giving away some merch, playing a few games, and showing off what our devs are building. Join us!
Follow @CloudflareDev and https://discord.gg/cloudflaredev&nbsp;\n\nWatch at https://cloudflare.tv/event/xvm4qdgm
LOCATION:https://cloudflare.tv/event/xvm4qdgm
END:VEVENT
END:VCALENDAR`;
    const googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20240926T180000Z/20240926T190000Z&amp;location=https%3A%2F%2Fcloudflare.tv%2Fevent%2Fxvm4qdgm&amp;text=Builder%20Day%20Live%20Stream&amp;details=This%20is%20and%20isn't%20your%20typical%20%22developer%20week%22%20stream.%20Yes%2C%20we'll%20be%20announcing%20new%20products%20and%20demo'ing%20all%20the%20things.%20But%20there%20will%20be%20no%20black%20turtlenecks.%20Building%20is%20fun%20and%20we're%20gonna%20have%20some%20-%20by%20interacting%20with%20our%20developer%20community%2C%20giving%20away%20some%20merch%2C%20playing%20a%20few%20games%2C%20and%20showing%20off%20what%20our%20devs%20are%20building.%20Join%20us!%0AFollow%20%40CloudflareDev%20and%20https%3A%2F%2Fdiscord.gg%2Fcloudflaredev%C2%A0%5Cn%5CnWatch%20at%20https%3A%2F%2Fcloudflare.tv%2Fevent%2Fxvm4qdgm`;
    const yahooCalLink = `https://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20&amp;title=Builder%20Day%20Live%20Stream&amp;st=20240926T180000Z&amp;dur=0100&amp;desc=This%20is%20and%20isn't%20your%20typical%20%22developer%20week%22%20stream.%20Yes%2C%20we'll%20be%20announcing%20new%20products%20and%20demo'ing%20all%20the%20things.%20But%20there%20will%20be%20no%20black%20turtlenecks.%20Building%20is%20fun%20and%20we're%20gonna%20have%20some%20-%20by%20interacting%20with%20our%20developer%20community%2C%20giving%20away%20some%20merch%2C%20playing%20a%20few%20games%2C%20and%20showing%20off%20what%20our%20devs%20are%20building.%20Join%20us!%0AFollow%20%40CloudflareDev%20and%20https%3A%2F%2Fdiscord.gg%2Fcloudflaredev%C2%A0%5Cn%5CnWatch%20at%20https%3A%2F%2Fcloudflare.tv%2Fevent%2Fxvm4qdgm&amp;in_loc=https%3A%2F%2Fcloudflare.tv%2Fevent%2Fxvm4qdgm`

    // Return the registration success HTML snippet
    const successHTML = `
        <div class="subhead-2 space-20 black how neurops signup ty">You're in. See you there!</div>
        <div class="body-text black wash">Look out for emails with reminders and info so you can best participate on stream.</div>
        <a href="${cloudflareTvLink}" target="_blank" class="cta-button-white traditional black add w-inline-block">
          <div class="text-cta white">Add to Calendar</div><img src="images/Frame-3.svg" loading="lazy" alt="" class="image-81">
        </a>
        <div class="div-block-327">
          <a href="${googleCalLink}" target="_blank" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Google</div><img src="images/Frame-5.svg" loading="lazy" alt="" class="image-81">
          </a>
          <a href="${nativeCalLink}" target="_blank" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Apple</div><img src="images/Apple_logo_grey.svg" loading="lazy" alt="" class="image-81 apple">
          </a>
          <a href="${yahooCalLink}" target="_blank" class="cta-button-white calendar w-inline-block">
            <div class="text-cta">Yahoo</div><img src="images/yahoo-icon.webp" loading="lazy" alt="" class="image-81 y">
          </a>
        </div>
        <a href="https://discord.com/invite/cloudflaredev" target="_blank" class="link-block-11 secondary discord w-inline-block"><img src="images/Play-video.svg" loading="lazy" alt="" class="play-icon black">
          <div class="text-cta">Join the Discussion</div><img src="images/Frame-4.svg" loading="lazy" alt="" class="image-82">
        </a>
        `
      console.log("Returning", successHTML);
    return Response.json({html: successHTML});
  }