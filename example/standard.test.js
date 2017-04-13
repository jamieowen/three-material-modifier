
/**
const defaultOpts = {

    // add any additional uniforms in the usual THREE.ShaderMaterial way.
    uniforms: {

    },

    // vertex shader snippets.
    vertexShader: {

        uniforms:'',
        functions:'',
        preTransform:'',
        postTransform:''

    },

    // fragment shader snippets.
    fragmentShader: {

        uniforms:'',
        functions:'',
        preFragColor:'',
        postFragColor:''

    }

}


 */

let MyNewMaterial = MaterialModifier.modify( THREE.ShaderLib.standard, {

    vertex: {
        uniforms: {

        }
        hooks: {

        }
    },
    fragment: {
        header: {

        },
        functions: {

        },
        replace: {
            '/uniform'
        }
    }

} )

let newMaterial = new MyNewMaterial( params )
