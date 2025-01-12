import React,{useEffect, useState} from 'react'
import '../styles/Home.css'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Carousel from "../Carousel/Carousel";
import Generate from "../PdfGenerator/Generate";

export default function MyFollowingPost() {

  const navigate = useNavigate()
  var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  
  const [data, setData] = useState([])
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])

  //Toast functions
  const notifyA = (data)=> toast.error(data)
  const notifyB = (data)=> toast.success(data)
  

  useEffect(() => {

    const token = localStorage.getItem("jwt")
    if(!token){
      navigate("./signup")
    }

  //fetching all the posts
  fetch("http://localhost:5001/myfollowingpost",{
    method: "get",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("jwt")
    },
  }).then(res=>res.json())
  .then(result=> setData(result))
  .catch(err => console.log(err))
  },[])

  //to show and hide all comments
  const toggleComment = (posts)=> {
    if(show){
      setShow(false);
    }else{
      setShow(true);
      setItem(posts)
    }
  }
  
  const likePost = (id)=>{
    fetch("http://localhost:5001/like", {
      method: "put",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res=> res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id === result._id){
          return result
        }else{
          return posts
        }
      })
      setData(newData)
      console.log(result);
    })
  }

  const unlikePost = (id)=>{
    fetch("http://localhost:5001/unlike", {
      method: "put",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res=> res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id === result._id){
          return result
        }else{
          return posts
        }
      })
      setData(newData)
      console.log(result);
    })
  }

  const makeComment = (text, id)=>{
    fetch("http://localhost:5001/comment", {
      method: "put",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text: text,
        postId: id
      })
    }).then(res=> res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id === result._id){
          return result
        }else{
          return posts
        }
      })
      setData(newData)
      setComment("")
      notifyB("Comment Posted ")
      console.log(result);
    })
  }
console.log(data[0]);
  return (
    <div className="home">
      {/* card */}
      {data.map((posts) => {
        let images = posts.filter;
       
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                  alt=""
                />
              </div>
              <Link to={`/profile/${posts.postedBy._id}`}>
                <h5>{posts.postedBy.name}</h5>
              </Link>
            </div>

            {/* card image */}
            {/* <div className="card-image">
              <img src={posts.photo} alt="" />
        </div>*/}
            <Carousel images={images} />

            {/* card content */}
            {/*<div className="card-content">
              <p>{posts.body}</p>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
              </div>*/}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* card content */}
              <div className="card-content">
                <p>{posts.body}</p>
                <p
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  View all comments
                </p>
              </div>
              <Generate images={images} text={posts.body} />
            </div>

            {/* add comments */}
            <div className="add-comment">
              <input
                type="text"
                name=""
                id=""
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="comment"
                onClick={() => makeComment(comment, posts._id)}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}

      {/* show comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>

            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src={item.postedBy.Photo ? item.postedBy.Photo : picLink}
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name} </h5>
              </div>

              {/* comment section */}
              <div className="card-content">
                <p>{item.body}</p>
              </div>

              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}

              {/* add comments */}
              <div className="add-comment">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
