import { site } from '../content/site'

export function ProofBar() {
  return (
    <section className="proof" aria-label="Короткие факты">
      {site.proof.map((item) => (
        <article key={item.kicker} className="proof__item">
          <p className="proof__kicker">{item.kicker}</p>
          <p className="proof__label">{item.label}</p>
        </article>
      ))}
    </section>
  )
}
