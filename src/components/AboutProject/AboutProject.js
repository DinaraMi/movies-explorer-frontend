import './AboutProject.css'
function AboutProject() {
  return (
    <section className='about-project' id="about-project">
      <h2 className='about-project__title about-project__title-large'>О проекте</h2>
      <div className='about-project__separator'></div>
      <div className='about-project__description'>
        <div className='about-project__container'>
          <h2 className='about-project__title about-project__title-medium'>Дипломный проект включал 5 этапов</h2>
          <p className='about-project__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__container'>
          <h2 className='about-project__title about-project__title-medium'>На выполнение диплома ушло 5 недель</h2>
          <p className='about-project__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <ul className='about-project__table'>
        <li className='about-project__table-cell'>
          <h3 className='about-project__table-cell-title about-project__table-cell-title_background'>1 неделя</h3>
          <p>Back-end</p>
        </li>
        <li className='about-project__table-cell'>
          <h3 className='about-project__table-cell-title'>4 недели</h3>
          <p>Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;