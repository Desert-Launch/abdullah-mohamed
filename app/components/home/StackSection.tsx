import type { Dictionary, Lang } from "../../data/types";
import { asset } from "../../lib/asset";
import { workPath } from "../../lib/work";
import { StackMap } from "./StackMap";
import { SectionLabel } from "./parts";

/** "Across the stack": the products × layers map, then the capabilities it
 *  adds up to. */
export function StackSection({ t, lang, n }: { t: Dictionary; lang: Lang; n: string }) {
  const stack = t.home.stack;
  const hrefs = Object.fromEntries(
    stack.products
      .filter((product) => product.slug)
      .map((product) => [product.slug, asset(workPath(product.slug!, lang))]),
  );

  return (
    <section id="stack" className="home-section home-wrap" aria-labelledby="stack-title">
      <SectionLabel n={n}>{stack.heading.eyebrow}</SectionLabel>
      <div className="home-head">
        <h2 id="stack-title">{stack.heading.title}</h2>
        {stack.heading.body ? <p>{stack.heading.body}</p> : null}
      </div>

      <StackMap stack={stack} readCase={t.work.readCase} hrefs={hrefs} />

      <div className="capabilities" data-reveal="">
        <p className="home-kicker">{stack.capabilitiesLabel}</p>
        <ul data-stagger="">
          {stack.capabilities.map((capability, index) => (
            <li key={capability.name}>
              <h3>
                <span className="capabilities-n" aria-hidden="true">
                  L{index + 1}
                </span>
                {capability.name}
              </h3>
              <p>{capability.body}</p>
              <p className="capabilities-tech">{capability.tech}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

