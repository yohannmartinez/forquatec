import React, { Component } from "react";
import axios from "axios"
import {Link} from 'react-router-dom'
import "./blog.scss"

class Blog extends Component {

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
      <div className="Blog">
        {this.state.articles &&
          <div className="Blog_progressbarContainer">
        <h1 className="Blog_title">Blog</h1>
            <span className="Blog_progressbarText">Retrouvez ici tous les articles rédigés par forquatec </span>
          </div>
        }

        {this.state.articles &&
          <div className="Blog_articlesContainer">
            {this.state.articles.map((article, index) => (
              <Link to={"article/" + article._id} className="Blog_article" key={"article" + index}>
                <div className="Blog_articleImage" style={{ backgroundImage: `url(${article.imageLink})` }}></div>
                <div className="Blog_articleDescription">
                  <div>
                    <h1 className="Blog_articleTitle">{article.title}</h1>
                    <h1 className="Blog_articleDate">Publié le {new Date(article.date).toLocaleDateString('en-GB')}</h1>
                  </div>
                  <div className="Blog_articleButtonContainer">
                    <button className="Blog_articleButton">Voir l'article</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }
      </div>
    );
  }
}

export default Blog;