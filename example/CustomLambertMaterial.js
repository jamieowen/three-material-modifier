import MaterialModifier from '../MaterialModifier';

import {
    MeshLambertMaterial
} from 'three';

let shaderConfig = MaterialModifier.modify( MeshLambertMaterial, {

    vertexShader: {

    },
    fragmentShader: {
        postFragColor: `
            gl_FragColor = vec4( 0.0,1.0,0.0,1.0 );
        `
    }

})

let TYPE = 'CustomLambertMaterial';

export default class CustomLambertMaterial extends MeshLambertMaterial{

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


console.log( shaderConfig );
