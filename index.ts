import init from "./pkg/drone_pid.js"
import { Drone } from "./pkg/drone_pid.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx : CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

function draw_drone(drone : Drone) {
    ctx.save();

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = 'white';

    let droneheight = 50;
    let dronewidth  = drone.length;

    ctx.translate(canvas.width * 0.5, canvas.width * 0.5);
    ctx.translate(drone.pos.x, -drone.pos.y);
    ctx.rotate(-drone.angle);
    ctx.fillRect(-dronewidth/2, -droneheight/2, dronewidth, droneheight);

    ctx.restore();
}

let drone : Drone ;

let i_frame : number = 0;
function frame(){

    drone.calc_acc();
    drone.step_n_sim(0.01, 10);
    draw_drone(drone);

    if (i_frame > 100) return;
    i_frame += 1;
    requestAnimationFrame(frame);
}

const runWasm = async () => {
    const drone_wasm = await init("./pkg/drone_pid_bg.wasm");
    drone = new Drone(0, 0, 0, 100.0, 1.0);
    drone.set_thrust_left(9.81/2);
    drone.set_thrust_right(9.81/2 + 0.01);
    // console.log(drone.pos.y);
    // drone.calc_acc();
    // drone.step_n_sim(0.01, 100);
    // console.log(drone.pos.y);
    frame();
};
runWasm();
