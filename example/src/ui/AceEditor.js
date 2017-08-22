
import { h, render, Component } from 'preact';

import {
    ShaderLib,
    ShaderChunk
} from 'three';


import ShaderUtils from './ShaderUtils';


export default class AceEditor extends Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

        this.editor = ace.edit( this.base );
        this.editor.setTheme("ace/theme/solarized_dark");
        this.editor.session.setMode("ace/mode/glsl");

        this.updateEditor();

    }

    componentDidUpdate(){

        this.updateEditor();

    }

    updateEditor(){

        let lib = this.props.showShaderLibKey;
        let shaderCode;

        console.log( 'SET LIB', lib );
        switch( this.props.shaderDisplayMode ){

            case 'vertex':
                shaderCode = ShaderLib[ lib ].vertexShader;
                break;

            case 'fragment':
                shaderCode = ShaderLib[ lib ].fragmentShader;
                break;

        }

        if( this.props.parseIncludes ){

            shaderCode = ShaderUtils.parseIncludes( shaderCode );

        }

        this.editor.setValue( shaderCode,-1 );

    }

	render( props,state ){

        let left = props.align === 'right' ? '50%' : '0%';

        let style = {
            position: 'absolute',
            left: left,
            top: '0px',
            width: '50%',
            height: '100%'
        }

        return (
            <section style={ style }>
            </section>
        )
	}

}
