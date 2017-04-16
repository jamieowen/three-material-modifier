
import MaterialModifier from '../MaterialModifier'
import OrbitControls from 'orbit-controls';

import { CustomBasicMaterial } from './CustomBasicMaterial';

import {
    CustomLambertMaterial,
    CustomLambertDepthMaterial
} from './CustomLambertMaterial';

import {
    CustomStandardMaterial,
    CustomStandardDepthMaterial
} from './CustomStandardMaterial';

import {
    CustomPhongMaterial,
    CustomPhongDepthMaterial
} from './CustomPhongMaterial';


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
        distance: 45,
        phi: Math.PI * 0.35,
        zoomSpeed: 0.1,
        distanceBounds: [ 0,400 ],
        element: renderer.domElement,
        parent: renderer.domElement
    });

    let ambLight = new AmbientLight( 0xffffe5, 0.5 );
    let dirLight = new DirectionalLight( 0xeeffff, 1 );

    scene.add( ambLight );
    scene.add( dirLight );

    let sSize = 20;

    dirLight.castShadow = true;
	dirLight.shadow.camera.near = 1;
	dirLight.shadow.camera.far = 35;
	dirLight.shadow.camera.right = sSize;
	dirLight.shadow.camera.left = -sSize;
	dirLight.shadow.camera.top	= sSize;
	dirLight.shadow.camera.bottom = -sSize;
	dirLight.shadow.mapSize.width = 1024;
	dirLight.shadow.mapSize.height = 1024;

    scene.add( new CameraHelper( dirLight.shadow.camera ) );

    // Preview using some geometries.
    let size = 4;
    let geometries = [

        new BoxBufferGeometry( size,size,size,1,1,1 ),
        new SphereBufferGeometry( size,30,30 ),
        new BoxBufferGeometry( size,size,size,50,50,50 ),
        new SphereBufferGeometry( 3,100,100 )

    ]

    let materials = [

        CustomBasicMaterial,
        [ CustomLambertMaterial, CustomLambertDepthMaterial ],
        [ CustomStandardMaterial, CustomStandardDepthMaterial ],
        [ CustomPhongMaterial, CustomPhongDepthMaterial ]


    ]

    let colors = [
        0xffffff,
        0x4400ff,
        0x001133,
        0xffeeff
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
            color: colors[i],
            side: DoubleSide
        });
        let geometry = geometries[ i ];
        let mesh = new Mesh( geometry, material );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if( DepthMaterialClass ){
            mesh.customDepthMaterial = new DepthMaterialClass({
                depthPacking: RGBADepthPacking
            });
        }

        let size = 2;

        let x = ( i % size ) * spacing;
        let z = Math.floor( i / size ) * spacing;
        let offset = (spacing * (size-1)) / 2;

        mesh.position.set( x-offset,0,z-offset );

        scene.add( mesh );
        return mesh;

    })

    // add ground plane
    let planeMat = new MeshLambertMaterial({
        color: 0xeeee33,
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

        dirLight.position.x = Math.cos( time * 0.1 ) * 8;
        dirLight.position.z = Math.sin( time * 0.1 ) * 10;
        dirLight.position.y = 15;

        // update materials with a time uniform
        for( let i = 0; i<meshes.length; i++ ){
            mesh = meshes[i];
            if( mesh.material.uniforms && mesh.material.uniforms.time ){
                mesh.material.uniforms.time.value = time;
            }
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
