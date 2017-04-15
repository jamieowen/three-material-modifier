
import MaterialModifier from '../MaterialModifier'
import OrbitControls from 'orbit-controls';

import {
    CustomStandardMaterial,
    CustomStandardDepthMaterial
} from './CustomLambertMaterial';

import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    BasicShadowMap,
    Vector3,
    Mesh,
    RGBADepthPacking,
    MeshBasicMaterial,
    MeshLambertMaterial,
    PlaneBufferGeometry,
    BoxBufferGeometry,
    SphereBufferGeometry,
    TorusBufferGeometry,
    DoubleSide,
    CameraHelper
} from 'three';

window.onload = ()=>{

    let renderer = new WebGLRenderer({
        antialias: true
    });

    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = BasicShadowMap;
    renderer.gammaInput = true;
	renderer.gammaOutput = true;

    renderer.setPixelRatio( Math.max( 2, window.devicePixelRatio ) );
    document.body.appendChild( renderer.domElement );
    document.body.style.margin = '0px';
    document.body.style.overflow = 'hidden';

    let scene = new Scene();
    let camera = new PerspectiveCamera( 45, 4/3, 0.1,400 );

    let controls = OrbitControls({
        distance: 100,
        phi: Math.PI * 0.3,
        zoomSpeed: 0.1,
        distanceBounds: [ 0,400 ],
        element: renderer.domElement,
        parent: renderer.domElement
    });

    let ambLight = new AmbientLight( 0xffffe5, 0.5 );
    let dirLight = new DirectionalLight( 0xeeffff, 1 );

    scene.add( ambLight );
    scene.add( dirLight );

    dirLight.position.set( 0, 20, 0 );
    dirLight.castShadow = true;
	dirLight.shadow.camera.near = 1;
	dirLight.shadow.camera.far = 25;
	dirLight.shadow.camera.right = 30;
	dirLight.shadow.camera.left = -30;
	dirLight.shadow.camera.top	= 30;
	dirLight.shadow.camera.bottom = -30;
	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;

    scene.add( new CameraHelper( dirLight.shadow.camera ) );

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
                gl_FragColor = vec4( 0.0,0.0,1.0,1.0 );
            `
        }

    } )

    // Inline Custom Material using a string identifier

    // Preview using some geometries.
    let size = 4;
    let geometries = [

        new BoxBufferGeometry( size,size,size,1,1,1 ),
        new SphereBufferGeometry( size,50,50 ),
        new TorusBufferGeometry( size/2,(size/2)-1 )

    ]

    let materials = [

        InlineCustomMaterial1,
        InlineCustomMaterial2,
        InlineCustomMaterial2,
        InlineCustomMaterial2,
        MeshLambertMaterial,
        MeshLambertMaterial,
        MeshLambertMaterial,
        [ CustomStandardMaterial, CustomStandardDepthMaterial ]

    ]

    // create all meshes
    let spacing = 20;
    let meshes = materials.map( ( MaterialClass, i )=>{

        let DepthMaterialClass;
        if( MaterialClass instanceof Array ){
            DepthMaterialClass = MaterialClass[1];
            MaterialClass = MaterialClass[0];
        }

        let material = new MaterialClass( {
            color: Math.random() * 16000,
            side: DoubleSide
        });
        let geometry = geometries[ i % geometries.length ];
        let mesh = new Mesh( geometry, material );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if( DepthMaterialClass ){
            mesh.customDepthMaterial = new DepthMaterialClass({
                depthPacking: RGBADepthPacking
            });
        }

        let size = 3;

        let x = ( i % size ) * spacing;
        let z = Math.floor( i / size ) * spacing;
        let offset = (spacing * (size-1)) / 2;

        mesh.position.set( x-offset,0,z-offset );

        scene.add( mesh );
        return mesh;

    })

    // add ground plane
    let planeMat = new MeshLambertMaterial({
        color: 0xeeeeee,
        side: DoubleSide
    })
    let plane = new Mesh( new PlaneBufferGeometry( 100,100,1,1 ),planeMat );
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.set( 0,-size,0 );
    plane.receiveShadow = true;
    scene.add( plane );

    let lookAt = new Vector3();

    let time = 0.0;

    let render = ()=>{

        time+=0.1;

        let mesh;
        // update materials with a time uniform
        for( let i = 0; i<meshes.length; i++ ){
            mesh = meshes[i];
            if( mesh.material.uniforms && mesh.material.uniforms.time ){
                mesh.material.uniforms.time.value = time;
            }

            //if( mesh.customDepthMaterial && mesh.customDepthMaterial.uniforms && mesh.customDepthMaterial.uniforms.time ){
                //mesh.customDepthMaterial.uniforms.time.value = time;
            //}
        }

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
