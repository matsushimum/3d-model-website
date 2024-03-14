import './App.css';
import * as THREE from "three";
import {useEffect} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {

  let canvas:HTMLCanvasElement;
  let model:THREE.Group;

  useEffect(()=>{

    canvas = document.getElementById("canvas") as HTMLCanvasElement;//型推論

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //scene
    const scene:THREE.Scene = new THREE.Scene();
    //camera
    const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width/sizes.height,
      0.1,
      1000
      );

      camera.position.set(-1.3,0,3);

    //renderer
    const renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas:canvas,
      antialias :true,
      alpha:true,//透明状態

    });
    renderer.setSize(sizes.width,sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    const cube = new THREE.Mesh( geometry, material ); 
    cube.scale.set(1.3,1.3,1.3);
    cube.rotation.y = -Math.PI/3;
    scene.add( cube );

    //3dモデルのインポート
    const gltfLoader = new GLTFLoader();

    gltfLoader.load("./public/models/girl.gltf",(gltf)=>{
      model = gltf.scene;
      scene.add(model);
    })

    //アニメーション
    const tick =  () =>{
      renderer.render(scene,camera);
      requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize",()=>{
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width/sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width,sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

  },[]);


  return (
    <>
    <canvas id="canvas"></canvas>
    <div className="mainContent">
      <h3>Matsushimum</h3>
      <p>webdeveloper</p>
    </div>
    </>
  );
}

export default App;
