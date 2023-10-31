import { Link } from 'react-router-dom';
import './ErrorNotFound.css';

function ErrorNotFound() {
  return (
    <section className='error-not-found'>
      <h3 className='error-not-found__number'>404</h3>
      <p className='error-not-found__paragraph'>Страница не найдена</p>
      <Link className='error-not-found__link' to="/">Назад</Link>
    </section>
  )
}

export default ErrorNotFound;