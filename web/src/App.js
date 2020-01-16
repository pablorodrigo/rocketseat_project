import React, {useEffect, useState} from 'react';import api from './services/api'import './global.css'import './App.css'import './Sidebar.css'import './Main.css'// 3 basics concept// Components : A function that returns HTML contentL / Isolated block of html, css and js, which does not interfere with the rest of the application// Property: Information that a "parent's" component passes to the "child" component// State:  Information held by components (immutability)// React uses the concept of immutability (will never change the data, but will create a new one from the previous one)function App() {    /* let [counter, setCounter] = useState(0);     function incrementCounter() {         //alert("hello")         setCounter(counter + 1);     }*/    const [devs, setDevs] = useState([]);    const [latitude, setLatitude] = useState(-3.062509);    const [longitude, setLongitude] = useState(-60.042764);    const [github_username, setGithubUsername] = useState('');    const [techs, setTechs] = useState('');    useEffect(() => {        return () => {            navigator.geolocation.getCurrentPosition(                (position) => {                    console.log(position);                    const {latitude, longitude} = position.coords;                    setLatitude(latitude);                    setLongitude(longitude);                }, (err) => {                    console.log(err);                },                {timeout: 3000},            )        };    }, []);    useEffect(() => {        async function loadDevs() {            const response = await api.get('/devs');            setDevs(response.data);        }        loadDevs();    }, []);    async function handleSubmitDev(e) {        e.preventDefault();        const response = await api.post('/devs',            {                github_username,                techs,                latitude,                longitude            });        //console.log(response.data);        setGithubUsername('');        setTechs("");        //add new value in the final of array (update)        setDevs([...devs, response.data]);    }    return (        /* <>             <Header title="Header"/>             <h1>Count: {counter}</h1>             <button onClick={incrementCounter}>Increment</button>         </>*/        <div id="app">            <aside>                <strong>Register</strong>                <form onSubmit={handleSubmitDev}>                    <div className="input-block">                        <label htmlFor="github_username">Github User</label>                        <input name="github_username"                               id="github_username"                               required                               value={github_username}                               onChange={e => setGithubUsername(e.target.value)}/>                    </div>                    <div className="input-block">                        <label htmlFor="techs">Tecnologies</label>                        <input name="techs"                               id="techs"                               required                               value={techs}                               onChange={e => setTechs(e.target.value)}                        />                    </div>                    <div className="input-group">                        <div className="input-block">                            <label htmlFor="latitude">Latitude</label>                            <input type="number"                                   name="latitude"                                   id="latitude"                                   required                                   value={latitude}                                   onChange={e => setLatitude(e.target.value)} //armazenar valor de um input no react                            />                        </div>                        <div className="input-block">                            <label htmlFor="longitude">Longitude</label>                            <input type="number"                                   name="longitude"                                   id="longitude"                                   required                                   value={longitude}                                   onChange={e => setLongitude(e.target.value)} //armazenar valor de um input no react                            />                        </div>                    </div>                    <button type="submit">Submit</button>                </form>            </aside>            <main>                <ul>                    {devs.map(dev => (                        //property                        <li key={dev._id}                            className="dev-item">                            <header>                                <img src={dev.avatar_url}                                     alt={dev.name}/>                                <div className="user-info">                                    <strong>{dev.name}</strong>                                    <span>{dev.techs.join(', ')}</span>                                </div>                            </header>                            <p>{dev.bio}                            </p>                            <a href={`https://www.linkedin.com/in/${dev.github_username}`}>Perfil</a>                        </li>                    ))}                    <li className="dev-item">                        <header>                            <img src="https://avatars3.githubusercontent.com/u/6105149?s=460&v=4"                                 alt="Pablo Silva"/>                            <div className="user-info">                                <strong>Pablo Silva</strong>                                <span>ReacJS, Native, NodeJS</span>                            </div>                        </header>                        <p>Hello! I’m Pablo Rodrigo. Developer expert in back-end who uses frameworks for cost reduction                            and time-to-market. Experienced in project management, customer relations and all stages of                            development cycle for web and mobile projects. I am also well-versed in numerous programming                            languages such as Java, Kotlin, Android SDK, SQ                        </p>                        <a href="https://www.linkedin.com/in/pablo-silva-rodrigo/">Perfil</a>                    </li>                </ul>            </main>        </div>    );}export default App;