import './Portfolio.css'
import arrow from '../../../images/arrow.png';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__subtitle'>Github</h3>
      <p className='portfolio__paragraph'>Портфолио</p>
      <div className="portfolio-item">
        <a className="portfolio__link" href='https://github.com/DinaraMi/how-to-learn.git' target="_blank" rel="noopener noreferrer">
          <h2 className='portfolio__title'>Статичный сайт</h2>
        </a>
        <img className='portfolio__icon' src={arrow} alt='стрелка' />
      </div>
      <div className='portfolio__separator'></div>
      <div className="portfolio-item">
        <a className="portfolio__link" href='https://github.com/DinaraMi/russian-travel.git' target="_blank" rel="noopener noreferrer">
          <h2 className='portfolio__title'>Адаптивный сайт</h2>
        </a>
        <img className='portfolio__icon' src={arrow} alt='стрелка' />
      </div>
      <div className='portfolio__separator'></div>
      <div className="portfolio-item">
        <a className="portfolio__link" href='https://github.com/DinaraMi/express-mesto-gha.git' target="_blank" rel="noopener noreferrer">
          <h2 className='portfolio__title'>Одностраничное приложение</h2>
        </a>
        <img className='portfolio__icon' src={arrow} alt='стрелка' />
      </div>
    </section>
  )
}

export default Portfolio;