import { Link } from 'react-router-dom';
import './ErrorNotFound.css';

function ErrorNotFound() {
  return (
    <main className='error-not-found'>
      <h1 className='error-not-found__number'>404</h1>
      <p className='error-not-found__paragraph'>Страница не найдена</p>
      <Link className='error-not-found__link' to="/">Назад</Link>
    </main>
  )
}

export default ErrorNotFound;