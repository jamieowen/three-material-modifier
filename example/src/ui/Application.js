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
            selectedShaderLib: 'basic'
        }

    }

    componentDidMount(){

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
                        onShaderMenuSelect={ (shader)=>this.setState( { selectedShaderLib:shader } ) }
                        shaderMenuItems={ shaderKeys }>
                    </NavigationTop>
                </div>

                <div id="editor-container" style={ editorContainerStyle }>
                    <AceEditor selectedShaderLib={ this.state.selectedShaderLib } align="left" ></AceEditor>
                    <AceEditor selectedShaderLib={ this.state.selectedShaderLib } parseIncludes={true} align="right" ></AceEditor>
                </div>

            </section>
        )

	}

    onShaderMenuSelect( e ){


    }

}
