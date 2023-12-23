import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import { toast } from 'react-toastify'
import { deletePostById } from '../services/PostService'
import userContext from '../context/userContext'
function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePostFunction}) {

    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    useEffect(() => {
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])

    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h3>{post.title}</h3>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 300) + "...." }}>
                </CardText>

                <div>
                    {console.log("test -", userContextData.user.isLoggedIn)}
                    {console.log("testing - ", userContextData)}
                    {console.log("post: ", post)}
                    <Link className='btn btn-secondary border-0' to={'/posts/' + post.id}>Read More</Link>
                    {userContextData.user.isLoggedIn && (user && user.id == post.user?.id ? <Button onClick={(event) => deletePostFunction(post)} color='danger' className="ms-2">Delete</Button> : '')}
                    {userContextData.user.isLoggedIn && (user && user.id === post.user?.id ? <Button tag={Link} to={`/user/update-post/${post.id}`} color='warning' className="ms-2">Update</Button> : '')}

                </div>
            </CardBody>
        </Card>

    )
}

export default Post