import { h, render } from 'preact';

class MaterialModifierExample{

    constructor(){

        console.log( 'CHOMP' );

        render((
        	<div id="foo">
        		<span>Hello, world!</span>
        		<button onClick={ e => alert("hi!") }>Click Me</button>
        	</div>
        ), document.body );


    }

}

window.onload = ()=>{

    window.app = new MaterialModifierExample();

}
