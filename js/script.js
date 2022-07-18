import * as THREE from 'three'
import vertex from '../shaders/vertexshader.glsl'
import fragment from '../shaders/fragmentshader.glsl'
import '../styles/main.css'
export default class Canvas {
    constructor(options) {
        this.time = 0
        this.container = options.dom;
        this.height = this.container.offsetHeight;
        this.width = this.container.offsetWidth;
        this.scene = new THREE.Scene();
        let fov = 2 * Math.atan((this.height / 2) / 1) * (180 / Math.PI);
        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height)
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


    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }
    resize() {
        this.height = this.container.offsetHeight
        this.width = this.container.offsetWidth
        this.renderer.setSize(this.width, this.height)
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
    }

    addObjects() {
        this.geomentry = new THREE.PlaneBufferGeometry(200, 200);
        this.material = new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 } },
            vertexShader: vertex,
            fragmentShader: fragment,
            wireframe: false
        })
        this.mesh = new THREE.Mesh(this.geomentry, this.material);
        this.scene.add(this.mesh);
    }

    render() {
        this.time += .05;
        this.material.uniforms.uTime.value = this.time;
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Canvas({
    dom: document.getElementById('container')
})