import { h, render, Component } from 'preact';

import NavigationTop from './NavigationTop'
import NavigationLeft from './NavigationLeft'
import AceEditor from './AceEditor';

import {
    ShaderLib,
    ShaderChunk,
    WebGLRenderer
} from 'three';


export default class Application extends Component{

    constructor(props){

        super(props);

        this.state = {

            selectedShaderIndex: 0,
            shaderKeys: Object.keys( ShaderLib ),
            shaderLabels: Object.keys( ShaderLib ).map( ( key )=>{ return key.charAt(0).toUpperCase() + key.slice(1) + 'Material' } ),
            shaderDisplayMode: 'vertex'

        }

        console.log( "START : ", this.getShaderLibKey() );
    }

    componentDidMount(){

        window.addEventListener( 'scroll', ( ev )=>{

            console.log( 'SCROLL' );
            ev.preventDefault();

        })
    }

    getShaderLibKey(){

        return this.state.shaderKeys[ this.state.selectedShaderIndex ];
    }

	render( props,state ){

        let navTopStyle = {
            position: 'absolute',
            width: '100%', height: '60px',
            top: '0px', left: '0px',
            backgroundColor: 'rgb(31,52,62)',
            zIndex: 3
        }


        let editorContainerStyle = {
            position: 'absolute',
            width: '100%', height:'calc( 100% - 60px )',
            top: '60px', left: '0px',
            zIndex: 1
        }

        let shaderKeys = Object.keys( ShaderLib );

        return (
            <section>

                <div id="navigation-top" style={ navTopStyle }>
                    <NavigationTop
                        shaderLabels={ this.state.shaderLabels }
                        selectedShaderIndex={ this.state.selectedShaderIndex }
                        onChange={ (s)=>{ this.onNavTopChange(s) } }>
                    </NavigationTop>
                </div>

                <div id="editor-container" style={ editorContainerStyle }>
                    <AceEditor
                        showShaderLibKey={ this.getShaderLibKey() }
                        shaderDisplayMode={ this.state.shaderDisplayMode }
                        align="left" >
                    </AceEditor>
                    <AceEditor
                        showShaderLibKey={ this.getShaderLibKey() }
                        shaderDisplayMode={ this.state.shaderDisplayMode }
                        parseIncludes={true}
                        align="right" >
                    </AceEditor>
                </div>

            </section>
        )

	}

    onNavTopChange( state ){

        console.log( 'NAV TOP CHANGE', state );

        this.setState( state );

    }
}
