
import {
    MeshStandardMaterial,
    MeshDepthMaterial
} from 'three';

import MaterialModifier from '../MaterialModifier';

// Deformer from : http://www.ozone3d.net/tutorials/mesh_deformer_p3.php
let functionDefs = `
vec4 doTwist( vec4 pos, float t )
{
    float st = sin(t);
    float ct = cos(t);
    vec4 new_pos;

    new_pos.x = pos.x*ct - pos.z*st;
    new_pos.z = pos.x*st + pos.z*ct;

    new_pos.y = pos.y;
    new_pos.w = pos.w;

    return( new_pos );
}
`

let uniformDefs = {
    time: { value:0.0, type: 'f' }
}

let CustomStandardMaterial = MaterialModifier.extend( MeshStandardMaterial, {

    uniforms: uniformDefs,

    vertexShader:{
        uniforms:`
            uniform float time;
        `,
        functions: functionDefs,
        preNormal: `
            float angle_deg_max = 180.0;
            float angle_deg = angle_deg_max*sin(time);
    	    float angle_rad = angle_deg * 3.14159 / 180.0;
            float height = 10.0;
            float ang = (height*0.5 + position.y)/height * angle_rad;
            objectNormal.xyz = doTwist( vec4( objectNormal, 0.0 ), ang ).xyz;
        `,
        preTransform: `
            transformed = doTwist( vec4( transformed, 1.0 ), ang ).xyz;
        `
    }

} );


let CustomStandardDepthMaterial = MaterialModifier.extend( MeshDepthMaterial, {

    uniforms: uniformDefs,

    vertexShader:{
        uniforms:`
            uniform float time;
        `,
        functions: functionDefs,
        preTransform: `
            float angle_deg_max = 180.0;
            float angle_deg = angle_deg_max*sin(time);
            float angle_rad = angle_deg * 3.14159 / 180.0;
            float height = 10.0;
            float ang = (height*0.5 + position.y)/height * angle_rad;
            transformed = doTwist( vec4( transformed, 1.0 ), ang ).xyz;
        `
    }

} );

export { CustomStandardMaterial, CustomStandardDepthMaterial }
