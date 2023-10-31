import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filterCheckbox">
      <input type="checkbox" id="short-films" className="checkbox-input" />
      <div className="oval">
        <div className="circle-container">
          <div className="circle"></div>
        </div>
      </div>
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;