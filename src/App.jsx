import { useEffect, useMemo, useState } from 'react'
import './index.css'

const TOURS = [
  { id: 1, place: "Cox's Bazar", days: '3 days / 2 nights', price: 8500, tag: 'Bestseller', desc: 'World\'s longest sea beach, sunset point, Himchari falls.' },
  { id: 2, place: 'Sundarbans', days: '3 days / 2 nights', price: 12000, tag: 'Adventure', desc: 'Mangrove forest cruise, wildlife safari, Kotka beach.' },
  { id: 3, place: 'Sylhet & Sreemangal', days: '2 days / 1 night', price: 6500, desc: 'Tea gardens, Ratargul swamp forest, Jaflong.' },
  { id: 4, place: 'Bandarban', days: '3 days / 2 nights', price: 9500, tag: 'Hills', desc: 'Nilgiri, Boga Lake, tribal villages, waterfalls.' },
  { id: 5, place: 'Saint Martin', days: '2 days / 1 night', price: 7500, desc: 'Coral island, clear water, beach BBQ night.' },
  { id: 6, place: 'Rangamati', days: '2 days / 1 night', price: 6000, desc: 'Kaptai lake cruise, hanging bridge, tribal market.' },
]

const REVIEWS = [
  { text: 'Sundarbans trip was perfectly organized - boat, food, guide, everything.', who: 'Tanvir H. - Dhaka' },
  { text: 'Booked for 12 people office tour. Transparent pricing, no hidden cost.', who: 'Nusrat J. - corporate client' },
  { text: 'Cox\'s Bazar package felt premium at budget price. Highly recommended.', who: 'Arif M. - Chittagong' },
]

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.show)')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('show')),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

export default function App() {
  useReveal()
  const [pkg, setPkg] = useState(TOURS[0].id)
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [faq, setFaq] = useState(null)

  const tour = TOURS.find((t) => t.id === Number(pkg))
  const total = useMemo(() => tour.price * guests, [tour, guests])
  const fmt = (n) => '৳' + n.toLocaleString('en-IN')

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">BANGLA TRAILS</div>
        <nav>
          <a href="#tours">Tours</a>
          <a href="#booking">Booking</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href="#booking" className="btn small">Book Now</a>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <p className="kicker pulse">Bangladesh Tours - Since 2020</p>
          <h1>See Bangladesh <span className="grad">the easy way.</span></h1>
          <p className="sub">Fixed packages, honest pricing, hotel + transport + guide included.</p>
          <div className="cta-row">
            <a href="#tours" className="btn">Browse tours</a>
            <a href="#booking" className="btn ghost">Check price</a>
          </div>
          <div className="stats">
            <div><strong>6</strong><span>tour packages</span></div>
            <div><strong>4.8</strong><span>avg. rating</span></div>
            <div><strong>2k+</strong><span>happy travelers</span></div>
          </div>
        </div>
      </section>

      <section id="tours" className="section reveal">
        <h2>Popular tours</h2>
        <p className="muted">Per person pricing. Click a card to select it in the booking form.</p>
        <div className="grid">
          {TOURS.map((t) => (
            <div key={t.id} className={'card' + (pkg === t.id ? ' selected' : '')} onClick={() => { setPkg(t.id); document.getElementById('booking').scrollIntoView({ behavior: 'smooth' }) }}>
              <div className="card-top"><h3>{t.place}</h3>{t.tag && <span className="pill hot">{t.tag}</span>}</div>
              <p>{t.desc}</p>
              <div className="card-foot"><span className="pill">{t.days}</span><span className="price">{fmt(t.price)} /person</span></div>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="section dark reveal">
        <h2>Book your trip</h2>
        <p className="muted">Price updates live as you change package and guests.</p>
        <div className="book-grid">
          <div className="summary">
            <h3>{tour.place}</h3>
            <p>{tour.days}</p>
            <p className="calc">{fmt(tour.price)} x {guests} guest{guests > 1 ? 's' : ''}</p>
            <p className="total">Total: {fmt(total)}</p>
          </div>
          <form className="quote" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <select value={pkg} onChange={(e) => setPkg(e.target.value)}>
              {TOURS.map((t) => <option key={t.id} value={t.id}>{t.place} - {t.days}</option>)}
            </select>
            <div className="guest-row">
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
              <span>{guests} guests</span>
              <button type="button" onClick={() => setGuests(Math.min(30, guests + 1))}>+</button>
            </div>
            <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <input required placeholder="Phone (01XXXXXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {done
              ? <p className="success">Thanks {name}! Booking request for {tour.place} ({guests} guests, {fmt(total)}) received. We will call {phone} within 24 hours.</p>
              : <button className="btn" type="submit">Confirm booking</button>}
          </form>
        </div>
        <div className="faq">
          {[
            { q: 'What is included in the price?', a: 'Transport, hotel, daily breakfast, guide and all entry fees. Lunch/dinner where mentioned.' },
            { q: 'Can I customize a package?', a: 'Yes - message us with your dates and group size for a custom quote.' },
            { q: 'What is the cancellation policy?', a: 'Full refund up to 7 days before departure, 50% within 3-7 days.' },
          ].map((f, i) => (
            <div className="faq-item" key={i}>
              <button type="button" className="faq-q" onClick={() => setFaq(faq === i ? null : i)}>{f.q}<span>{faq === i ? '-' : '+'}</span></button>
              {faq === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="section reveal">
        <h2>Traveler reviews</h2>
        <div className="marquee"><div className="track">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div className="review" key={i}><p>"{r.text}"</p><span>- {r.who}</span></div>
          ))}
        </div></div>
      </section>

      <footer><p>Bangla Trails - demo project by Rifath. Built with React.</p></footer>
    </div>
  )
}
