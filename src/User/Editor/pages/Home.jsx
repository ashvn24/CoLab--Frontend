import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPost } from "../../../Redux/Store/postSlice";
import PostCard from "../../../Components/User/PostCard";
import Loader from "../../../Components/User/Utils/Loader";
import Error from "../../../Components/User/Utils/Error";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.allPostData);

  useEffect(() => {
    dispatch(allPost());
  }, []);
  console.log("post", posts);
  return (
    <>
      {status === "Loading" ? (
        <Loader />
      ) : (
        <div className="flex flex-1">
          <div className="home-container">
            <div className="home-posts">
              <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts && posts.length > 0 ? (
                  posts.map((post, key) => {
                    return (
                      <li key={key}>
                        <PostCard post={post} />
                      </li>
                    );
                  })
                ) : (
                  <Error />
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
