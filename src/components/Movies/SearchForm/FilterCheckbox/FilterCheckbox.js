import './FilterCheckbox.css';

function FilterCheckbox({ checked, onShortMoviesChange }) {
  // const handleCheckboxChange = () => {
  //   onShortMoviesChange();
  // }

  return (
    <section className='filterCheckbox'>
      <label className="filterCheckbox__label">
        <input type="checkbox"
          id="short-films"
          className="checkbox-input"
          // checked={checked}
          // onChange={handleCheckboxChange} 
          />
        <div className="oval">
          <div className="circle-container">
            <div className="circle"></div>
          </div>
        </div>
      </label>
      <h2 className='filterCheckbox__title'>Короткометражки</h2>
    </section>
  )

}

export default FilterCheckbox;