import './NavTab.css'

function NavTab() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-project");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className='nav-tab'>
      <button className='nav-tab__button' onClick={scrollToAbout}>Узнать больше</button>
    </div>
  )
}

export default NavTab;