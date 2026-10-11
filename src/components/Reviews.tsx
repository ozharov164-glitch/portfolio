import { configuredReviews, site } from '../content/site'
import { ty } from '../lib/typograph'

export function Reviews() {
  const items = configuredReviews()
  if (items.length === 0) return null

  return (
    <section className="reviews" id="reviews">
      <header className="section-head">
        <p className="eyebrow">{site.reviews.eyebrow}</p>
        <h2>{site.reviews.headline}</h2>
      </header>
      <ul className="reviews__grid">
        {items.map((item) => (
          <li key={item.author}>
            <blockquote>
              <p>{ty(item.text)}</p>
              <footer>
                <cite>{ty(item.author)}</cite>
                <span>{ty(item.context)}</span>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  )
}
