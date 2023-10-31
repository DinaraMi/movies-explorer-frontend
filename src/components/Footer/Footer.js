import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__separator'></div>
      <p className='footer__paragraph'>Яндекс.Практикум</p>
      <p className='footer__paragraph'>Github</p>
      <div className='footer__icon'>© {new Date().getFullYear()}</div>
    </footer>
  )
}

export default Footer;