import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Post(props) {

    const navigate = useNavigate()

    const [likes, setLikes] = useState(props.likes);
    const [likesDisabled, setLikesDisabled] = useState(false);

    const header = (
        <img alt="URL de la img ya no esta activa" src={props.image} />
    );

    const aumentarLikes = async () => {
        const apiUrl = `https://three-points.herokuapp.com/api/posts/${props.id}/like`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                setLikes(likes + 1);
                setLikesDisabled(true);
            } else {
                //localStorage.removeItem('token');
                //navigate("/login");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="col-12 md:col-4 lg:col-4">
            <div className="card flex justify-content-center">
                <Card header={header} className="w-20rem">
                    <div className="grid mt-2">
                        <div className="col-12">
                            <div className="postTimeStamp p-card-subtitle">{props.createdAt}</div>
                            <div className="postLikes"><Button label={likes + "k"} icon="pi pi-heart" severity="danger" size="small" onClick={aumentarLikes} disabled={likesDisabled} /></div>
                        </div>
                        <div className="col-12">
                            <strong>@{props.autor}</strong>
                        </div>
                        <div className="col-12">
                            <p className="p-card-content">{props.texto}</p>
                        </div>
                        <div className="col-12">
                            <Button type="button" label="Comments" icon="pi pi-comments" rounded text badge={props.comments} severity="secondary" badgeClassName="p-badge-info" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>

    )
}

export default Post;