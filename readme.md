
# Three.js Material Modifier

Extend or modify three.js materials easily existing THREE.ShaderLib code to return vertex and fragment shader code.

Existing three.js shader code is modified directly from the THREE.ShaderLib code at runtime.

Works with either :

- MeshBasicMaterial *('basic')*
- MeshLambertMaterial *('lambert')*
- MeshPhongMaterial *('phong')*
- MeshStandardMaterial *('standard')*
- MeshDepthMaterial *('depth')*


### MaterialModifier.extend( classOrString, shaderConfig )
Specify either the three.js material class or a string and supply a shader config object.  The function returns a usable material class that can be instantiated with
parameters as a standard three.js material.

```
import MaterialModifier from 'three-material-modifier';
import {
	Mesh,
	MeshStandardMaterial,
	BoxBufferGeometry
} from 'three';

let CustomStandardMaterial = MaterialModifier.extend( MeshStandardMaterial, {
	uniforms: {
		time: { type: 'f', value: 0.0 }
	},
    
	vertexShader: {
		preNormal: `
			objectNormal = normalize( objectNormal );
		`,
		preTransform: `
    		transformed.x = sin( time );
    	`
	},
	fragmentShader: {
		postFragColor: `
			gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );
		`
	}

});

let mesh = new Mesh(
    new BoxBufferGeometry(),
    new CustomStandardMaterial( { color: 0x000000 } )    
)

scene.add( mesh );

```

### MaterialModifier.modify( classOrString, shaderConfig )
Specify either the three.js material class or a string and supply a shader config object.  The function returns an object that contains the modified vertex and fragment shaders and a uniforms object.

```
{
	vertexShader: "modified vertex code..",
	fragmentShader: "modified vertex code..",
	uniforms: { 
		/** All base uniforms and custom uniforms included here **/
	}
}
```





## Customising MaterialModifier

Under the hood, the MaterialModifier is modifying existing THREE.ShaderLib using regexp.
When instantiating a custom MaterialModifier instance a config object can be supplied with
'insertbefore:' and 'insertafter:' statements.  These lines are followed by the actual code found in the three.js ShaderLib for which additions should be inserted.  This makes it possible to define additional hooks if needed.

```

import { MaterialModifier } from 'three-material-modifier'

let modifierConfig = {

    vertexHooks: {

        uniforms: 'insertbefore:#include <common>\n',
        functions: 'insertafter:#include <clipping_planes_pars_vertex>\n',
        preTransform: 'insertafter:#include <begin_vertex>\n',
        postTransform: 'insertafter:#include <project_vertex>\n',
        preNormal: 'insertafter:#include <beginnormal_vertex>\n'

    },

    fragmentHooks: {

        uniforms: 'insertbefore:#include <common>\n',
        functions: 'insertafter:#include <clipping_planes_pars_fragment>\n',
        preFragColor: 'insertbefore:gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n',
        postFragColor: 'insertafter:gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n'

    }

}

let customMaterialModifier = new MaterialModifier( modifierConfig );

// customMaterialModifier.extend( etc );
// customMaterialModifier.modify( etc );


```

The default MaterialModifier instance can also be modified to include new hooks by passing in the same hook definition syntax to the two define functions - *MaterialModifier.defineFragmentHooks()* and *MaterialModifier.defineVertexHooks()*:

```

MaterialModifier.defineVertexHooks({
	declarations: 'insertafter:#include <clipping_planes_pars_vertex>\n'
});

// This would then give an additional property to modify in the shader config :

let CustomMaterial = MaterialModifier.extend( MeshBasicMaterial, {
	vertexShader: {
		declarations: `
			mat4 rotationMatrix(vec3 axis, float angle) {
			    axis = normalize(axis);
			    float s = sin(angle);
			    float c = cos(angle);
			    float oc = 1.0 - c;
			    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
			                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
			                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
			                0.0,                                0.0,                                0.0,                                1.0
			            );
			}
		`
	}	
}


```
