
import { h, render, Component } from 'preact';

export default class AceEditor extends Component{

    constructor(props){

        super(props);

    }

    componentDidMount(){

        var editor = ace.edit( this.base );
        editor.setTheme("ace/theme/solarized_dark");
        editor.session.setMode("ace/mode/glsl");


        console.log( editor );

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
