import React from "react";

function Home({ name }){
    return(
        <div>
            <h1>
                hello, {name}!
            </h1>
            <p>
                This is some text.
            </p>
        </div>
    );
}
export default Home;

