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
      <div className="mx-auto max-w-6xl">
        <p className="fade-in mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          {kicker}
        </p>
        <h1 className="fade-in stagger-1 font-playfair text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
          {title}
          {accent && (
            <>
              {' '}
              <span className="italic text-orange-600">{accent}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="fade-in stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
