import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SDF } from "./RMSDF";
import { operations } from "./RMOperations";
import { smoothOperations } from "./RMSmoothOperations";
import * as shaders from "./shaders";
import { uniform } from "three/examples/jsm/nodes/Nodes.js";


// Инициализация рендера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Создание canvas
document.body.appendChild(renderer.domElement);

// Создание сцены
const scene = new THREE.Scene();

// Установка белого фона
scene.background = new THREE.Color(0xFFFFFF);

// Создание камеры
const camera = new THREE.PerspectiveCamera(
    75,                                     // Угол обзора
    window.innerWidth / window.innerHeight, // Соотношение сторон
    0.1,                                    // Мин. расстояние до объекта, при котором он отображается
    1000                                    // Макс. расстояние до объекта, при котором он отображается
);
camera.position.z = 13;

// Создание плоскости
const planeWidth = 20, planeHeight = 20;
const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 1); // Каркас
const material = new THREE.ShaderMaterial({       // Специальный класс для shader-ов
    vertexShader: shaders.vertex,
    fragmentShader: smoothOperations + operations + SDF + shaders.fragment,
    vertexColors: true,
    glslVersion: THREE.GLSL3,
    uniforms: {
        uTime: 0.0,
    },
    defines: {
        aspect: (planeWidth / planeHeight).toFixed(1)
    }
});
const plane = new THREE.Mesh(geometry, material); // "Натягивание" материала на каркас

scene.add(plane);

const render = () => {
    renderer.render(scene, camera);
}

var time = 0.0;
const animate = () => {
    time += .02;
    plane.material.uniforms.uTime = uniform(time);

    requestAnimationFrame(animate);
    render();
}

animate();
