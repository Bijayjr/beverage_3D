// // Initialize Lenis smooth scrolling
// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);

// gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
// });
// gsap.ticker.lagSmoothing(0);

// // Initialize Three.js Scene
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xfefdfd);

// // Camera Setup
// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// camera.position.set(0, 1, 3);

// // Renderer Setup
// const renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     alpha: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.physicallyCorrectLights = true;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 2.5;

// // Append Renderer to DOM
// document.querySelector(".model").appendChild(renderer.domElement);

// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Lower intensity
// scene.add(ambientLight);

// const mainLight = new THREE.DirectionalLight(0xfff8dc, 1.5); // Slightly warm white
// mainLight.position.set(5, 10, 7.5);
// mainLight.castShadow = true;
// scene.add(mainLight);

// const fillLight = new THREE.DirectionalLight(0xffd7b5, 0.8); // Soft orange for contrast
// fillLight.position.set(-5, 5, -5);
// scene.add(fillLight);

// const hemiLight = new THREE.HemisphereLight(0xffe0bb, 0x444466, 0.6); // Warm sky & neutral ground
// hemiLight.position.set(0, 25, 0);
// scene.add(hemiLight);

// // Animation Loop
// function animate() {
//     if (model) {
//         // Floating Animation
//         if (isFloating) {
//             const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
//             model.position.y = floatOffset;
//         }

//         // Rotate Model on Scroll
//         const scrollProgress = Math.min(currentScroll / scannerPosition, 1);
//         if (scrollProgress < 1) {
//             model.rotation.x = scrollProgress * Math.PI * 2;
//         }
//         model.rotation.y += 0.001 * rotationSpeed;
//     }

//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }

// // Load 3D Model
// let model;
// const loader = new THREE.GLTFLoader();
// loader.load("./images/Druk_11000_Can_0312115835_texture.glb", function (gltf) {
//     model = gltf.scene;
//     console.log("Model Loaded:", model);

//     // Adjust Model Properties
//     model.traverse((node) => {
//         if (node.isMesh) {
//             if (node.material) {
//                 node.material.metalness = 0.3;
//                 node.material.roughness = 0.4;
//                 node.material.envMapIntensity = 1.5;
//             }
//             node.castShadow = true;
//             node.receiveShadow = true;
//         }
//     });

//     // Center the Model
//     const box = new THREE.Box3().setFromObject(model);
//     const center = box.getCenter(new THREE.Vector3());
//     model.position.sub(center);
//     scene.add(model);
//      // **Rotate Model Initially by 20 Degrees CCW (Counterclockwise)**
//      model.rotation.y = THREE.MathUtils.degToRad(90); 

//     // Adjust Camera Distance
//     const size = box.getSize(new THREE.Vector3());
//     const maxDim = Math.max(size.x, size.y, size.z);
//     camera.position.z = maxDim * 1.5;

//     // Initial Scale Animation
//     model.scale.set(0, 0, 0);
//     playInitialAnimation();

//     // Start Animation Loop
//     animate();
// });

// // Floating Effect
// const floatAmplitude = 0.2;
// const floatSpeed = 1.5;
// const rotationSpeed = 0.3;
// let isFloating = true;
// let currentScroll = 0;

// // Scanner Section
// const scannerSection = document.querySelector(".scanner");
// const scannerPosition = scannerSection.offsetTop;
// const scanContainer = document.querySelector(".scan-container");
// const scanSound = new Audio("./images/store-scanner-beep-90395.mp3"); // Ensure correct file path

// gsap.set(scanContainer, { scale: 0 });

// function playInitialAnimation() {
//     if (model) {
//         gsap.to(model.scale, {
//             x: 1,
//             y: 1,
//             z: 1,
//             duration: 1,
//             ease: "power2.out",
//         });
//     }

//     gsap.to(scanContainer, {
//         scale: 1,
//         duration: 1,
//         ease: "power2.out",
//     });
// }

// // ScrollTrigger for Model Animation
// ScrollTrigger.create({
//     trigger: "body",
//     start: "top top",
//     end: "top -10",
//     onEnterBack: () => {
//         if (model) {
//             gsap.to(model.scale, {
//                 x: 1,
//                 y: 1,
//                 z: 1,
//                 duration: 1,
//                 ease: "power2.out",
//             });
//             isFloating = true;
//         }
//         gsap.to(scanContainer, {
//             scale: 1,
//             duration: 1,
//             ease: "power2.out",
//         });
//     },
// });

// ScrollTrigger.create({
//     trigger: ".scanner",
//     start: "top top",
//     end: `${window.innerHeight}px`,
//     pin: true,
//     onEnter: () => {
//         if (model) {
//             isFloating = false;
//             model.position.y = 0;

//             setTimeout(() => {
//                 scanSound.currentTime = 0;
//                 scanSound.play();
//             }, 200);

//             gsap.to(model.rotation, {
//                 y: model.rotation.y + Math.PI * 2,
//                 duration: 1,
//                 ease: "power2.inOut",
//                 onComplete: () => {
//                     gsap.to(model.scale, {
//                         x: 0,
//                         y: 0,
//                         z: 0,
//                         duration: 0.5,
//                         ease: "power2.in",
//                         onComplete: () => {
//                             gsap.to(scanContainer, {
//                                 scale: 0,
//                                 duration: 0.5,
//                                 ease: "power2.in",
//                                 onComplete: () => {
//                                     // Automatically scroll to the next section
//                                     const nextSection = document.querySelector(".outro");
//                                     if (nextSection) {
//                                         const scrollTarget = nextSection.offsetTop;

//                                         lenis.scrollTo(scrollTarget, {
//                                             duration: 1.5, // Duration of the scroll animation
//                                             easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
//                                             immediate: false, // Ensure smooth scrolling
//                                         });
//                                     }
//                                 },
//                             });
//                         },
//                     });
//                 },
//             });
//         }
//     },
//     onLeaveBack: () => {
//         gsap.set(scanContainer, { scale: 0 });
//         gsap.to(scanContainer, {
//             scale: 1,
//             duration: 1,
//             ease: "power2.out",
//         });
//     },
// });

// // Update Scroll Position
// lenis.on("scroll", (e) => {
//     currentScroll = e.scroll;
// });






// Initialize Lenis smooth scrolling
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Initialize Three.js Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefdfd);

// Camera Setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 3);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5;

// Append Renderer to DOM
document.querySelector(".model").appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Lower intensity
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xfff8dc, 1.5); // Slightly warm white
mainLight.position.set(5, 10, 7.5);
mainLight.castShadow = true;
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xffd7b5, 0.8); // Soft orange for contrast
fillLight.position.set(-5, 5, -5);
scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffe0bb, 0x444466, 0.6); // Warm sky & neutral ground
hemiLight.position.set(0, 25, 0);
scene.add(hemiLight);

// Animation Loop
function animate() {
    if (model) {
        // Floating Animation
        if (isFloating) {
            const floatOffset = Math.sin(Date.now() * 0.001 * floatSpeed) * floatAmplitude;
            model.position.y = floatOffset;
        }

        // Rotate Model on Scroll
        const scrollProgress = Math.min(currentScroll / scannerPosition, 1);
        if (scrollProgress < 1) {
            model.rotation.x = scrollProgress * Math.PI * 2;
        }
        model.rotation.y += 0.001 * rotationSpeed;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Load 3D Model
let model;
const loader = new THREE.GLTFLoader();
loader.load("./images/11000.glb", function (gltf) {
    model = gltf.scene;
    console.log("Model Loaded:", model);

    // Adjust Model Properties
    model.traverse((node) => {
        if (node.isMesh) {
            if (node.material) {
                node.material.metalness = 0.3;
                node.material.roughness = 0.4;
                node.material.envMapIntensity = 1.5;
            }
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });

    // Center the Model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    scene.add(model);
     // **Rotate Model Initially by 20 Degrees CCW (Counterclockwise)**
     model.rotation.y = THREE.MathUtils.degToRad(0); 

    // Adjust Camera Distance
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 1.5;

    // Initial Scale Animation
    model.scale.set(0, 0, 0);
    playInitialAnimation();

    // Start Animation Loop
    animate();
});

// Floating Effect
const floatAmplitude = 0.2;
const floatSpeed = 1.5;
const rotationSpeed = 0.3;
let isFloating = true;
let currentScroll = 0;

// Scanner Section
const scannerSection = document.querySelector(".scanner");
const scannerPosition = scannerSection.offsetTop;
const scanContainer = document.querySelector(".scan-container");
const scanSound = new Audio("./images/store-scanner-beep-90395.mp3"); // Ensure correct file path

gsap.set(scanContainer, { scale: 0 });

function playInitialAnimation() {
    if (model) {
        gsap.to(model.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "power2.out",
        });
    }

    gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
    });
}

// ScrollTrigger for Model Animation
ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "top -10",
    onEnterBack: () => {
        if (model) {
            gsap.to(model.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1,
                ease: "power2.out",
            });
            isFloating = true;
        }
        gsap.to(scanContainer, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        });
    },
});

ScrollTrigger.create({
    trigger: ".scanner",
    start: "top 30%", // Stops scrolling when the `.scanner` section is 30% down the viewport
    end: "top top", // Ends when the top of `.scanner` reaches the top of the viewport
    pin: true, // Keeps the model fixed
    onEnter: () => {
        if (model) {
            isFloating = false; // Stop floating
            model.position.y = 0; // Fix position above `.scanner`
            
            setTimeout(() => {
                scanSound.currentTime = 0;
                scanSound.volume = 1.0; // Ensure it's not muted
                scanSound.play().catch((error) => {
                    console.warn("Audio play failed due to browser restrictions:", error);
                });
            }, 200);
            

            gsap.to(model.rotation, {
                y: model.rotation.y + Math.PI * 2,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(model.scale, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: () => {
                            gsap.to(scanContainer, {
                                scale: 0,
                                duration: 0.5,
                                ease: "power2.in",
                                onComplete: () => {
                                    const nextSection = document.querySelector(".outro");
                                    if (nextSection) {
                                        lenis.scrollTo(nextSection.offsetTop, {
                                            duration: 1.5,
                                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                                            immediate: false,
                                        });
                                    }
                                },
                            });
                        },
                    });
                },
            });
        }
    },
});


// Update Scroll Position
lenis.on("scroll", (e) => {
    currentScroll = e.scroll;
});