import * as THREE from 'three'
export default class Canvas {
    constructor(options) {
        this.time = 0
        this.container = options.dom;
        this.height = this.container.offsetHeight;
        this.width = this.container.offsetWidth;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, this.width/this.height )
        this.camera.position.z = 1; 
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            // alpha: true
        })
        this.renderer.setSize(this.width, this.height);
        this.setupResize()
        this.container.appendChild(this.renderer.domElement);
        this.addObjects()
        this.render()
    }


    setupResize(){
        window.addEventListener('resize', this.resize.bind(this))
    }
    resize() {
        this.height = this.container.offsetHeight
        this.width = this.container.offsetWidth
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width/this.height
        this.camera.updateProjectionMatrix()
    }

    addObjects() {
        this.geomentry = new THREE.PlaneBufferGeometry();
        this.material = new THREE.MeshBasicMaterial();
        this.mesh = new THREE.Mesh(this.geomentry, this.material)
        this.scene.add(this.mesh)
     }

    render() {
        this.time += .05;
        // console.log(this.renderer)
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Canvas({
    dom:document.getElementById('container')
})