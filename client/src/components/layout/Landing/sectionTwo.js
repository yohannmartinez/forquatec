import React, { Component } from "react";

import "./sectionTwo.scss"

//images
import Virus from "../../../assets/Landing/sectionTwo.svg"

class SectionTwo extends Component {
  render() {
    return (
      <div className="Landing_sectionTwo">
        <div className="Landing_sectionTwo_left">
          <img src={Virus} className="Landing_sectionTwo_right_image" />
        </div>
        <div className=" Landing_sectionTwo_right">
          <h1 className="global_title Landing_sectionTwo_title">Actualité de dernière minute !</h1>
          <p className="global_text Landing_sectionTwo_texte">La crise sanitaire Coronavirus <b>Covid-19</b> a impacté fortement le monde de l’entreprise, et la reprise
          mérite d’être traité avec le plus grand soin, <b>si on ne veut pas subir la fameuse deuxième vague.</b>
          Forquatec vous propose une nouvelle formation pour répondre à vos obligations de chef
          d’entreprise, garant de la bonne santé mentale et physique de vos collaborateurs.</p>
          <button className="global_buttonLeft Landing_sectionTwo_button">Consulter gratuitement le programme de formation !</button>
        </div>

      </div>
    );
  }
}

export default SectionTwo;