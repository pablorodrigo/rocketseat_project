import React, {useEffect, useState} from "react";

function DevForm({onSubmit}) {

    const [latitude, setLatitude] = useState(-3.062509);
    const [longitude, setLongitude] = useState(-60.042764);
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        return () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    const {latitude, longitude} = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                }, (err) => {
                    console.log(err);
                },
                {timeout: 3000},
            )
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        //receive datas
        await onSubmit(
            {
                github_username,
                techs,
                latitude,
                longitude
            });

        //clear component
        setGithubUsername('');
        setTechs("");

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Github User</label>
                <input name="github_username"
                       id="github_username"
                       required
                       value={github_username}
                       onChange={e => setGithubUsername(e.target.value)}/>
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologies</label>
                <input name="techs"
                       id="techs"
                       required
                       value={techs}
                       onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number"
                           name="latitude"
                           id="latitude"
                           required
                           value={latitude}
                           onChange={e => setLatitude(e.target.value)} //armazenar valor de um input no react
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number"
                           name="longitude"
                           id="longitude"
                           required
                           value={longitude}
                           onChange={e => setLongitude(e.target.value)} //armazenar valor de um input no react
                    />
                </div>

            </div>

            <button type="submit">Submit</button>

        </form>
    )

}

export default DevForm