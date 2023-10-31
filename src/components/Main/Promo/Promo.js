import './Promo.css';
import PromoLogo from '../../../images/PromoLogo.png';

function Promo () {
  return (
    <section className="promo">
      <img className='promo__logo' src={PromoLogo} alt="логотип" />
      <div className='promo__description'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
    </section>
  )
}

export default Promo;