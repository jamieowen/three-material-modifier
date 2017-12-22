
const cloneUniforms = ( uniforms )=>{
    
    let clone = {};
    for( let key in uniforms ){ // non-promitive uniform values will be referenced?
        clone[ key ] = Object.assign( {}, uniforms[key] );
    }
    return clone;

}

const defaultOpts = {
    extend: null, // Base three.js class to extend from.
    className: null, // Custom Material's class name.
    typeCheck: null, // inner isMeshCustomMaterial boolean added to prototype
    uniforms: null,
    vertexShader: null,
    fragmentShader: null
}

export default ( opts )=>{

    const compile = new Function( 'BaseClass', 'uniforms', 'vertexShader', 'fragmentShader', 'cloneUniforms',`
    
        var cls = function ${ opts.className }( params ){

            BaseClass.call( this, params );
            this.uniforms = cloneUniforms( uniforms );

            this.vertexShader = vertexShader;
            this.fragmentShader = fragmentShader;
            this.type = '${ opts.className }';

            this.setValues( params );

        }

        cls.prototype = Object.create( BaseClass.prototype );
        cls.prototype.constructor = cls;
        cls.prototype.${ opts.typeCheck } = true;

        cls.prototype.copy = function( source ){

            BaseClass.prototype.copy.call( this, source );

            this.uniforms = Object.assign( {}, source.uniforms );
            this.vertexShader = vertexShader;
            this.fragmentShader = fragmentShader;
            this.type = '${ opts.className }';

            return this;

        }

        return cls;

    `);

    return compile( 
        opts.extend,
        opts.uniforms,
        opts.vertexShader,
        opts.fragmentShader,
        cloneUniforms
    )

}