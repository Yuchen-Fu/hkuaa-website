import Image from "next/image";
import Link from "next/link";
import HomeEntryReveal from "@/components/HomeEntryReveal";
import HomeFullPageScroll from "@/components/HomeFullPageScroll";
import HomeSlideNavigation from "@/components/HomeSlideNavigation";
import { listCurrentAndUpcomingEvents, listNewsWithExternal } from "@/lib/server/services";

export const dynamic = "force-dynamic";

export default async function Home() {
  const publishedEvents = await listCurrentAndUpcomingEvents("published");
  const publishedNews = await listNewsWithExternal("published", 12);
  const events = publishedEvents.slice(0, 3);
  const news = publishedNews.slice(0, 3);

  return (
    <HomeEntryReveal>
      <HomeFullPageScroll>
      <section
        id="home-slide-welcome"
        className="harvard-cover-wrap home-snap-section home-snap-hero home-snap-slide-lock"
      >
        <div className="container-max">
          <div className="harvard-cover-grid">
            <div className="harvard-cover-copy">
              <p className="harvard-cover-kicker">Welcome to HKUAA</p>
              <h1>A place to reconnect, learn, and belong.</h1>
              <p>
                We are a remarkable network of friendly and engaged alumni sharing a passion and commitment to HKU.
              </p>
              <div className="harvard-cover-actions">
                <Link href="/news" className="btn-brand btn-red">
                  Discover Stories
                </Link>
                <Link href="/events" className="btn-brand btn-red">
                  Explore Events
                </Link>
              </div>
            </div>
            <div className="harvard-cover-image">
              <Image src="/assets/banner_design.avif" alt="HKUAA featured cover" width={1280} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="home-slide-event"
        className="home-event-spotlight home-snap-section home-snap-event home-snap-slide-lock"
        style={{
          ["--event-bg" as string]:
            "url('https://www.alumni.hku.hk/wp/wp-content/uploads/2025/07/DSCF1847_s.jpg')",
        }}
      >
        <div className="container-max">
          <div className="home-event-spotlight-inner">
            <div className="home-event-spotlight-copy">
              <p className="home-event-spotlight-kicker">Event</p>
              <h2>[July 12] HKUAA New Graduates Welcome Party and HKU Alumni Prize Presentation 2025</h2>
              <p>
                A memorable celebration bringing together recent graduates, alumni, and distinguished guests to recognize
                outstanding students and welcome the new generation into the HKUAA community.
              </p>
              <a
                href="https://www.alumni.hku.hk/july-12-hkuaa-new-graduates-welcome-party-and-hku-alumni-prize-presentation-2025/"
                target="_blank"
                rel="noreferrer"
                className="btn-brand home-event-spotlight-btn"
              >
                Event Information
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="home-slide-youtube"
        className="home-youtube-section home-snap-section home-snap-youtube home-snap-slide-lock"
        aria-label="HKUAA on YouTube"
      >
        <div className="home-youtube-stage">
          <div className="home-youtube-embed">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PL3pC2pG2N1BRFYP3wH59_KY1TX_bl3UGC"
              title="HKUAA YouTube playlist"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="home-slide-rest" className="home-snap-section home-snap-tail" aria-label="Stories and programs">
        <div className="home-snap-tail-scroll">
          <div className="home-tail-detail section-template">
            <div className="container-max harvard-two-col">
              <div>
                <h2 className="harvard-col-title">Stories</h2>
                <div className="harvard-story-list">
                  {news.map((item) => (
                    <article key={item.id} className="harvard-story-item">
                      {item.sourceUrl ? (
                        <h3>
                          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="template-link">
                            {item.title}
                          </a>
                        </h3>
                      ) : (
                        <h3>{item.title}</h3>
                      )}
                      <p>{item.summary}</p>
                    </article>
                  ))}
                  {news.length === 0 ? <p className="text-sm text-[#6f788f]">No stories at the moment.</p> : null}
                </div>
                <Link href="/news" className="btn-outline-portal">
                  View All Stories
                </Link>
              </div>
              <div>
                <h2 className="harvard-col-title">Programs & Events</h2>
                <div className="harvard-event-list">
                  {events.map((event) => (
                    <article key={event.id} className="harvard-event-item">
                      <div className="harvard-event-date">
                        <span>{new Date(event.eventDate).toLocaleString("en-US", { month: "short" })}</span>
                        <strong>{new Date(event.eventDate).getDate()}</strong>
                      </div>
                      <div>
                        <h3>{event.title}</h3>
                        <p>{event.summary}</p>
                      </div>
                    </article>
                  ))}
                  {events.length === 0 ? <p className="text-sm text-[#6f788f]">No events at the moment.</p> : null}
                </div>
                <Link href="/events" className="btn-outline-portal">
                  View All Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSlideNavigation />
      </HomeFullPageScroll>
    </HomeEntryReveal>
  );
}
