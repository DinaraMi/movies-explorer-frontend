import './AboutMe.css'
import student from '../../../images/photo.png';

function AboutMe() {
  return (
    <section className='aboutMe'>
      <h3 className='aboutMe__subtitle'>Студент</h3>
      <div className='aboutMe__separator'></div>
      <img className='aboutMe__photo' src={student} alt="фото" />
      <h2 className='aboutMe__title'>Динара</h2>
      <div className='aboutMe__description'>
        <p className='aboutMe__paragraph'>Фронтенд-разработчик, 35 лет</p>
        <p className='aboutMe__paragraph'>Я родилась в Саратове, закончила факультет юриспруденции РПА МЮ России. У меня есть муж и сын.
          Я люблю слушать музыку и кататься на велосипеде. Недавно начала кодить.
          Заканчиваю курс по веб-разработке, начала заниматься пет-проектами и активно ищу работу.</p>
      </div>
    </section>
  )
}

export default AboutMe;