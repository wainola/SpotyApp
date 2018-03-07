import React, { Component} from 'react';
import queryString from 'query-string';
import PersonalInfo from './personal-info';

class ShowMusic extends Component {
    constructor(props){
        super(props);
        // Seting state to false on login in case where are not login
        this.state = { 
            login: false,
            data_api: undefined,
            albumes: undefined
         };
    }
    componentDidMount(){
        let parser = queryString.parse(window.location.search);
        let access_token = parser.access_token;
        if(!access_token){
            return;
        }
        
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
        .then((response) => response.json())
        .then(data => {
            //console.log(data)
            this.state.data_api = data;
            localStorage.setItem('data', JSON.stringify(this.state.data_api));
        });

        fetch('https://api.spotify.com/v1/me/albums', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
        .then((response) => response.json())
        .then(data => {
            //console.log(data);
            this.state.albumes = data;
            localStorage.setItem('albumes', JSON.stringify(this.state.albumes));
        });
        this.setState({login: true});
    }

    render(){
        //console.log(this.state.data_api);
        return(
            <div className="container content-justify-center">
                {/* example of conditional rendering */}
                { this.state.login ?
                    <div>
                        <PersonalInfo 
                        albumes={JSON.parse(localStorage.getItem('albumes'))}
                        personal={JSON.parse(localStorage.getItem('data'))}
                        />
                    </div>
                     :
                     <div>
                         <button className='btn btn-success' onClick={event => this.onLogin()}> Login with your Spotify Account! </button>
                         <br/>
                     </div>
                }
            </div>
        );
    }
    onLogin(){
        // Redirects for login purposes with Spoty Account
        window.location = 'http://localhost:8888/login';
    }
}

export default ShowMusic;