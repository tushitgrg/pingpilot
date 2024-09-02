import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

import { CanvasRevealEffectDemo } from "@/components/ui/threeCards";

import { GlobeDemo } from "@/components/hero";
import { HeroScrollDemo } from "@/components/table-scroll";
import { InfiniteMovingCardsDemo } from "@/components/testinomials";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      
      <div className="inline-block max-w-xl text-center justify-center">
      <h1 className={title()}>Stay&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>ahead&nbsp;</h1>
        <br />
        <h1 className={title()}>
        of the curve with real-time web monitoring.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
        track, analyze, and protect your online presence effortlessly.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={'/dashboard'}
        >
          Dashboard
        </Link>
      
      </div>
<GlobeDemo/>
<CanvasRevealEffectDemo/>
<HeroScrollDemo/>
<InfiniteMovingCardsDemo/>

    </section>
  );
}
