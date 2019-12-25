import React, { Component } from "react";
import {ToastContainer} from "react-toastify";
import http from "./servises/httpService";
import config from "./config.json";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {
    posts: []
  };
  async componentDidMount(){
    const {data: posts} = await http.get(config.apiEndpoint);
    //console.log(promise);
    //const response = await promise;
    this.setState( {posts} );
  }

  handleAdd = async () => {
    const obj = {title: 'a', body: 'b'};
    const {data: post} = await http.post(config.apiEndpoint, obj);
    //console.log(post);
    const posts = [post, ...this.state.posts ];
    this.setState({posts})
  };

  handleUpdate = async post => {
    post.title = "UPDATE";
    await http.put(config.apiEndpoint + '/' + post.id, post);
    //http.patch(apiEndpoint + '/' + post.id, {title: post.title});
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({posts})
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try{
     await http.delete(config.apiEndpoint + "/" + post.id);
      //throw new Error('');
    }
    catch(ex){
      console.log("HANDLE DELETE CATCH BLOCK / FROM INTERCEPTOR");


      if (ex.response && ex.response.status === 404)
      alert("This post has already been deleted.");
      //this.setState({ posts: originalPosts });

      //else {
        //console.log('Logging the error', ex);
        //alert("An unexpeted error occored");
      //}
      this.setState({posts: originalPosts})
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
