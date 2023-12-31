import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/user.actions";
import { randomAvatar }from "../../utils.js";
function ProfileDetails(props) {
    const { user } = props;
    // console.log(user);

    const navigate = useNavigate();
    
    if (!user) {

        return <div>Loading..</div>;
    }
    // console.log(user.name);

    return (
        // UI code
        <div>
            <div className="d-flex flex-row border-bottom p-5">
                <Image
                    alt="User avatar"
                    src={randomAvatar()}
                    roundedCircle
                    width={120}
                    height={120}
                    className="me-5 border border-primary border-2"
                    />
                
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                    <p className="fs-2 m-0">@{user.username}</p>
                    
                    <p className="fs-6">{user.bio ? user.bio: "(No bio.)"}</p>
                    
                    <p className="fs-6">
                        <small>{user.posts_count} posts</small>
                    
                    </p>
                    
                    {user.id === getUser().id && (
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-25"
                        onClick={()=>navigate(`/profile/${user.id}/edit/`)}
                    >
                        Edit
                    </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
