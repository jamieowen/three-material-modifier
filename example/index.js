
import MaterialModifier from '../MaterialModifier'
import OrbitControls from 'orbit-controls';

import CustomLambertMaterial from './CustomLambertMaterial';

import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Vector3,
    Mesh,
    MeshLambertMaterial,
    BoxBufferGeometry,
    SphereBufferGeometry,
    TorusBufferGeometry
} from 'three';

window.onload = ()=>{

    let renderer = new WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio( Math.max( 2, window.devicePixelRatio ) );
    document.body.appendChild( renderer.domElement );
    document.body.style.margin = '0px';
    document.body.style.overflow = 'hidden';

    let scene = new Scene();
    let camera = new PerspectiveCamera( 45, 4/3, 0.1,1000 );

    let controls = OrbitControls({
        distance: 150,
        phi: Math.PI * 0.3,
        zoomSpeed: 0.1,
        distanceBounds: [ 0,400 ],
        element: renderer.domElement,
        parent: renderer.domElement
    });

    let ambLight = new AmbientLight( 0xffffe5, 0.5 );
    let dirLight = new DirectionalLight( 0xeefffff );

    scene.add( ambLight );
    scene.add( dirLight );

    dirLight.position.set( 0.2,1,0 );

    //camera.position.set( 0,10,100 );

    // Test some inline 'easy' modifiers.
    // Inline Custom Material by passing a three.js class identifier

    let InlineCustomMaterial1 = MaterialModifier.extend( MeshLambertMaterial, {

        vertexShader: {

        },
        fragmentShader: {
            postFragColor: `
                gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );
            `
        }

    } )

    let InlineCustomMaterial2 = MaterialModifier.extend( 'standard', {

        vertexShader: {

        },
        fragmentShader: {
            postFragColor: `
                gl_FragColor = vec4( 1.0,0.0,0.0,1.0 );
            `
        }

    } )

    // Inline Custom Material using a string identifier

    // Preview using some geometries.
    let s = 4;
    let geometries = [

        new BoxBufferGeometry( s,s,s,1,1,1 ),
        new SphereBufferGeometry( s,10,10 ),
        new TorusBufferGeometry( s,s-2 )

    ]

    let materials = [

        InlineCustomMaterial1,
        InlineCustomMaterial2,
        InlineCustomMaterial2,
        InlineCustomMaterial2,
        MeshLambertMaterial,
        MeshLambertMaterial,
        MeshLambertMaterial,
        CustomLambertMaterial

    ]


    // create all meshes
    let meshes = materials.map( ( MaterialClass, i )=>{

        let material = new MaterialClass();
        let geometry = geometries[ i % geometries.length ];
        let mesh = new Mesh( geometry, material );

        let size = 3;
        let spacing = 40;
        let x = ( i % size ) * spacing;
        let z = Math.floor( i / size ) * spacing;
        let offset = (spacing * (size-1)) / 2;

        mesh.position.set( x-offset,0,z-offset );

        scene.add( mesh );
        return mesh;

    })

    let lookAt = new Vector3();

    let render = ()=>{

        controls.update();
        camera.position.fromArray(controls.position);
        camera.up.fromArray(controls.up);
        camera.lookAt( lookAt.fromArray(controls.direction) );

        renderer.render( scene, camera );
        requestAnimationFrame( render );

    }

    render();

    let resize = ()=>{

        let w = window.innerWidth;
        let h = window.innerHeight;

        camera.aspect = w/h;
        camera.updateProjectionMatrix();

        renderer.setSize( w,h );

    }

    window.onresize = resize;
    resize();


}
