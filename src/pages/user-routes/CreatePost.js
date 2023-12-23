import React, { useState } from 'react'
import Base from '../../components/Base'
import { Container } from 'reactstrap'
import AddPost from '../../components/AddUpdatePost'
import AddUpdatePost from '../../components/AddUpdatePost'

const CreatePost = () => {
  const action = "create-post";

  const [post, setPost] = useState({
    title: "",
    content: "",
    description: "",
    categoryId: "",
  });

  return (
    <Base>
    <Container>
        <AddUpdatePost do={action} post={post} setPost={setPost}/>
    </Container>
    </Base>
  )
}

export default CreatePost
