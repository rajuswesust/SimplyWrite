import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../services/PostService";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import Post from "./Post";
import Loader from "./Loader";

const NewsFeed = () => {
  const [postContent, setPostContent] = useState({
    contents: [],
    pageNo: -1,
    pageSize: -1,
    totalElements: -1,
    totalPages: -1,
    last: false,
  });

  const nahid = {
    title: "nahid",
    content: "nahid",
  };

  useEffect(() => {
    //load the posts here
   
    changePage(0, 10);

  }, []);

  const changePage = (pageNo = 0, pageSize = 10) => {

    if(postContent.totalPages != -1 && pageNo > postContent.totalPages) {
        console.log("last page: ", pageNo, " ", postContent.totalElements);
        return;
    }
    if(pageNo < 0) {
        console.log("first page")
        return;
    }

    loadAllPosts(pageNo, pageSize)
    .then((data) => {
      console.log("loaded posts: " + JSON.stringify(data));
      setPostContent(data);
      window.scroll(0, 0);
    })
    .then(() => {
      console.log(postContent);
      console.log(postContent.contents);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // if(postContent.contents.length==0) {
  //     return <Loader />
  // }

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ offset: 1, size: 10 }}>
          <h2>total number of posts: {postContent.totalElements}</h2>
          {postContent?.contents?.map((p) => {
            return <Post post={p} key={p.id}/>;
          })}
          <Pagination className="mt-3 mx-auto" size="lg">
            <PaginationItem disabled={postContent.pageNo == 0} onClick={()=>changePage(postContent.pageNo - 1)}>
              <PaginationLink>
                previous
              </PaginationLink>
            </PaginationItem>
            {
                Array.from({ length: postContent.totalPages }, (_, index) => (
                <PaginationItem key={index}>
                    <PaginationLink active={index == postContent.pageNo} className={index === postContent.pageNo ? 'active-item' : ''} onClick={()=>changePage(index, 10)}>{index + 1}</PaginationLink>
                </PaginationItem>
                ))
            }
            <PaginationItem>
                <PaginationLink disabled={postContent.last} onClick={()=>changePage(postContent.pageNo+1)}>
                    next
                </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default NewsFeed;
