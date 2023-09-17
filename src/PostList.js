import Post from "./Post";
import { faker } from '@faker-js/faker';
import React, { useState, useEffect, Fragment } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";


function PostList(props) {

    const [isLoading, setisLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [postsFiltrados, setPostsFiltrados] = useState([]);

    const navigate = useNavigate();

    const getPosts = async () => {
        const apiUrl = 'https://three-points.herokuapp.com/api/posts';
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                //console.log("Posts de API: ", data);
                const tempPosts = [];
                data.map((item) => {
                    const nuevoPost = { id: item.id, image: item.image, createdAt: item.createdAt.slice(0, 10), likes: item.likes, autor: item.author.name, texto: item.text, comments: item.comments.length };
                    tempPosts.push(nuevoPost);

                });
                //console.log("Posts Temp: ", tempPosts);
                setPosts(tempPosts);
                setPostsFiltrados(tempPosts);
            } else {
                localStorage.removeItem('token');
                navigate("/login");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            //console.log("Si hay token");
            setTimeout(() => {
                setisLoading(false);
            }, 3000);
            getPosts();

        } else {
            //console.log('no hay token');
            navigate("/login");
        }

    }, []);

    return (
        <Fragment>
            <NavBar></NavBar>
            <SearchBar posts={posts} setPostsFiltrados={setPostsFiltrados}></SearchBar>

            <div className="grid mt-2">
                {

                    isLoading ? <Fragment><div style={{ marginLeft: "2rem" }}>Loading...</div><div><ProgressSpinner /></div></Fragment> :

                        postsFiltrados.map((post) => {

                            return <Post
                                key={post.id}
                                id={post.id}
                                image={post.image}
                                createdAt={post.createdAt}
                                likes={post.likes}
                                autor={post.autor}
                                texto={post.texto}
                                comments={post.comments}
                            >
                            </Post>

                        })
                }

            </div>
        </Fragment>
    )
}

export default PostList;