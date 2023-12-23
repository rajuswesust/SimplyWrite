import React from "react";
import Base from "../components/Base";
import NewsFeed from "../components/NewsFeed";
import { Col, Container, Row } from "reactstrap";
import SideMenu from "../components/SideMenu";

const Home = () => {

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-5">
            <SideMenu />
          </Col>
          <Col md={10}>
            <NewsFeed />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
