import React, { Component } from 'react';
import _ from 'lodash';
import queryString from 'query-string';

class PersonalInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            albumes: props.albumes,
            personal: props.personal,
            user: '',
            show_albums: true
        }
        console.log(props);
    }

    hideAlbums(e){
        // console.log("hide");
        // console.log(this.state);
        this.setState({show_albums:false});
    }

    onInputSearch(e){
        if(e === ''){
            localStorage.removeItem('result_search');
        }
        else if (e !== ''){
            //console.log(e);
            let parser = queryString.parse(window.location.search);
            let token = parser.access_token;
            let url = `https://api.spotify.com/v1/search?q=${e}&type=artist`
            fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then(data => {
                //console.log(data);
                localStorage.setItem('result_search', JSON.stringify(data));
            })
            .catch(rejected => {
                window.location = 'http://localhost:3000';
            })
        }
    }

    render(){

        //Processing the contents of the list
        let items = this.props.albumes.items.map((e) => <li key={e.album.id} className="list-group-item">
            <div className="row">
                <div className="col-md-8">
                    <h4>{e.album.name}</h4>
                    <h5 className="text-muted">{e.album.artists[0].name}</h5>
                </div>
                <div className="col-md-4">
                    <img src={e.album.images[0].url} style={{width: '25%'}}/>
                </div>
            </div>
        </li>);

        let search_result = {};

        if(localStorage.getItem('result_search')){
            search_result = JSON.parse(localStorage.getItem('result_search'));
        }
        else{
            search_result = {data: false};
        }

        console.log('Search result es...');
        
        console.log(search_result);
        

        // controls the way that a functions is executed: after 300 ms
        const inputSearch = _.debounce((value) => { this.onInputSearch(value)}, 300);

        return(
            <div className="container">
                <h2 className="card-title" style={{background: 'grey'}}>Welcome {this.state.user[this.state.user.length-1]}</h2>
                <hr/>
                <button className="btn btn-warning" onClick={event => this.hideAlbums(event)}>Hide Albums!</button>
                { this.state.show_albums ?
                    <div>
                        <h3>Your first 20 albums are ...</h3>
                        <ol className="list-group">
                            {items}
                        </ol>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="input-group">
                                <input className="form-control" type="text" onChange={event => inputSearch(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default PersonalInfo;