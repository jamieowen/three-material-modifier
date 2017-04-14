import MaterialModifier from '../MaterialModifier';

import {
    MeshStandardMaterial,
    MeshDepthMaterial
} from 'three';

/*
Example showing use of the MaterialModifier.modify() function.
That returns a modified copy of the shader source and required uniforms.

It can then be used with an explicit class declaration extending from the
correct material.
*/

// Define this as an object here so we can pass the same to the MeshStandardMaterial
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

let CustomStandardDepthMaterial = MaterialModifier.extend( MeshDepthMaterial, modifyOptions );
export { CustomStandardDepthMaterial };

let shaderConfig = MaterialModifier.modify( MeshStandardMaterial, modifyOptions );

let TYPE = 'CustomStandardMaterial';

export class CustomStandardMaterial extends MeshStandardMaterial{

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
