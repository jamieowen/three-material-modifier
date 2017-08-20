
import {
    ShaderChunk
} from 'three';

/**
 * Taken from WebGLProgram in three.js
 */
const parseIncludes = ( string )=>{

    var pattern = /^[ \t]*#include +<([\w\d.]+)>/gm;

    function replace( match, include ) {

        var replace = ShaderChunk[ include ];

        if ( replace === undefined ) {

            throw new Error( 'Can not resolve #include <' + include + '>' );

        }

        return parseIncludes( replace );

    }

    return string.replace( pattern, replace );

}

export default {

    parseIncludes: parseIncludes

}
