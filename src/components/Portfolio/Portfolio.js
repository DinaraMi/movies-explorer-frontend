import './Portfolio.css'
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__subtitle'>Github</h2>
      <p className='portfolio__paragraph'>Портфолио</p>
      <ul className="portfolio-list">
        <li className="portfolio-item">
          <Link className="portfolio__link" to='https://github.com/DinaraMi/how-to-learn.git' target="_blank" rel="noopener noreferrer">
            <h3 className='portfolio__title'>Статичный сайт</h3>
          </Link>
          <div className='portfolio__separator'></div>
        </li>
        <li className="portfolio-item">
          <Link className="portfolio__link" to='https://github.com/DinaraMi/russian-travel.git' target="_blank" rel="noopener noreferrer">
            <h3 className='portfolio__title'>Адаптивный сайт</h3>
          </Link>
          <div className='portfolio__separator'></div>
        </li>
        <li className="portfolio-item">
          <Link className="portfolio__link" to='https://github.com/DinaraMi/express-mesto-gha.git' target="_blank" rel="noopener noreferrer">
            <h3 className='portfolio__title'>Одностраничное приложение</h3>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;