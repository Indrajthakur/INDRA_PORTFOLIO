
import { Section } from "../layout-bits";
import { Item } from "../reveal";
import { BrandIcon } from "../brand-icon";
import { Tip } from "../ui/tooltip";
import { brands } from "@/lib/brand";
import { skillsRow1, skillsRow2 } from "@/lib/data";
import { tint } from "@/lib/utils";

type Skill = (typeof skillsRow1)[number];

function Tile({
  s,
  hidden,
}: {
  s: Skill;
  hidden?: boolean;
}) {
  const glow = `${tint(brands[s.brand].hex)}55`;

  return (
    <Tip label={s.name}>
      <button
        type="button"
        tabIndex={hidden ? -1 : 0}
        aria-hidden={hidden || undefined}
        aria-label={s.name}
        style={
          { "--glow": glow } as React.CSSProperties
        }
        className="
          grid size-10 shrink-0
          place-items-center
          rounded-xl
          border border-line
          bg-card
          transition-[border-color,box-shadow]
          duration-150
          hover:border-white/25
          hover:shadow-[0_0_18px_-2px_var(--glow)]
          min-[360px]:size-11
          sm:size-11
        "
      >
        <BrandIcon name={s.brand} size={20} />
      </button>
    </Tip>
  );
}

function Row({ items }: { items: Skill[] }) {
  return (
    <div className="contents sm:flex sm:flex-wrap sm:gap-3">
      {items.map((s) => (
        <Tile key={s.name} s={s} />
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Expertise"
      title="Tech Stack & Tools"
    >
      <Item
        className="
          grid grid-cols-5
          gap-x-2 gap-y-3
          sm:block sm:space-y-3
        "
      >
        <Row items={skillsRow1} />
        <Row items={skillsRow2} />
      </Item>
    </Section>
  );
}
