import React, { useContext } from "react";
import { format } from "timeago.js";
import {
    LikeFilled,
    CommentOutlined,
    LikeOutlined,
} from "@ant-design/icons";

import { Image, Card, Dropdown} from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Link } from "react-router-dom";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import MoreToggleIcon from "../MoreToogleIcon";
import { Context } from "../Layout";


function Post(props){
    const { post, refresh, isSinglePost } = props;
    const { setToaster } = useContext(Context);
    const user = getUser();

    const handleLikeClick = async (action) => {
        axiosService
            .post(`/post/${post.id}/${action}/`)
            .then( ()=> {
                refresh();
            })
            .catch( (err) => console.error(err));
    };

    const handleDelete = () =>{
        axiosService
            .delete(`/post/${post.id}/`)
            .then( ()=> {
                setToaster({
                    type: "Warning",
                    message: "Post Deleted!",
                    show: true,
                    title: "Post Deleted",
                });
                refresh();
            })
            .catch((err) => {
                console.error(err);
                setToaster({
                    type: "danger",
                    message: "Something went wrong!",
                    show: true,
                    title: "Post Failed",
                });
            });
    }
    return(
        <>
            <Card className="rounded-3 my-4">
                <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between">
                        {user.name === post.author.name && (
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle as={MoreToggleIcon}>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* <Dropdown.Item>Update</Dropdown.Item> */}
                                        <UpdatePost post={post}
                                                    refresh={refresh}/>

                                        <Dropdown.Item onClick={handleDelete} className="text-danger">Delete</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                        
                        <div className="d-flex flex-row">
                            <Image 
                                src={post.author.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="me-2 border border-primary border-2"
                            >
                            </Image>

                            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                                <p className="fs-6 m-0">
                                    {post.author.name}
                                </p>
                                <p className="fs-6 fw-lighter">
                                    <small>{format(post.created)}</small>
                                </p>
                            </div>
                        </div>
                    </Card.Title>

                    <Card.Text>
                        {post.body}
                    </Card.Text>
                    <div className="d-flex flex-row">
                        <LikeFilled
                            style={{
                                color: "#fff",
                                backgroundColor: "#ff0000",
                                borderRadius: "50%",
                                width: "32px",
                                height: "32px",
                                fontSize: "75%",
                                padding: "2px",
                                margin: "3px",
                            }}
                        >
                        </LikeFilled>

                        <p className="ms-1 fs-6">
                            <small>{post.likes_count} like</small>
                        </p>
                    </div>

                    {!isSinglePost && (
                        <p className="ms-1 fs-6">
                            <small>
                                <Link to={`/post/${post.id}/`}>
                                    {post.comments_count} comments
                                </Link>
                            </small>
                        </p>
                    )}
                </Card.Body>

                <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                        <div className="d-flex flex-row">
                            <LikeOutlined 
                                style={{
                                    width: "24px",
                                    height:"24px",
                                    padding: "2px",
                                    fontSize: "20px",
                                    color: post.liked ? "#0D6EFD": "#C4C4C4",
                                }}
                                onClick= { () => {
                                    if(post.liked){
                                        handleLikeClick("unlike");
                                    }else{
                                        handleLikeClick("like");
                                    }
                                }}
                            >
                            </LikeOutlined>
                            <p className="ms-1">
                                <small>Like</small>
                            </p>
                        </div>
                        {/* comment icon */}
                        {!isSinglePost && (
                            <div className="d-flex flex-row">
                                    <CommentOutlined style={{
                                        width:"24px",
                                        height:"24px",
                                        padding: "2px",
                                        fontSize: "20px",
                                        color: "#C4C4C4",
                                    }}>
                                    </CommentOutlined>

                                    <p className="ms-1 mb-0">
                                        <small>Comment</small>
                                    </p>
                            </div>
                        )}    
                </Card.Footer>
            </Card>
            {/* <Toaster title="POST!" message="Post Deleted" type="danger" showToast={showToast} onClick={
                ()=> setShowToast(false)
            }>
            </Toaster> */}
        </>
    );
};

export default Post;