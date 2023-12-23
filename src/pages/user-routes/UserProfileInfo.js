import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/UserService';
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import { Tab } from 'bootstrap';

const UserProfileInfo = () => {
  const userContextData = useContext(userContext);
  const { userId }  = useParams();
  const [user, setUser] = useState(null);

  console.log(userId);

  useEffect(()=>{

    getUserById(userId).then((data) => {
        setUser({...data});
        console.log("user data: ", data);
    }).catch(err=>toast.error("Error while loading the user"))

  }, [])

  const userView = () => {
    return (

      <Row>
        <Col md={{size: 8, offset: 2}}>
          <Card>
            <CardBody>
              <Container className='text-center'>
                <h3 className='text-uppercase my-4'>user profile</h3>
                <img style={{maxWidth: '200px', maxHeight: '200px'}} src="https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png" alt='user pic'
                className='img-fluid rounded-circle'
                />

                <Table className='mt-3' hover={true} responsive striped>
                  <tbody>
                    <tr>
                      <td>
                        Name
                      </td>
                      <td>
                        Mini The Cat
                      </td>
                    </tr>
                    <tr>
                      <td>
                        username
                      </td>
                      <td>
                        nsd_sky
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Email
                      </td>
                      <td>
                        mini98@gmail.coom
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Something About Me
                      </td>
                      <td>
                        I have crush on Raju
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Roles
                      </td>
                      <td>
                        ADMIN
                      </td>
                    </tr>
                  </tbody>
                </Table>

              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>

    );    
  };

  return (
    <Base>
     {userView()}
    </Base>
  )
}

export default UserProfileInfo
