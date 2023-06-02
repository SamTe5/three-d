var scene;
var camera;
var renderer;
var gui;
var params={color:0x00ff00}

function createScene() {
    gui=new dat.GUI()

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    renderer = new THREE.WebGLRenderer({physicallyCorrectLight:true, antialias:true, powerPreference:"high-performance"})
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled=true
    document.querySelector(".webgl").appendChild(renderer.domElement)

    createBox("box1",1,1,1,0,0.5,0,0xffffff)
    createBox("floor",10,1,10,0,-0.5,0,0xffffff)

    

   
    camera.position.x = 1
    camera.position.z = 10
    camera.position.y = 5
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    var gridHelper=new THREE.GridHelper(5,10, 0xff0000,0x555555)
    scene.add(gridHelper)

    var axesHelper=new THREE.AxesHelper(1)
    scene.add(axesHelper)

    const dir=new THREE.Vector3(2,3,4)
    const ori=new THREE.Vector3(0,0,0)
    var arrowHelper=new THREE.ArrowHelper(dir.normalize(),ori,1,0x687777)
    scene.add(arrowHelper)

    var cameraHelper=new THREE.CameraHelper(camera)
    scene.add(cameraHelper)



    var fp=gui.addFolder("Position")
    var fr=gui.addFolder("Rotation")
    var fc=gui.addFolder("Color")

    fp.add(scene.getObjectByName("box1").position,"x",0,5)
    fp.add(scene.getObjectByName("box1").position,"y",0,5)
    fp.add(scene.getObjectByName("box1").position,"z",0,5)
    fr.add(scene.getObjectByName("box1").rotation,"x",0,5)
    fr.add(scene.getObjectByName("box1").rotation,"y",0,5)
    fr.add(scene.getObjectByName("box1").rotation,"z",0,5)
    fc.addColor(params,"color").onChange(function(){
        scene.getObjectByName("box1").material.color.set(params.color)
    })

    createSpotLight()
}

function createBox(name,w,h,d,x,y,z,color){
    var geometry = new THREE.BoxGeometry(w, h, d)
    var material = new THREE.MeshStandardMaterial({ color: color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x,y,z)
    mesh.name=name
    mesh.castShadow=true
    mesh.receiveShadow=true
    scene.add(mesh)
}


function createSpotLight(){
    var spotLight=new THREE.SpotLight(0xffffff)
    spotLight.position.set(3,4,3)
    spotLight.castShadow=true
    spotLight.shadow.mapSize.width=4096
    spotLight.shadow.mapSize.height=4096
    spotLight.penumbra=1
    spotLight.intensity=2

    spotLight.shadow.camera.near=2
    spotLight.shadow.camera.far=10
    spotLight.shadow.camera.fow=30

    var target=new THREE.Object3D()
    target.position.set(-10,0,-10)
    spotLight.target=target
    scene.add(target)

    gui.add(spotLight,"penumbra",0,1).step(0.01)
    gui.add(spotLight,"intensity",0,10)
    gui.add(spotLight,"distance",0,10)
    gui.add(spotLight,"decay",0,10)
    gui.add(spotLight,"power",0,10)
    gui.add(spotLight.position,"x",0,10)
    gui.add(spotLight.position,"y",0,10)
    gui.add(spotLight.position,"z",0,10)
    gui.add(target.position,"x",-10,10)
    gui.add(target.position,"y",-10,10)
    gui.add(target.position,"z",-10,10)


    var helper=new THREE.SpotLightHelper(spotLight)
    scene.add(helper)

    var chelper=new THREE.CameraHelper(spotLight.shadow.camera)
    scene.add(chelper)

    

    scene.add(spotLight)
}


function render(){
    renderer.render(scene, camera)
   // scene.getObjectByName("box1").rotation.x+=0.01
    requestAnimationFrame(render)
}





createScene()

render()


