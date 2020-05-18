import React, { Component } from "react";

import "./sectionTwo.scss"

//images
import Virus from "../../../assets/Landing/virus.png"

class SectionTwo extends Component {
  render() {
    return (
      <div className="Landing_sectionTwo">
        <div className="Landing_sectionTwo_left">
          <img src={Virus} className="Landing_sectionTwo_right_image" />
        </div>
        <div className="Landing_sectionTwo_right">
          <h1 className="Landing_sectionTwo_title">Actualité de dernière minute !</h1>
          <p className="Landing_sectionTwo_texte">La crise sanitaire Coronavirus Covid-19 a impacté fortement le monde de l’entreprise, et la reprise
          mérite d’être traité avec le plus grand soin, si on ne veut pas subir la fameuse deuxième vague.
          Forquatec vous propose une nouvelle formation pour répondre à vos obligations de chef
          d’entreprise, garant de la bonne santé mentale et physique de vos collaborateurs.</p>
          <button className="Landing_sectionTwo_button">Consulter gratuitement le programme de formation <span class="material-icons" style={{ fontSize: "1.6em", paddingTop: "0.05em" }}>navigate_next</span>
          </button>
        </div>

      </div>
    );
  }
}

export default SectionTwo;