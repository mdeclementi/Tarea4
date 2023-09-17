import React, { useState, Fragment, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [error, setError] = useState(false);
    const [username, setUsername] = useState("john");
    const [password, setPassword] = useState("P4ssW0rd!#");

    const navigate = useNavigate();

    const apiUrl = 'https://three-points.herokuapp.com/api/login';

    const postData = {
        username,
        password
    };

    const onLoginComplete = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const data = await response.json();
                setError(false);
                localStorage.setItem('token', data.token);
                navigate("/");

            } else {
                setError(true);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/");
        } else {
            //console.log('no hay token');
        }

    }, []);

    return (
        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="https://gointernship.es/wp-content/uploads/2022/07/172146_172099_Logo3P_cuadrado_HQ.webp" alt="hyper" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Login</div>
                </div>

                {error ? <div className='bg-red-200 text-black-100 p-3 flex justify-content-between lg:justify-content-center align-items-center flex-wrap'>
                    Invalid email or password
                </div> : null}

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" type="text" placeholder="Email" className="w-full mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button label="Enviar" severity="info" icon="pi pi-user" className="w-full" onClick={onLoginComplete} />
                </div>
            </div>
        </div>
    )
}

export default Login;