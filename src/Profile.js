import { faker } from '@faker-js/faker';
import { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

function Profile(props) {

    const navigate = useNavigate()

    const [profile, setprofile] = useState({
        avatar: "",
        username: "",
        bio: "",
    })

    const cerrarSesionHandler = (event) => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getProfile = async () => {
        const apiUrl = 'https://three-points.herokuapp.com/api/users/me';
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
                const {avatar, username, bio} = data;
                setprofile({avatar, username, bio});
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
            getProfile();
        } else {
            //console.log('no hay token');
            navigate("/login");
        }

    }, []);

    return (
        <Fragment>
            <NavBar></NavBar>
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
                <div className="grid">
                    <div className="col-12 md:col-12 mb-4 px-5">
                        <span className="p-3 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                            <img style={{ verticalAlign: "middle", width: "12rem", height: "12rem", borderRadius: "50%" }} src={profile.avatar} alt="" />
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">@{profile.username}</div>
                        <span className="text-700 line-height-3">{profile.bio}</span>
                    </div>
                </div>
                <Button label="Salir" icon="pi pi-sign-out" onClick={cerrarSesionHandler} />
            </div>
        </Fragment>

    )
}

export default Profile;