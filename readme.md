
# Three Material Modifier.

Override the default Three.js materials quickly by specifying
vertex and fragment shader hooks.


```
import MaterialModifier from 'three-material-modifier';

let CustomStandardMaterial = MaterialModifier.extend( THREE.MeshStandardMaterial, {

        uniforms: {
            newUniform: {
                type: 'vec3',
                value: 0
            }
        },
        vertexShader: {
            preTransform: ''
        },
        fragmentShader: {
            postFragColor: ''
        }

    })

let mesh = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new CustomStandardMaterial( { color: 0x000000 } )    
)

scene.add( mesh );

```


If you want to define your own hooks to insert
