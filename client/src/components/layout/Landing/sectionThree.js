import React, { Component } from "react";
import axios from "axios"
import {Link} from 'react-router-dom'
import "./sectionThree.scss"

//images
import Virus from "../../../assets/Landing/virus.png"

class SectionThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: null,
    }
  }

  componentDidMount() {
    axios.get("/api/articles/getAll").then((res) => {
      this.setState({ articles: res.data.articles })
    })
  }

  render() {
    return (
      <div className="Landing_sectionThree">
        <h1 className="global_title Landing_sectionThree_title">Blog</h1>
        {this.state.articles &&
            <span className="Landing_sectionThree_progressbarText">3 articles sur {Object.keys(this.state.articles).length}</span>
        }

        {this.state.articles &&
          <div className="Landing_sectionThree_articlesContainer">
            {this.state.articles.slice(0, 3).map((article, index) => (
              <Link to={"article/" + article._id} className="Landing_sectionThree_article" key={"article" + index}>
                <div className="Landing_sectionThree_articleImage" style={{ backgroundImage: `url(${article.imageLink})` }}></div>
                <div className="Landing_sectionThree_articleDescription">
                  <div>
                    <h1 className="Landing_sectionThree_articleTitle">{article.title}</h1>
                    <h1 className="Landing_sectionThree_articleDate">Publié le {new Date(article.date).toLocaleDateString('en-GB')}</h1>
                  </div>
                  <div className="Landing_sectionThree_articleButtonContainer">
                    <button className="Landing_sectionThree_articleButton">Voir l'article</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }

        <div className="Landing_sectionThree_buttonAllArticlesContainer">
          <Link to="/blog" className="global_buttonRight">Voir tous les articles</Link>
        </div>
      </div>
    );
  }
}

export default SectionThree;