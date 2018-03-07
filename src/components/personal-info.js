import React, { Component } from 'react';

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
        console.log("hide");
        console.log(this.state);
        this.setState({show_albums:false});
    }

    onInputSearch(e){
        console.log(e);
    }

    render(){

        //Processing the contents of the list
        let items = this.state.albumes.items.map((e) => <li key={e.album.id} className="list-group-item">
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
                        <div className="input-group">
                            <input className="form-control" type="text" onChange={event => this.onInputSearch(event.target.value)}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default PersonalInfo;