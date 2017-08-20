
import { h, render, Component } from 'preact';

import Button from 'preact-material-components/Button';

import Icon from 'preact-material-components/Icon';
import IconToggle from 'preact-material-components/IconToggle';

export default class NavigationLeft extends Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

    }

	render( props,state ){

        let style = {
            position: 'absolute',
            overflow: 'hidden',
            left: '0px', top: '0px',
            width: '100%', height: '100%',
            fill: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }

        let menuStyle = {
            position: 'fixed',
            display:'block',
            top: '20px',
            left: '20px',
            zIndex: 100,
            backgroundColor: 'rgba(2,2,2,0.7)',
        }

        let itemStyle = {
            color: 'white'
        }

        let iconStyle = {
            color: 'rgba(1,1,1,0.4)',
            cursor: 'pointer'
        }

        // <div>vertex / fragment</div>
        return (
            <nav style={ style }>

                <IconToggle style={ iconStyle }>grid_on</IconToggle>

                <IconToggle style={ iconStyle }>gradient</IconToggle>


            </nav>
        )
	}

}
