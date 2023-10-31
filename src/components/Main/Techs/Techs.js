import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h3 className='techs__subtitle'>Технологии</h3>
      <div className='techs__separator'></div>
      <div className='techs__container'>
        <h2 className='techs__title'>7 технологий</h2>
        <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <table className='techs__table'>
          <tbody>
            <tr>
              <td>HTML</td>
              <td>CSS</td>
              <td>JS</td>
              <td>React</td>
              <td>Git</td>
              <td>Express.js</td>
              <td>mongoDB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Techs;