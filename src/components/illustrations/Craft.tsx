import { ty } from '../../lib/typograph'

export function BotChat() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="30" y="22" width="220" height="34" rx="12" fill="var(--surface-3)" />
      <text x="140" y="44" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="Onest, sans-serif">
        {ty('Привет! Выберите действие')}
      </text>
      <rect x="162" y="64" width="88" height="28" rx="12" fill="rgb(42 171 238 / 0.22)" />
      <text x="206" y="83" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="Onest, sans-serif">
        /start
      </text>
      <rect x="46" y="104" width="88" height="30" rx="10" fill="none" stroke="var(--tg)" strokeWidth="1.5" />
      <text x="90" y="124" textAnchor="middle" fill="var(--tg)" fontSize="13" fontFamily="Onest, sans-serif">
        {ty('Каталог')}
      </text>
      <rect x="146" y="104" width="88" height="30" rx="10" fill="none" stroke="var(--tg)" strokeWidth="1.5" />
      <text x="190" y="124" textAnchor="middle" fill="var(--tg)" fontSize="13" fontFamily="Onest, sans-serif">
        {ty('Связаться')}
      </text>
    </svg>
  )
}

export function MiniAppShot() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="90" y="4" width="100" height="152" rx="20" fill="var(--surface-3)" stroke="var(--hairline-strong)" />
      <rect x="118" y="10" width="44" height="5" rx="2.5" fill="var(--surface-1)" />
      <rect x="100" y="22" width="80" height="20" rx="8" fill="var(--surface-1)" />
      <circle cx="114" cy="32" r="6" fill="var(--tg)" />
      <path
        transform="translate(109.2 27.2) scale(0.4)"
        fill="#fff"
        d="M21.68 3.14 2.55 10.52c-1.28.5-1.27 1.21.02 1.52l4.86 1.51 11.08-6.94c.52-.32.83-.15.5.2l-8.97 8.05-.34 5.16c.49 0 .71-.22.98-.5l2.35-2.27 4.88 3.6c.89.52 1.59.24 1.82-.86L22.86 4.05c.3-1.26-.48-1.82-1.18-1.4Z"
      />
      <rect x="104" y="50" width="32" height="32" rx="8" fill="var(--surface-4)" />
      <rect x="144" y="50" width="32" height="32" rx="8" fill="var(--surface-4)" />
      <rect x="104" y="90" width="32" height="32" rx="8" fill="var(--surface-4)" />
      <rect x="144" y="90" width="32" height="32" rx="8" fill="var(--surface-4)" />
      <g className="craft-press">
        <rect x="104" y="128" width="72" height="20" rx="8" fill="#2AABEE" />
        <text x="140" y="142" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Onest, sans-serif">
          {ty('Открыть')}
        </text>
      </g>
    </svg>
  )
}

export function SiteWindow() {
  return (
    <svg className="craft" viewBox="0 0 280 160" role="img" aria-hidden="true">
      <rect x="24" y="14" width="232" height="132" rx="14" fill="var(--surface-3)" stroke="var(--hairline-strong)" />
      <rect x="70" y="26" width="140" height="14" rx="7" fill="var(--surface-1)" />
      <text x="140" y="70" textAnchor="middle" fill="var(--text)" fontSize="18" fontFamily="Unbounded, sans-serif">
        {ty('Заголовок')}
      </text>
      <rect className="craft-btn" x="104" y="80" width="72" height="18" rx="8" fill="#2AABEE" />
      <rect x="36" y="112" width="64" height="20" rx="8" fill="var(--surface-4)" />
      <rect x="108" y="112" width="64" height="20" rx="8" fill="var(--surface-4)" />
      <rect x="180" y="112" width="64" height="20" rx="8" fill="var(--surface-4)" />
      <path
        className="craft-cursor"
        transform="translate(178 78)"
        d="M1 1 1 15.2 5.1 11.2 8.7 18.2 11 17.1 7.4 10.2 12.2 9.7Z"
        fill="var(--text)"
      />
    </svg>
  )
}

export function PakoDesk() {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <rect x="46" y="12" width="108" height="140" rx="22" fill="var(--surface-3)" stroke="var(--hairline-strong)" />
      <rect x="78" y="20" width="44" height="6" rx="3" fill="var(--surface-1)" />
      <rect x="62" y="34" width="32" height="32" rx="10" fill="var(--surface-4)" />
      <rect x="106" y="34" width="32" height="32" rx="10" fill="var(--surface-1)" stroke="var(--tg)" strokeWidth="1.5" />
      <text x="122" y="55" textAnchor="middle" fill="var(--tg)" fontSize="14" fontFamily="Unbounded, sans-serif">
        П
      </text>
      <rect x="62" y="74" width="32" height="32" rx="10" fill="var(--surface-4)" />
      <rect x="106" y="74" width="32" height="32" rx="10" fill="var(--surface-4)" />
      <rect x="58" y="114" width="84" height="16" rx="8" fill="rgb(53 226 161 / 0.16)" />
      <text x="100" y="125" textAnchor="middle" fill="var(--signal)" fontSize="10" fontFamily="Onest, sans-serif">
        {ty('Установлено')}
      </text>
    </svg>
  )
}

export function PakoMenu() {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <rect x="24" y="48" width="152" height="36" rx="10" fill="var(--surface-3)" />
      <text x="100" y="71" textAnchor="middle" fill="var(--text)" fontSize="14" fontFamily="Onest, sans-serif">
        {ty('59 блюд')}
      </text>
      <rect x="24" y="96" width="152" height="36" rx="10" fill="var(--surface-3)" />
      <text x="100" y="119" textAnchor="middle" fill="var(--text)" fontSize="14" fontFamily="Onest, sans-serif">
        {ty('44 напитка')}
      </text>
    </svg>
  )
}

export function FlashStack({ flipped }: { flipped: boolean }) {
  return (
    <svg className="craft" viewBox="0 0 200 180" role="img" aria-hidden="true">
      <g transform="rotate(-8 100 86)">
        <rect x="34" y="44" width="132" height="84" rx="14" fill="var(--surface-4)" />
      </g>
      <g transform="rotate(-4 100 86)">
        <rect x="34" y="44" width="132" height="84" rx="14" fill="var(--surface-3)" />
      </g>
      <g className={flipped ? 'craft-card is-flipped' : 'craft-card'}>
        <rect x="34" y="44" width="132" height="84" rx="14" fill="var(--surface-2)" stroke="var(--hairline-strong)" />
        <text x="100" y="92" textAnchor="middle" fill="var(--text)" fontSize="18" fontFamily="Unbounded, sans-serif">
          {flipped ? ty('Ответ') : ty('Вопрос')}
        </text>
      </g>
    </svg>
  )
}
