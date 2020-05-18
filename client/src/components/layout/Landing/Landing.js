import React, { Component } from "react";

import SectionOne from "./sectionOne"
import SectionTwo from "./sectionTwo"
import SectionThree from "./sectionThree";


class Landing extends Component {
  render() {
    return (
      <div className="Landing_container">
        <SectionOne/>
        <SectionTwo/>
        <SectionThree/>
      </div>
    );
  }
}

export default Landing;
