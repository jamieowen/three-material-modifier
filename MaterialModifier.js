
import {
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    MeshDepthMaterial,
    ShaderLib
} from 'three';

import defaultHooks from './defaultHooks';
import compileMaterialClass from './compileMaterialClass';

const modifySource = ( source, hookDefs, hooks )=>{

    let match;

    for( let key in hookDefs ){

        if( hooks[key] ){

            match = /insert(before):(.*)|insert(after):(.*)|replace:(.*)/.exec( hookDefs[key] );
            
            if( match ){
                if( match[1] ){ // before
                    source = source.replace( match[2], hooks[key] + '\n' + match[2] );
                }else
                if( match[3] ){ // after
                    source = source.replace( match[4], match[4] + '\n' + hooks[key] );
                }else
                if( match[5] ){ // replace
                    source = source.replace( match[5], hooks[key] );
                }
            }

        }
    }

    return source;

}

let shaderMap = null;
const getShaderDef = ( classOrString )=>{

    if( !shaderMap ){

        let classes = {
            standard: MeshStandardMaterial,
            basic: MeshBasicMaterial,
            lambert: MeshLambertMaterial,
            phong: MeshPhongMaterial,
            depth: MeshDepthMaterial
        }

        shaderMap = {};

        for( let key in classes ){

            shaderMap[ key ] = {
                ShaderClass: classes[ key ],
                ShaderLib: ShaderLib[ key ],
                Key: key,
                Count: 0,
                ModifiedName: function(){
                    return `ModifiedMesh${ this.Key[0].toUpperCase() + this.Key.slice(1) }Material_${ ++this.Count }`;
                },
                TypeCheck: `isMesh${ key[0].toUpperCase() + key.slice(1) }Material`

            }

        }
    }

    let shaderDef;

    if( typeof classOrString === 'function' ){
        for( let key in shaderMap ){
            if( shaderMap[ key ].ShaderClass === classOrString ){
                shaderDef = shaderMap[ key ];
                break;
            }
        }
    }else{
        shaderDef = shaderMap[ classOrString ];
    }

    if( !shaderDef ){
        throw new Error( 'No Shader found to modify...' );
    }

    return shaderDef;

}


/**
 * The main Material Modofier
 */
class MaterialModifier{

    constructor( vertexHookDefs, fragmentHookDefs ){

        this._vertexHooks = {};
        this._fragmentHooks = {};

        if( vertexHookDefs ){
            this.defineVertexHooks( vertexHookDefs );
        }

        if( fragmentHookDefs ){
            this.defineFragmentHooks( fragmentHookDefs );
        }

    }

    modify( shader, opts ){

        const def = getShaderDef( shader );

        const vertexHooks = Object.assign( {}, this._vertexHooks, opts.vertexHooks );
        const vertexShader = modifySource( def.ShaderLib.vertexShader, vertexHooks, opts.vertexShader || {} );
        
        const fragmentHooks = Object.assign( {}, this._fragmentHooks, opts.fragmentHooks );
        const fragmentShader = modifySource( def.ShaderLib.fragmentShader, fragmentHooks, opts.fragmentShader || {} );

        const uniforms = Object.assign( {}, def.ShaderLib.uniforms, opts.uniforms || {} );

        return { vertexShader,fragmentShader,uniforms };

    }

    extend( shader, opts ){

        const def = getShaderDef( shader ); // ADJUST THIS SHADER DEF - ONLY DEFINE ONCE - AND STORE A USE COUNT ON EXTENDED VERSIONS.

        const vertexHooks = Object.assign( {}, this._vertexHooks, opts.vertexHooks );
        let vertexShader = modifySource( def.ShaderLib.vertexShader, vertexHooks, opts.vertexShader || {} );

        const fragmentHooks = Object.assign( {}, this._fragmentHooks, opts.fragmentHooks );
        let fragmentShader = modifySource( def.ShaderLib.fragmentShader, fragmentHooks, opts.fragmentShader || {} );
        
        if( opts.postModifyVertexShader ){
            vertexShader = opts.postModifyVertexShader( vertexShader );
        }
        if( opts.postModifyFragmentShader ){
            fragmentShader = opts.postModifyFragmentShader( fragmentShader );
        }

        return compileMaterialClass( {

            extend: def.ShaderClass,
            className: opts.className || def.ModifiedName(),
            typeCheck: def.TypeCheck,
            uniforms: Object.assign( {}, def.ShaderLib.uniforms, opts.uniforms || {} ),
            vertexShader: vertexShader,
            fragmentShader: fragmentShader

        });

    }

    defineVertexHooks( defs ){

        for( let key in defs ){
            this._vertexHooks[ key ] = defs[key];
        }

    }

    defineFragmentHooks( defs ){

        for( let key in defs ){
            this._fragmentHooks[ key ] = defs[key];
        }

    }

}

export { MaterialModifier }

export default new MaterialModifier( defaultHooks.vertexHooks, defaultHooks.fragmentHooks );
