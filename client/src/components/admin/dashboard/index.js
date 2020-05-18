import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import cloneDeep from 'lodash/cloneDeep';
import "./style.scss"

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      articles: [],

      upload: {
        image: null,
        video: null,
        title: "",
        text: "",
        loading: false,
        message: null,
      },

      edit: {
        index: null,
        article: null,
        editImage: false,
        image: null,
        editVideo: false,
        video: null,
        loading: false,
        message: null,
      },
    }
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentDidMount() {
    axios.get("/api/articles/getAll").then(res => this.setState({ articles: res.data.articles })).catch(err => console.log(err))
  }

  //
  //FUNCTIONS TO CREATE ARTICLE
  //
  onChangeUpload = e => {
    let stateCopy = this.state.upload;
    stateCopy[e.target.name] = e.target.value;
    this.setState({ upload: stateCopy });
  };

  handleSelectedImageUpload = e => {
    let stateCopy = this.state.upload;
    stateCopy.image = e.target.files;
    this.setState({ upload: stateCopy });
  };

  handleSelectedVideoUpload = e => {
    let stateCopy = this.state.upload;
    stateCopy.video = e.target.files;
    this.setState({ upload: stateCopy });
  };

  //function to upload an article
  handleUpload = event => {
    event.preventDefault();
    //set the loading state to true
    let stateCopy = this.state.upload;
    stateCopy.loading = true;
    stateCopy.message = null;
    this.setState({ upload: stateCopy });
    //starting by uploading the image on s3
    const imageData = new FormData();
    imageData.append('file', this.state.upload.image[0]);
    axios.post(`/api/s3/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      //now that the file is uploaded we retrieve the link and put it on db with the title and the text
      let imageLink = response.data.Location;
      if (this.state.upload.video && this.state.upload.video.length > 0) {
        //if there is a video, upload it
        const videoData = new FormData();
        videoData.append('file', this.state.upload.video[0]);
        axios.post(`/api/s3/upload`, videoData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          let videoLink = res.data.Location;
          this.createArticle(imageLink, videoLink);
        })
      } else {
        //if there isn't any video, create the article
        this.createArticle(imageLink, null)
      }
    }).catch(error => {
      alert(error)
    });
  };

  createArticle(imageLink, videoLink) {
    axios.post("/api/articles/create", {
      title: this.state.upload.title,
      text: this.state.upload.text,
      videoLink: videoLink,
      imageLink: imageLink,
    }).then(res => {
      console.log(res)
      //set the loading state to false and putting the message in state
      let stateCopy = this.state.upload;
      stateCopy.loading = false;
      stateCopy.message = res.data.message;
      this.setState({ upload: stateCopy });
      //push the new article in the articles states and update all 
      this.state.articles.unshift(res.data.article);
      this.forceUpdate();
    }).catch(err => {
      //set the loading state to false and putting the message in state
      let stateCopy = this.state.upload;
      stateCopy.loading = false;
      stateCopy.message = err;
      this.setState({ upload: stateCopy });
    })
  }

  //
  //FUNCTIONS TO EDIT ARTICLE
  //
  launchEditArticle(articleIndex) {
    console.log(articleIndex)
    let editCopy = this.state.edit;
    editCopy.article = cloneDeep(this.state.articles[articleIndex]);
    if(editCopy.article.videoLink){
      editCopy.editVideo = false
    } else {
      editCopy.editVideo = true
    }
    editCopy.index = articleIndex;
    this.setState({ edit: editCopy, page: "editArticle" }, (console.log(this.state)));
  }

  onChangeEdit = e => {
    let editCopy = this.state.edit;
    editCopy.article[e.target.name] = e.target.value;
    this.setState({ edit: editCopy })
  };

  handleEditImageUpload = e => {
    let stateCopy = this.state.edit;
    stateCopy.image = e.target.files;
    this.setState({ upload: stateCopy });
  };

  handleEditVideoUpload = e => {
    let stateCopy = this.state.edit;
    stateCopy.video = e.target.files;
    this.setState({ upload: stateCopy });
  };

  updateImage = e => {
    e.preventDefault()
    //set the loading state to true
    let stateCopy = this.state.edit;
    stateCopy.loading = true;
    stateCopy.message = null;
    this.setState({ edit: stateCopy });
    if (this.state.edit.image && this.state.edit.editImage === true) {
      //update avec la nouvelle image
      const imageData = new FormData();
      imageData.append('file', this.state.edit.image[0]);
      axios.post(`/api/s3/upload`, imageData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        let imageLink = response.data.Location
        this.updateVideo(imageLink);
      })

    } else {
      //update avec l'ancienne image
      this.updateVideo(this.state.edit.article.imageLink)
    }
  }

  updateVideo(imageLink) {
    if (this.state.edit.video && this.state.edit.editVideo === true) {
      //update avec la nouvelle video
      const videoData = new FormData();
      videoData.append('file', this.state.edit.video[0]);
      axios.post(`/api/s3/upload`, videoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        let videoLink = res.data.Location;
        this.updateArticle(imageLink, videoLink);
      })

    } else if (!this.state.edit.video && this.state.edit.editVideo === true) {
      //update avec null
      this.updateArticle(imageLink, null)
    } else {
      //update avec l'ancienne video
      this.updateArticle(imageLink, this.state.edit.article.videoLink)
    }
  }

  updateArticle(imageLink, videoLink) {
    //set the loading state to true
    let stateCopy = this.state.edit;
    stateCopy.loading = false;
    stateCopy.message = "upload success";
    this.setState({ edit: stateCopy });
    axios.post("/api/articles/update" , {id : this.state.edit.article._id,imageLink: imageLink, videoLink : videoLink, text: this.state.edit.article.text, title: this.state.edit.article.title}).then(res=>{
      let articlesCopy = this.state.articles;
      articlesCopy[this.state.edit.index].imageLink = imageLink;
      articlesCopy[this.state.edit.index].videoLink = videoLink;
      articlesCopy[this.state.edit.index].text = this.state.edit.article.text;
      articlesCopy[this.state.edit.index].title = this.state.edit.article.title;
      this.setState({articles : articlesCopy,page: "modifyArticle", edit: { index: null, article: null, loading: false, message: null, image: null, video: null }});
    })
  }

  //
  //FUNCTIONS TO DELETE ARTICLE
  //
  deleteArticle(articleIndex) {
    console.log(articleIndex)
    axios.post("/api/articles/delete", { id: this.state.articles[articleIndex]._id }).then(response => {
      alert(response.data.message);
      //remove the article from the articles array and update all 
      this.state.articles.splice(articleIndex, 1);
      this.forceUpdate();
    }).catch(err => alert(err))
  }

  render() {

    return (
      <div className="admin_container">
        <div>vous etes connecté en tant qu'administrateur ! que voulez vous faire ?</div>
        <button className="admin_button" onClick={() => { this.setState({ page: "addArticle" }) }}>ajouter un article</button>
        <button className="admin_button" onClick={() => { this.setState({ page: "modifyArticle" }) }}>modifier/supprimer un article</button>

        {/* page for adding an article */}
        {this.state.page === "addArticle" &&
          <div className="admin_page">
            <button className="admin_button" onClick={() => { this.setState({ page: null }) }}>retourner a l'accueil admin</button>
            <h1 className="admin_title">AJOUTER UN ARTICLE</h1>
            <span>mode d'emploi : ajoutez une image (obligatoire, qui apparaitra en vignette et dans l'article si il n'y a apas de vidéo), ajoutez une vidéo (optionnel), un titre (obigatoire) et une description (optionnel) </span>
            <form onSubmit={this.handleUpload}>
              image :<input className="admin_input" type="file" onChange={this.handleSelectedImageUpload} />
              video :<input className="admin_input" type="file" onChange={this.handleSelectedVideoUpload} />
              <input className="admin_input" type="text" placeholder="titre" name="title" onChange={this.onChangeUpload} />
              <input className="admin_input" type="text" placeholder="description" name="text" onChange={this.onChangeUpload} />
              <button className="admin_button" type="submit">Créer l'article</button>{this.state.upload.loading === true && "loading"}
              {this.state.upload.message && this.state.upload.message}

            </form>
          </div>
        }

        {/* page for update or delete an article */}
        {this.state.page === "modifyArticle" &&
          <div className="admin_page">
            <button className="admin_button" onClick={() => { this.setState({ page: null }) }}>retourner a l'accueil admin</button>
            <h1 className="admin_title">MODIFIER/SUPPRIMER UN ARTICLE</h1>
            {this.state.articles.map((article, index) => (
              <div className="admin_box" key={"article", index}>
                <span>article : {article._id}</span>
                image: <img src={article.imageLink} className="admin_image" />
                {article.videoLink ?
                  <div>
                    video :<br /><video width="300" controls>
                      <source src={article.videoLink} type="video/mp4" />
                    </video>
                  </div> : "pas de vidéo"
                }
                <span>titre : {article.title}</span>
                <span>description : {article.text}</span>
                <button className="admin_button" onClick={() => { this.launchEditArticle(index) }}>modifier</button>
                <button className="admin_button" onClick={() => { this.deleteArticle(index) }}>delete</button>

              </div>
            ))}
          </div>
        }

        {/* page for edit an article */}
        {this.state.page === "editArticle" &&
          <div className="admin_page">
            <h1 className="admin_title">MODIFER UN ARTICLE</h1>
            <form onSubmit={this.updateImage}>
              {!this.state.edit.editImage ?
                <div>
                  <img src={this.state.edit.article.imageLink} className="admin_image" />
                  <button className="admin_button" onClick={() => { let editCopy = this.state.edit; editCopy.editImage = true; this.setState({ edit: editCopy }) }}>changer l'image</button>
                </div>
                :
                <div>
                  changer l'image :<input className="admin_input" type="file" onChange={this.handleEditImageUpload} />
                  <button className="admin_button" onClick={() => { let editCopy = this.state.edit; editCopy.editImage = false; editCopy.image = null; this.setState({ edit: editCopy }) }}>revenir à l'ancienne image</button>
                </div>
              }

              {!this.state.edit.editVideo ?
                <div>
                  video :<br /><video width="300" controls>
                    <source src={this.state.edit.article.videoLink} type="video/mp4" />
                  </video>
                  <button className="admin_button" onClick={() => { let editCopy = this.state.edit; editCopy.editVideo = true; this.setState({ edit: editCopy }) }}>changer la video</button>
                </div>
                :
                <div>
                  changer la video :<input className="admin_input" type="file" onChange={this.handleEditVideoUpload} />
                  <button className="admin_button" onClick={() => { let editCopy = this.state.edit; editCopy.editVideo = false; editCopy.video = null; this.setState({ edit: editCopy }) }}>revenir à l'ancienne video</button>
                </div>
              }
              <input className="admin_input" type="text" value={this.state.edit.article.title} placeholder="titre" name="title" onChange={this.onChangeEdit} />
              <input className="admin_input" type="text" value={this.state.edit.article.text} placeholder="description" name="text" onChange={this.onChangeEdit} />
              <button className="admin_button" type="submit" >Modifier l'article</button>{this.state.edit.loading === true && "loading"}
              {this.state.upload.message && this.state.upload.message}
            </form>
            <button className="admin_button" onClick={() => { this.setState({ page: "modifyArticle", edit: { index: null, article: null, loading: false, message: null, image: null, video: null, } }) }}>annuler</button>

          </div>
        }
      </div>
    );
  }
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, null
)(Admin);
