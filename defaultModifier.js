import MaterialModifier from './MaterialModifier';

const modifier = new MaterialModifier();

modifier.defineVertexHooks( {

    uniforms: 'insertbefore:#include <common>\n',
    functions: 'insertafter:#include <clipping_planes_pars_vertex>\n',
    preTransform: 'insertafter:#include <begin_vertex>\n',
    postTransform: 'insertafter:#include <project_vertex>\n',
    preNormal: 'insertafter:#include <beginnormal_vertex>\n'

} );

modifier.defineFragmentHooks( {

    uniforms: 'insertbefore:#include <common>\n',
    functions: 'insertafter:#include <clipping_planes_pars_fragment>\n',
    preFragColor: 'insertbefore:gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n',
    postFragColor: 'insertafter:gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n'

} );

export default modifier;
