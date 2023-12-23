import React, { useEffect, useState } from 'react'
import { deletePostById, loadPostsByUser } from '../../services/PostService';
import { toast } from 'react-toastify';
import { getCurrentUserDetail } from '../../auth';
import { Container } from 'reactstrap';
import Post from '../../components/Post';
import Base from '../../components/Base';

const UserPosts = () => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(()=> {
        setUser(getCurrentUserDetail());
        console.log(getCurrentUserDetail());
        loadPostsByUser(getCurrentUserDetail().id).then((data) => {
            setPosts(data);
            console.log(data);
        }).catch((error) => {
            toast.error("Cannot Load User Posts!");
        })

    }, []);

    const deletePost = (post) => {
        deletePostById(post.id).then((data) => {
            let tmp = posts.filter((p) => p.id != post.id);
            console.log("filtered: ", tmp);
            setPosts([...tmp]);
            toast.success("Successfully deleted the post!");
        }).catch(err => toast.error("Error while deleting the post, id: " + post.id))
    }

  return (
    <Base>
        <Container>
            <h1 className='my-3'>Posts Count : ({posts.length})</h1>
            {
                posts.map((p, i)=> {
                    return <Post post={p} key={i} deletePostFunction = {deletePost}/>
                })
            }
        </Container>
    </Base>
  )
}

export default UserPosts
