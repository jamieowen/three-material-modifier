import MaterialModifier from '../MaterialModifier';

import {
    MeshLambertMaterial,
    MeshDepthMaterial
} from 'three';

/*
Example showing use of the MaterialModifier.modify() function.
That returns a modified copy of the shader source and required uniforms.

It can then be used with an explicit class declaration extending from the
correct material.
*/

// Define this as an object here so we can pass the same to the MeshLambertMaterial
// and MeshDepthMaterial - as we want shadows to be cast correctly.
//
let modifyOptions = {

    uniforms: {
        time: { type: 'f', value: 0.0 }
    },

    vertexShader: {
        uniforms:`
        uniform float time;
        `,
        preTransform: `
        transformed += normal * sin( time );
        transformed.x += normal.x * cos( time );
        transformed.z += normal.z * sin( time );
        transformed.y += ( sin( time ) * 3.0 ) + 3.0;
        `
    }
}

let CustomLambertDepthMaterial = MaterialModifier.extend( MeshDepthMaterial, modifyOptions );
export { CustomLambertDepthMaterial };

let shaderConfig = MaterialModifier.modify( MeshLambertMaterial, modifyOptions );

let TYPE = 'CustomLambertMaterial';

export class CustomLambertMaterial extends MeshLambertMaterial{

    constructor( parameters ){

        super();

        this.uniforms = shaderConfig.uniforms;
        this.vertexShader = shaderConfig.vertexShader;
        this.fragmentShader = shaderConfig.fragmentShader;

        this.type = TYPE;

        this.setValues( parameters );

    }

    copy( source ){

        super.copy( source );

        this.uniforms = THREE.UniformsUtils.clone(source.uniforms);
        this.vertexShader = shaderConfig.vertexShader;
        this.fragmentShader = shaderConfig.fragmentShader;

        this.type = TYPE;

    }
}
