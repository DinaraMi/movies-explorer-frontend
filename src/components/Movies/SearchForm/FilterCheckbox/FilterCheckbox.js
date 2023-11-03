import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <section className='filterCheckbox'>
      <label className="filterCheckbox__label">
        <input type="checkbox" id="short-films" className="checkbox-input" />
      </label>
      <div className="oval">
        <div className="circle-container">
          <div className="circle"></div>
        </div>
      </div>
      <h2 className='filterCheckbox__title'>Короткометражки</h2>
    </section>
  )
}

export default FilterCheckbox;