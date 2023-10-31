import './AboutProject.css'
function AboutProject() {
  return (
    <section className='aboutProject'>
      <h2 className='aboutProject__title aboutProject__title_first'>О проекте</h2>
      <div className='aboutProject__separator'></div>
      <div className='aboutProject__description'>
        <div className='aboutProject__container'>
          <h2 className='aboutProject__title aboutProject__title_two'>Дипломный проект включал 5 этапов</h2>
          <p className='aboutProject__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='aboutProject__container'>
          <h2 className='aboutProject__title aboutProject__title_three'>На выполнение диплома ушло 5 недель</h2>
          <p className='aboutProject__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <ul className='aboutProject__table'>
        <li className='aboutProject__table-cell'>
          <h3>1 неделя</h3>
          <p>Back-end</p>
        </li>
        <li className='aboutProject__table-cell'>
          <h3>4 недели</h3>
          <p>Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;