import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui';

//Gui
const gui = new lil.GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const light = new THREE.PointLight(0xffffff, 50)
light.position.x = 2
light.position.y = 3
light.position.z = 4
scene.add(light)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//Textures

const textureLoader = new THREE.TextureLoader();

const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbienctOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const gradient3 = textureLoader.load("/textures/gradients/3.jpg");
const gradient5 = textureLoader.load("/textures/gradients/5.jpg");

gradient3.minFilter = THREE.NearestFilter;
gradient3.magFilter = THREE.NearestFilter;
gradient3.generateMipmaps = false;

gradient5.minFilter = THREE.NearestFilter;
gradient5.magFilter = THREE.NearestFilter;
gradient5.generateMipmaps = false;


const matcap1 = textureLoader.load("/textures/matcaps/1.png");
const matcap2 = textureLoader.load("/textures/matcaps/2.png");
const matcap3 = textureLoader.load("/textures/matcaps/3.png");
const matcap4 = textureLoader.load("/textures/matcaps/4.png");
const matcap5 = textureLoader.load("/textures/matcaps/5.png");
const matcap6 = textureLoader.load("/textures/matcaps/6.png");
const matcap7 = textureLoader.load("/textures/matcaps/7.png");
const matcap8 = textureLoader.load("/textures/matcaps/8.png");

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture0 = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
]);

const environmentMapTexture1 = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg',
]);

const environmentMapTextur2 = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg',
]);

//Objects

// const material = new THREE.MeshBasicMaterial();

// material.map = doorColorTexture;
// material.color.set('pink');
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcap8

//const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 500;
// material.specular = new THREE.Color(0xfff0000);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradient5;

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.aoMap = doorAmbienctOcclusion;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture1;

gui.add(material, 'metalness').min(0).max(1);
gui.add(material, 'roughness').min(0).max(1);
gui.add(material, 'aoMapIntensity').min(0).max(10);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5
scene.add(sphere, plane, torus)


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.x = 0.5 * elapsedTime;
    plane.rotation.x = 0.5 * elapsedTime;
    torus.rotation.x = 0.5 * elapsedTime;

    sphere.rotation.y = 0.15 * elapsedTime;
    plane.rotation.y = 0.15 * elapsedTime;
    torus.rotation.y = 0.15 * elapsedTime;
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()