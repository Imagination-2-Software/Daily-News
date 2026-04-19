export function PageHeader({
  kicker,
  title,
  accent,
  subtitle,
}: {
  kicker: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-6 pt-12 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <p className="fade-in label-overline">
          {kicker}
        </p>
        <h1 className="fade-in stagger-1 mt-5 max-w-4xl text-[2.25rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-on-bg md:text-[4rem]">
          {title}
          {accent && (
            <>
              {' '}
              <span className="italic-accent">{accent}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="fade-in stagger-2 mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
