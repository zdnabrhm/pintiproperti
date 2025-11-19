import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      className="grid gap-16 px-5 py-16 lg:grid-cols-2 lg:px-8"
    >
      <div className="space-y-7">
        <h1 className="font-montserrat text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
          Real Estate Investment in Germany –{" "}
          <span className="text-accent-300">Even Without Kapital</span>
        </h1>
        <p>
          We specialize in helping international professionals working in
          Germany invest in property with structured financing solutions — even
          if you currently have limited equity.
        </p>
        <div className="flex w-full flex-col gap-2 lg:flex-row">
          <Button asChild>
            <a href="/#">Schedule a Free Consultation</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/#">Discover Your Investment Options</a>
          </Button>
        </div>
        <div className="bg-primary-600 h-0.5 w-full"></div>
        <div className="-mt-3 flex gap-6 lg:gap-12">
          <div>
            <p className="text-accent-300 text-2xl lg:text-3xl">2.500+</p>
            <p className="text-sm text-neutral-100">Happy Investors</p>
          </div>
          <div>
            <p className="text-accent-300 text-2xl lg:text-3xl">€250M+</p>
            <p className="text-sm text-neutral-100">Properties Sold</p>
          </div>
          <div>
            <p className="text-accent-300 text-2xl lg:text-3xl">15%</p>
            <p className="text-sm text-neutral-100">Avg. Annual ROI</p>
          </div>
        </div>
      </div>

      <div className="border-accent-300 h-fit rounded-3xl border p-3">
        <video controls className="border-primary-900 rounded-xl border">
          <source src="/videos/pintiproperti-video.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/videos/pintiproperti-video.vtt"
            srcLang="en"
            label="English"
          />
          Your browser doesn&apos;t support video.
        </video>
      </div>
    </section>
  );
}
