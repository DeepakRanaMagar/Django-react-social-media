import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Post } from "../components/posts"
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";

function SinglePost(){
    console.log(useParams());
    let { postId } = useParams();
    
    const post = useSWR(`/post/${postId}/`,fetcher);

    const comments = useSWR(`/post/${postId}/comment/`,fetcher);

    return(
        <Layout hasNavigationBack>
            {post.data?(
                
                <Row className="justify-content-center">
                    <Col sm={8}>
                        <Post post={post.data} refresh={post.mutate} isSinglePost />
                        <CreateComment postId={post.data.id} refresh={comments.mutate}/>
                    </Col>
                </Row>
            ): (
                <div>
                    Loading..
                </div>
            )}
        </Layout>        
    );
}

export default SinglePost;
