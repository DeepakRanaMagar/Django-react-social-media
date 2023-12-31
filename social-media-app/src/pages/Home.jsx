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
    
    const { data: posts, mutate: mutatePosts } = useSWR("/api/post/",fetcher,{
        refreshInterval:10000,
    });
    console.log(posts);
    // console.log(mutatePosts);
    
    const {data: profiles }= useSWR("/api/user/?limit=5", fetcher);
    
    const user = getUser();

    if(!user){
        return <div>Loading...</div>;
    }


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
                            <CreatePost refresh={mutatePosts}/>
                        </Col>
                    </Row>

                    {/* Post display */}
                    <Row>
                        {posts?.map((post, index) => (
                            <Post key={index} post={post} refresh={mutatePosts}></Post>
                        )) || []}
                    </Row>
                </Col>

                {/* ProfileCard display suggestions */}
                <Col className="border rounded py-4 h-50" sm={3}>
                    <h4 className="font-weight-bold text-center">
                        People you may know
                    </h4>
                    <div className="d-flex flex-column">
                        {profiles?.results.map((profile, index)=>(
                            <ProfileCard key={index} user={profile}></ProfileCard>
                        ))}
                    </div>
                </Col>
            </Row>    
        </Layout>
    );
}
export default Home;

