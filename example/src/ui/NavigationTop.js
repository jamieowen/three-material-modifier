
import { h, render, Component } from 'preact';

import {
    ShaderLib
} from 'three';

import Menu from 'preact-material-components/Menu';
import Button from 'preact-material-components/Button';
import Select from 'preact-material-components/Select';

import Icon from 'preact-material-components/Icon';
import IconToggle from 'preact-material-components/IconToggle';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';

import Radio from 'preact-material-components/Radio';
import FormField from 'preact-material-components/FormField';

export default class NavigationTop extends Component{

    constructor(props){

        super(props);

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
            return <Select.Item id={label}>{label}</Select.Item>
        })

        // <IconToggle style={ iconStyle }>gradient</IconToggle>
        //                <Icon style={ iconStyle } onClick={ (e)=>{ console.log( this.drawer ); this.drawer.MDComponent.open = true; } }>gradient</Icon>


        return (
            <nav style={ style }>

                <Select onChange={ (e)=>this.onShaderSelect(e) } selectedIndex={this.props.selectedShaderIndex } ref={presel=>{this.presel = presel;}}  hintText="Select an option">
                    { linkElements }
                </Select>

                <FormField onChange={ (e)=>{ this.onRadioSelect(e) } } >

                    <Radio id="vertex" name='opts'></Radio>
                    <label>Vertex</label>

                    <Radio id="fragment" name='opts'></Radio>
                    <label>Fragment</label>

                </FormField>


            </nav>
        )
	}

    onShaderSelect( e ){

        if( this.props.onChange ){

            this.props.onChange( {
                selectedShaderIndex: e.selectedIndex
            } );
        }

    }

    onRadioSelect( ev ){

        if( this.props.onChange ){

            this.props.onChange( {
                shaderDisplayMode: ev.target.id
            } );

        }

    }

}
