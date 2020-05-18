import React, { Component } from "react";

import "./sectionOne.scss"

//images
import Meduses from "../../../assets/Landing/illustration.svg"
import Scroll from "../../../assets/Landing/scroll.svg"

class SectionOne extends Component {
    render() {
      return (
          <div className="Landing_sectionOne">
            <div className="Landing_sectionOne_left">
              <h1 className="Landing_sectionOne_title">Former pour progresser</h1>
              <p className="Landing_sectionOne_texte">FORQUATEC est un centre de formation indépendant, créé pour animer vos formations personnalisées.<br />
              Le programme d’une formation est souvent commun. Vous pouvez le personnaliser et l’adapter à
              votre entreprise pour qu’il soit plus porteur de messages positifs et qu’il participe à la culture de votre entreprise.<br />
              C’est un challenge qui va vous permettre de prendre de l’avance sur la concurrence.</p>
              <button className="Landing_sectionOne_button">Les formations <span class="material-icons" style={{ fontSize: "1.6em", paddingTop: "0.05em" }}>navigate_next</span>
              </button>
            </div>
            <div className="Landing_sectionOne_right">
              <img src={Meduses} className="Landing_sectionOne_right_image" />
            </div>
            <img src={Scroll} className="Landing_sectionOne_scroll" />
          </div>
      );
    }
  }
  
  export default SectionOne;