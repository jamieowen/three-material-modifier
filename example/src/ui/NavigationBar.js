
import { h, render, Component } from 'preact';

import Button from 'preact-material-components/Button';

export default class NavigationBar extends Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

    }

	render( props,state ){

        let style = {
            position: 'absolute',
            left: '0px', top: '0px',
            width: '100%', height: '100%'
        }

        return (
            <nav style={ style }>

            </nav>
        )
	}

}
