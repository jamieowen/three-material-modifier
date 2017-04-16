
import {
    MeshPhongMaterial,
    MeshDepthMaterial
} from 'three';

import noise from './noise.glsl';
import MaterialModifier from '../MaterialModifier';

// Deformer from : http://www.ozone3d.net/tutorials/mesh_deformer_p3.php

let uniformDefs = {
    time: { value:0.0, type: 'f' }
}

let CustomPhongMaterial = MaterialModifier.extend( MeshPhongMaterial, {

    uniforms: uniformDefs,

    vertexShader:{
        uniforms:`
            uniform float time;
        `,
        functions: noise,
        preNormal: `
            float theta = 0.000001;
            float radius = 3.0;

            // Need to work this out - calculating normals for sphere deform.

            // pos x (1,0,0) could be 0, so add pos x (0,1,0).
            vec3 vecTangent = normalize(cross(position, vec3(1.0, 0.0, 0.0))
              + cross(position, vec3(0.0, 1.0, 0.0)));

            // vecTangent is orthonormal to tePosition, compute bitangent
            // (rotate tangent 90° around tePosition)
            vec3 vecBitangent = normalize(cross(vecTangent, position));

            vec3 ptTangentSample = cnoise(position + theta * normalize(vecTangent)) * objectNormal.xyz;
            vec3 ptBitangentSample = cnoise(position + theta * normalize(vecBitangent)) * objectNormal.xyz;

            vec3 vecNorm = normalize(
              cross(ptTangentSample - position, ptBitangentSample - position));

            float displace = cnoise( position + time * 0.4 );
            //float displace = cnoise( position );

            //objectNormal = vecNorm;
            //objectNormal.xyz *= cnoise( objectNormal + time * 0.4 );
        `,
        preTransform: `
            transformed += normal * displace;
        `
    }

} );


let CustomPhongDepthMaterial = MaterialModifier.extend( MeshDepthMaterial, {

    uniforms: uniformDefs,

    vertexShader:{
        uniforms:`
            uniform float time;
        `,
        functions: noise,
        preTransform: `
            float displace = cnoise( position + time * 0.4 );
            transformed += normal * displace;
        `
    }

} );

export { CustomPhongMaterial, CustomPhongDepthMaterial }
