import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../../context/userContext';
import { loadPost } from '../../services/PostService';
import { toast } from 'react-toastify';
import Base from '../../components/Base';
import { Container } from 'reactstrap';
import AddPost from '../../components/AddUpdatePost';
import AddUpdatePost from '../../components/AddUpdatePost';

const UpdatePost = () => {
    const {postId} = useParams();
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const action = "update-post";

    useEffect(()=>{

        //load the post
        loadPost(postId).then((data) => {
            console.log(data);
            setPost({...data});
        }).catch((err)=> {
            toast.error("Error while loading the post!");
            console.log(err);
        })
    }, [])

    useEffect(()=>{
        if(post?.user) {
            console.log("update post(user): ", post.user);
            if(post.user.id != userContextData.user.data.id) {
                toast.error("Your not allowed to update this post!");
                navigate("/home");
            }
        }
    }, [post]);

  return (
   <Base>
     <Container>
     <AddUpdatePost do={action} post={post} setPost={setPost}/>
     </Container>
   </Base>
  )
}

export default UpdatePost
