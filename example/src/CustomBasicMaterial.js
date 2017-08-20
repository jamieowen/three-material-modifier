
import {
    MeshBasicMaterial
} from 'three';

import MaterialModifier from '../MaterialModifier';


let CustomBasicMaterial = MaterialModifier.extend( MeshBasicMaterial, {

    uniforms:{
        time: { value:0.0, type: 'f' }
    },

    vertexShader: {
        uniforms:`
        varying float yNormal;
        varying float xNormal;
        varying float zNormal;
        `,
        preTransform:`
        xNormal = normal.x;
        yNormal = normal.y;
        zNormal = normal.z;
        `
    },

    fragmentShader:{
        uniforms: `
        uniform float time;
        varying float xNormal;
        varying float yNormal;
        varying float zNormal;
        `,
        postFragColor: `
        float mult = 1.0;
        gl_FragColor.r = sin( time * mult ) * xNormal;
        gl_FragColor.g = cos( time * mult ) * yNormal;
        gl_FragColor.b = sin( time * mult ) * zNormal;
        `
    }

} );


export { CustomBasicMaterial }
