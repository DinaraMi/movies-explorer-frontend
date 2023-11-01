import './NavTab.css'

function NavTab() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-project");
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className='nav-tab'>
      <button className='nav-tab__button' onClick={scrollToAbout}>Узнать больше</button>
    </section>

  )
}

export default NavTab;