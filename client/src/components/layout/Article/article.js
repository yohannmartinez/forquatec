import React, { Component } from "react";
import axios from "axios"
import './article.scss'
//images

class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: null,
    }
  }

  componentDidMount() {
    axios.get("/api/articles/getById", { params: { id: window.location.pathname.split('/').pop() } }).then((res) => {
      this.setState({ article: res.data.article }, () => { console.log(this.state.article, window.location.pathname.split('/').pop()) })
    })
  }

  render() {
    return (
      <div className="Article_globalContainer">
        {this.state.article ?
          <div className="Article_articleContainer">

            <div className="Article_articleBackground" style={{ backgroundImage: `url('${this.state.article.imageLink}')` }}>
              <div className="Article_articleInfos">
                <h1 className="Article_articleTitle">{this.state.article.title}</h1>
                <span className="Article_articleDate">Publié le {new Date(this.state.article.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>

            <div className="Article_articleDescription">
              <p className="Article_articleText"> <span class="material-icons">format_quote</span> {this.state.article.text} <span class="material-icons">format_quote</span></p>
              {this.state.article.videoLink ?
                <video className="Article_articleMedia" controls>
                  <source src={this.state.article.videoLink} type="video/mp4" />
                </video>
                :
                <img src={this.state.article.imageLink} className="Article_articleMedia" />
              }
            </div>

          </div>

          :

          <div className="Article_noArticleContainer">
            <h1 className="Article_noArticleTitle">Oops, il y a un problème</h1>
            <p className="Article_noArticleText">Il semblerait que l'article que vous cherchez n'existe pas !</p>
            <button className="Article_noArticleButton">Retourner à la liste des articles</button>
          </div>
        }
      </div>
    );
  }
}

export default Article;