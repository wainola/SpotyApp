import React, { Component } from 'react';
import ReactDom from 'react-dom';

// Importacion de componentes.
import ShowMusic from './components/show-music';

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">SpotyApp</h2>
                    <ShowMusic />
                </div>
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('div.container'));