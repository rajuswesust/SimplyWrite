import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/CategoryService";
import JoditEditor from "jodit-react";
import { createPost, updatePost } from "../services/PostService";
import userContext from "../context/userContext";
import { json } from "react-router-dom";

const AddUpdatePost = ({do:action, post, setPost}) => {
  const [categories, setCategories] = useState([]);

  //Jodit Text Editor
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const userContextData = useContext(userContext);
  const user = userContextData.user.data;

  useEffect(() => {
    console.log("doing: ", action);

    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePostContentChange = (data) => {
    console.log(data);
    setPost({ ...post, content: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitting...");
    console.log(post);

    // console.log(post)
    if (post.title.trim() === "") {
      toast.error("post  title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    if (post.categoryId === "") {
      toast.error("select some category !!");
      return;
    }

    if(action=="create-post") {
      createPost(post, user.username).then(data => {
        toast.success("Post Created!");
      }).catch(error => {
        toast.error("Error in while submiting post")
        console.log(error)
      });
    }
    else {
        updatePost(post, post.id).then((data) => {
            toast.success("successfully updated!")
        }).catch((error)=> {
          toast.error("Error in while updating post")
          console.log(error)
        })
    }



  };

  const clearForm = () => {
    setPost({
      title: "",
      content: "",
      description: "",
      categoryId: "",
    });
  }

  return (
    <div className="wrapper">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          {/* {JSON.stringify(post)}
          <br/>
          <p>{JSON.stringify(user)}</p> */}
          {action=="create-post" ? <h3>What is going on your mind?</h3> : <h3>Update: {post?.title}</h3>}
          <Form onSubmit={handleSubmit}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={post?.title}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="rounded-0"
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                id="content"
                name="content"
                value={post?.content}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={handlePostContentChange}
              />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                name="categoryId"
                value={post?.categoryId}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="rounded-0"
              >
                <option disabled value="">
                  --Select category--
                </option>

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                {action == "create-post" ? <span>Create</span> : <span>Update</span>}
              </Button>
              <Button onClick={clearForm} className="rounded-0 ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddUpdatePost;
