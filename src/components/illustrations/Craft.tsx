import { ty } from '../../lib/typograph'

export function BotChat() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="36" y="28" width="150" height="36" rx="12" fill="var(--surface-3)" />
      <text x="48" y="51" fill="var(--text)" fontSize="13" fontFamily="Onest, sans-serif">
        {ty('Привет! Выберите действие')}
      </text>
      <rect x="118" y="72" width="126" height="28" rx="12" fill="rgb(42 171 238 / 0.2)" />
      <text x="154" y="91" fill="var(--text)" fontSize="13" fontFamily="Onest, sans-serif">
        /start
      </text>
      <rect x="36" y="110" width="72" height="28" rx="10" fill="none" stroke="var(--tg)" strokeWidth="1.5" />
      <text x="48" y="129" fill="var(--tg)" fontSize="12" fontFamily="Onest, sans-serif">
        {ty('Каталог')}
      </text>
      <rect x="116" y="110" width="86" height="28" rx="10" fill="none" stroke="var(--tg)" strokeWidth="1.5" />
      <text x="128" y="129" fill="var(--tg)" fontSize="12" fontFamily="Onest, sans-serif">
        {ty('Связаться')}
      </text>
      <g className="craft-extra">
        <rect x="36" y="78" width="70" height="24" rx="10" fill="var(--surface-4)" />
        <circle cx="54" cy="90" r="2.5" fill="var(--muted)" />
        <circle cx="66" cy="90" r="2.5" fill="var(--muted)" />
        <circle cx="78" cy="90" r="2.5" fill="var(--muted)" />
      </g>
    </svg>
  )
}

export function MiniAppShot() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="96" y="8" width="88" height="144" rx="16" fill="var(--surface-3)" stroke="var(--hairline-strong)" />
      <rect x="104" y="18" width="72" height="18" rx="8" fill="var(--surface-1)" />
      <path
        transform="translate(108 20) scale(0.58)"
        fill="var(--tg)"
        d="M21.68 3.14 2.55 10.52c-1.28.5-1.27 1.21.02 1.52l4.86 1.51 11.08-6.94c.52-.32.83-.15.5.2l-8.97 8.05-.34 5.16c.49 0 .71-.22.98-.5l2.35-2.27 4.88 3.6c.89.52 1.59.24 1.82-.86L22.86 4.05c.3-1.26-.48-1.82-1.18-1.4Z"
      />
      <rect x="108" y="44" width="28" height="28" rx="8" fill="var(--surface-4)" />
      <rect x="144" y="44" width="28" height="28" rx="8" fill="var(--surface-4)" />
      <rect x="108" y="78" width="28" height="28" rx="8" fill="var(--surface-4)" />
      <rect x="144" y="78" width="28" height="28" rx="8" fill="var(--surface-4)" />
      <g className="craft-press">
        <rect x="108" y="116" width="64" height="22" rx="8" fill="#2AABEE" />
        <text x="122" y="131" fill="#fff" fontSize="11" fontFamily="Onest, sans-serif">
          {ty('Открыть')}
        </text>
      </g>
    </svg>
  )
}

export function SiteWindow() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="24" y="16" width="232" height="128" rx="14" fill="var(--surface-3)" stroke="var(--hairline-strong)" />
      <rect x="40" y="28" width="120" height="16" rx="8" fill="var(--surface-1)" />
      <rect x="46" y="32" width="8" height="8" rx="2" fill="none" stroke="var(--muted)" />
      <text x="40" y="72" fill="var(--text)" fontSize="20" fontFamily="Unbounded, sans-serif">
        {ty('Заголовок')}
      </text>
      <rect className="craft-btn" x="40" y="84" width="64" height="18" rx="8" fill="#2AABEE" />
      <rect x="40" y="112" width="60" height="20" rx="8" fill="var(--surface-4)" />
      <rect x="110" y="112" width="60" height="20" rx="8" fill="var(--surface-4)" />
      <rect x="180" y="112" width="60" height="20" rx="8" fill="var(--surface-4)" />
      <path className="craft-cursor" d="M168 96l8 18-5-1-4 7-3-2 4-7-6 1z" fill="var(--text)" />
    </svg>
  )
}

export function PakoDesk() {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <rect x="16" y="28" width="40" height="40" rx="12" fill="var(--surface-4)" opacity="0.55" />
      <rect x="64" y="28" width="40" height="40" rx="12" fill="var(--surface-3)" />
      <text x="74" y="54" fill="var(--tg)" fontSize="16" fontFamily="Unbounded, sans-serif">
        П
      </text>
      <rect x="112" y="28" width="40" height="40" rx="12" fill="var(--surface-4)" opacity="0.55" />
      <rect x="160" y="28" width="24" height="24" rx="8" fill="var(--surface-4)" opacity="0.4" />
      <rect x="64" y="78" width="92" height="22" rx="8" fill="rgb(53 226 161 / 0.16)" />
      <text x="86" y="93" fill="var(--signal)" fontSize="11" fontFamily="Onest, sans-serif">
        {ty('Установлено')}
      </text>
    </svg>
  )
}

export function PakoMenu() {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <rect x="28" y="48" width="144" height="36" rx="10" fill="var(--surface-3)" />
      <text x="42" y="71" fill="var(--text)" fontSize="14" fontFamily="Onest, sans-serif">
        {ty('59 блюд')}
      </text>
      <rect x="28" y="96" width="144" height="36" rx="10" fill="var(--surface-3)" />
      <text x="42" y="119" fill="var(--text)" fontSize="14" fontFamily="Onest, sans-serif">
        {ty('44 напитка')}
      </text>
    </svg>
  )
}

export function FlashStack({ flipped }: { flipped: boolean }) {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <g transform="translate(18 28) rotate(-3 82 50)">
        <rect width="150" height="96" rx="12" fill="var(--surface-4)" />
      </g>
      <g transform="translate(24 22) rotate(-1.5 82 50)">
        <rect width="150" height="96" rx="12" fill="var(--surface-3)" />
      </g>
      <g className={flipped ? 'craft-card is-flipped' : 'craft-card'}>
        <rect x="30" y="16" width="150" height="96" rx="12" fill="var(--surface-2)" stroke="var(--hairline-strong)" />
        <text x="48" y="70" fill="var(--text)" fontSize="18" fontFamily="Unbounded, sans-serif">
          {flipped ? ty('Ответ') : ty('Вопрос')}
        </text>
      </g>
    </svg>
  )
}
