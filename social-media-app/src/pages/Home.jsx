import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import { randomAvatar } from "../utils"; 
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profile/ProfileCard";

function Home({ name }){
    
    const posts = useSWR("/posts/", fetcher, {
        refreshInterval: 10000,
    });
    
    const user = getUser();

    if(!user){
        return <div>Loading!</div>;
    }

    const profiles = useSWR("/user/?limit=5", fetcher);
    
    return(
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <Image 
                                src = {randomAvatar()}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            >
                            </Image>
                        </Col>
                        <Col
                            sm={10} className="flex-grow-1"
                        >
                            
                            <CreatePost refresh={posts.mutate}/>
                        </Col>
                    </Row>
                    <Row>
                        {posts.data?.results.map((post, index) => (
                            <Post key={index} post={post} refresh={posts.mutate}></Post>
                        ))}
                    </Row>
                </Col>
            </Row>    
        </Layout>
    );
}
export default Home;

