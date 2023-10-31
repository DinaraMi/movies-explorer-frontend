import './Main.css'
import Promo from "./Promo/Promo";
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {
  return (
    <main className="content">
      <div className="green-background">
        <Promo />
        <NavTab />
      </div>
      <AboutProject />
      <div className="gray-background">
        <Techs />
      </div>
      <AboutMe />
      <Portfolio />
    </main>
  )
}
export default Main;