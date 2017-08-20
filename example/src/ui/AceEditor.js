
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

        let lib = this.props.selectedShaderLib;
        let text = ShaderLib[ lib ].vertexShader;

        if( this.props.parseIncludes ){

            text = ShaderUtils.parseIncludes( text );

        }

        this.editor.setValue( text );

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
