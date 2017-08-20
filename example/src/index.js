import { h, render } from 'preact';

import NavigationBar from './ui/NavigationBar'
import AceEditor from './ui/AceEditor';

class MaterialModifierExample{

    constructor(){

        console.log( 'CHOMP' );

        let navContainerStyle = {
            position: 'absolute',
            width: '60px', height: '100%',
            top: '0px', left: '0px',
            backgroundColor: 'rgb(11,32,42)'
        }

        let editorContainerStyle = {
            position: 'absolute',
            width: 'calc( 100% - 60px )', height: '100%',
            top: '0px', left: '60px'
        }

        render( (
            <section>

                <div id="navigation-container" style={ navContainerStyle }>
                    <div id="foo">
                        <span>Hello, world!</span>
                        <button onClick={ e => alert("hi!") }>Click Me</button>
                    </div>
                </div>

                <div id="editor-container" style={ editorContainerStyle }>
                    <AceEditor align="left"></AceEditor>
                    <AceEditor align="right"></AceEditor>
                </div>

            </section>

        ), document.body );


    }

}


window.onload = ()=>{

    window.app = new MaterialModifierExample();

}
