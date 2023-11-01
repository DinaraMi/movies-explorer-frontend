import './AboutMe.css'
import student from '../../../images/photo.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__subtitle'>Студент</h2>
      <div className='about-me__separator'></div>
      <img className='about-me__photo' src={student} alt="фото" />
      <h3 className='about-me__title'>Динара</h3>
      <div className='about-me__description'>
        <p className='about-me__paragraph'>Фронтенд-разработчик, 35 лет</p>
        <p className='about-me__paragraph'>Я родилась в Саратове, закончила факультет юриспруденции РПА МЮ России. У меня есть муж и сын.
          Я люблю слушать музыку и кататься на велосипеде. Недавно начала кодить.
          Заканчиваю курс по веб-разработке, начала заниматься пет-проектами и активно ищу работу.</p>
      </div>
    </section>

  )
}

export default AboutMe;