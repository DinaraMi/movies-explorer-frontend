import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__separator'></div>
      <ul className='footer__links'>
        <li className='footer__link'>
          <Link to='https://practicum.yandex.ru' target='_blank' rel="noopener noreferrer" className='footer__link-item'>Яндекс.Практикум</Link>
        </li>
        <li className='footer__link'>
          <Link to='https://github.com/DinaraMi' target='_blank' rel="noopener noreferrer" className='footer__link-item'>Github</Link>
        </li>
      </ul>
      <span className='footer__icon'>© {new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer;
