import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';

    function main() {

        // Get canvas and assign it to the WebGLRenderer
        const canvas = document.querySelector('#main-canvas');
        const renderer = new THREE.WebGLRenderer({canvas});

        // set up default camera and position
        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        // set up scene
        const scene = new THREE.Scene();
        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-1, 2, 4);
            scene.add(light);
        }

        // create the box model
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // create copy of the box and assign a material to them
        function makeInstance(geometry, color, x) {
            const material = new THREE.MeshPhongMaterial({color});

            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            cube.position.x = x;

            return cube;
        }

        const cubes = [
            makeInstance(geometry, 0x44aa88,  0),
            makeInstance(geometry, 0x8844aa, -2),
            makeInstance(geometry, 0xaa8844,  2),
        ];

        // Make renderer respond to any container size or ratio
        // Source: https://stackoverflow.com/a/45046955 
        function resizeCanvasToDisplaySize() {
            // look up the size the canvas is being displayed
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
        
            // adjust displayBuffer size to match
            if (canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            }
        }

        function render(time) {
            time *= 0.001;

            resizeCanvasToDisplaySize();

            cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
            });

            renderer.render(scene, camera);

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    main();