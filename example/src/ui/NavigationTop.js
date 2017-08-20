
import { h, render, Component } from 'preact';

import {
    ShaderLib
} from 'three';

import Menu from 'preact-material-components/Menu';
import Button from 'preact-material-components/Button';

import Icon from 'preact-material-components/Icon';
import IconToggle from 'preact-material-components/IconToggle';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';

export default class NavigationTop extends Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

    }

	render( props,state ){

        let style = {
            position: 'absolute',
            //overflow: 'hidden',
            left: '0px', top: '0px',
            width: '100%', height: '100%',
            fill: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '22px'
        }

        let menuStyle = {
            //position: 'fixed',
            //display:'block',
            //top: '20px',
            //left: '20px',
            //zIndex: 100,
            backgroundColor: 'rgba(2,2,2,0.7)',
        }

        let itemStyle = {
            color: 'white'
        }

        let iconStyle = {
            color: 'rgba(1,1,1,0.4)',
            cursor: 'pointer'
        }

        let menuItems = Object.keys( ShaderLib );

        let linkElements = menuItems.map( ( label )=>{

            //return <Menu.Item style={ itemStyle }>{label}</Menu.Item>

            return (
                <List.LinkItem id={label} onClick={ (e)=>{ this.props.onShaderMenuSelect( e.target.id ); } }>
                    <List.ItemIcon>home</List.ItemIcon>
                    {label}
                </List.LinkItem>
            )

        })
        return (
            <nav style={ style }>

                <Icon style={ iconStyle } onClick={ (e)=>{ console.log( this.drawer ); this.drawer.MDComponent.open = true; } }>gradient</Icon>

                <IconToggle style={ iconStyle }>gradient</IconToggle>

                <Drawer.TemporaryDrawer ref={ (drawer)=>{ this.drawer = drawer; } } >

                    <Drawer.TemporaryDrawerHeader className="mdc-theme--primary-bg">
                    Components
                    </Drawer.TemporaryDrawerHeader>
                    <Drawer.TemporaryDrawerContent>
                    <List>
                    { linkElements }
                    </List>
                    </Drawer.TemporaryDrawerContent>
                </Drawer.TemporaryDrawer>

            </nav>
        )
	}

}
