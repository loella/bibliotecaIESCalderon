let scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0,1.6,4);

/* LUCES */

const light = new THREE.HemisphereLight(0xffffff,0x444444,1);
scene.add(light);

/* SUELO */

const floorGeo = new THREE.PlaneGeometry(50,50);
const floorMat = new THREE.MeshPhongMaterial({color:0x8b6f47});
const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

/* ESTANTERÍA SIMPLE */

const shelfGeo = new THREE.BoxGeometry(10,2,1);
const shelfMat = new THREE.MeshLambertMaterial({color:0x5a3a21});
const shelf = new THREE.Mesh(shelfGeo,shelfMat);
shelf.position.set(0,1,-6.5);
scene.add(shelf);

/* LIBROS */

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let objetosLibros=[];

libros.forEach((libro)=>{

const geo = new THREE.BoxGeometry(.5,1.2,.9);

const mat = new THREE.MeshLambertMaterial({
color:Math.random()*0xffffff
});

const mesh = new THREE.Mesh(geo,mat);

mesh.position.set(libro.pos[0],libro.pos[1],libro.pos[2]);

mesh.userData=libro;

scene.add(mesh);

objetosLibros.push(mesh);

});

/* CLICK */

window.addEventListener("click",(event)=>{

mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

raycaster.setFromCamera(mouse,camera);

const intersects = raycaster.intersectObjects(objetosLibros);

if(intersects.length>0){
abrirLibro(intersects[0].object.userData);
}

});

function abrirLibro(libro){

document.getElementById("titulo").innerText=libro.titulo;
document.getElementById("autor").innerText=libro.autor;
document.getElementById("resumen").innerText=libro.resumen;
document.getElementById("recomienda").innerText=libro.recomienda;
document.getElementById("portada").src=libro.portada;

document.getElementById("ficha").style.display="block";

}

function cerrarLibro(){
document.getElementById("ficha").style.display="none";
}

/* MOVIMIENTO BASICO */

let keys={};

document.addEventListener("keydown",(e)=>keys[e.key.toLowerCase()]=true);
document.addEventListener("keyup",(e)=>keys[e.key.toLowerCase()]=false);

function mover(){

const speed=0.08;

if(keys["w"]) camera.position.z -= speed;
if(keys["s"]) camera.position.z += speed;
if(keys["a"]) camera.position.x -= speed;
if(keys["d"]) camera.position.x += speed;

}

/* LOOP */

function animate(){

requestAnimationFrame(animate);

mover();

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});