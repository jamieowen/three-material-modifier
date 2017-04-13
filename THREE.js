
let THREE;
if( typeof window !== 'undefined' ){
    THREE = window.THREE;
}

export function setThree( aTHREE ){

    THREE = aTHREE;

}

export function getThree(){

    return THREE;

}
