import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardText, Col, Container, Input, Row } from "reactstrap";
import { loadPost } from "../services/PostService";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import {
  getComment,
  getComments,
  postComment,
} from "../services/CommentService";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body :""
  });
  const [loadedComments, setLoadedComments] = useState([]);

  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log("post data: ");
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });

    getComments(postId)
      .then((data) => {
        setLoadedComments(data);
        console.log("comments: ", data);
      })
      .catch((error) => {
        toast.error("Something went wrong while loading comments!");
      });
  }, []);

  const getTime = () => {
    return new Date().toLocaleString();
  };

  const submitComment = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first !!");
      return;
    }

    if (comment.body.trim() === "") {
      return;
    }
    //setting the logged in user name and email to the comment
    comment.name = getCurrentUserDetail().name;
    comment.email = getCurrentUserDetail().email;

    console.log("submitting comment: ", comment);

    //submiting the comment
    postComment(comment, postId)
      .then((data) => {
        console.log(data);
        toast.success("comment added !");
        setLoadedComments([...loadedComments, data.data]);
        setComment({
            name: "",
            email: "",
            body :""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container>
        <Row>
          <Col md={{ size: 12 }}>
            <Card>
              {post && (
                <CardBody>
                  <CardText>
                    posted by <b>{"Add_The_User_To_DB"}</b> at{" "}
                    <b>{getTime()}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">"Naruto"</span>
                  </CardText>

                  <div
                    className="divder"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>

                  <div
                    className="image-container  mt-4 shadow"
                    style={{ maxWidth: "50%" }}
                  >
                    {/* <img className="img-fluid" src={BASE_URL + '/post/image/' + post.imageName} alt="" /> */}
                    <img
                      className="img-fluid"
                      src="https://wallpapers-clan.com/wp-content/uploads/2023/05/kid-naruto-sun-wallpaper.jpg"
                      alt=""
                      style={{ maxHeight: "600px" }}
                    />
                  </div>

                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        {/* comment section */}
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ( {loadedComments ? loadedComments?.length : 0} )</h3>

            {post && loadedComments &&
              loadedComments?.map((c, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                  <CardText>
                    <strong>{c.name}</strong> - {c.email}
                  </CardText>
                    <CardText>{c.body}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  value={comment.body}
                  onChange={(event) =>
                    setComment({ body: event.target.value })
                  }
                />

                <Button onClick={submitComment} className="mt-2" color="primary">
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default SinglePost;
