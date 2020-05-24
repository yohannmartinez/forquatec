import React, { Component } from "react";

import "./sectionOne.scss"

//images
import illustration from "../../../assets/Landing/sectionOne.svg"

class SectionOne extends Component {
    render() {
      return (
          <div className="Landing_sectionOne">
            <div className="Landing_sectionOne_left">
              <h1 className="global_title Landing_sectionOne_title">Former pour progresser</h1>
              <p className=" global_text Landing_sectionOne_texte"><b>Forquatec</b> est un centre de formation indépendant, créé pour animer vos formations personnalisées.
              Le programme d’une formation est souvent commun. Vous pouvez le personnaliser et l’adapter à
              votre entreprise pour qu’il soit plus porteur de messages positifs et qu’il participe à la culture de votre entreprise.
              C’est un challenge qui va vous permettre de <b>prendre de l’avance sur la concurrence.</b></p>
              <button className="global_buttonRight Landing_sectionOne_button">Les formations !</button>
            </div>
            <div className="Landing_sectionOne_right">
              <img src={illustration} className="Landing_sectionOne_right_image" />
            </div>
          </div>
      );
    }
  }
  
  export default SectionOne;