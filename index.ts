import init from "./pkg/drone_pid.js"
import { Drone, Controller } from "./pkg/drone_pid.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx : CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;


const world_scale = 100;
function draw(controller : Controller) {
    let drone = controller.drone;
    ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        ctx.fillStyle = 'white';

        let droneheight = 20;
        let dronewidth  = drone.length * world_scale;

        ctx.translate(canvas.width * 0.5, canvas.width * 0.5);
        ctx.translate(drone.pos.x * world_scale, -drone.pos.y * world_scale);

        // draw target angle
        ctx.moveTo(0,0);
        let angle = Math.PI/2.0 + controller.calc_target_angle();
        ctx.strokeStyle = 'white';
        ctx.lineTo(100 * Math.cos(-angle), 100 * Math.sin(-angle));
        ctx.stroke();
        // draw target angle

        ctx.rotate(-drone.angle);
        ctx.fillRect(-dronewidth/2, -droneheight/2, dronewidth, droneheight);
    ctx.restore();

    ctx.save();
        ctx.translate(canvas.width * 0.5, canvas.width * 0.5);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(controller.setpoint.x * world_scale, -controller.setpoint.y * world_scale, 5, 0, 2 * Math.PI, false);
        ctx.fill();
    ctx.restore();
}

let controller : Controller;

let i_frame : number = 0;
function frame(){

    console.log(controller.drone.thrust_left, controller.drone.thrust_right);
    // controller.apply_control();
    controller.step_n_sim(0.01, 10);
    draw(controller);

    if (i_frame > 10) return;
    i_frame += 1;
    requestAnimationFrame(frame);
}

const runWasm = async () => {
    const drone_wasm = await init("./pkg/drone_pid_bg.wasm");

    let x = 0.0;
    let y = 0.0;
    let angle = 0.0;
    let length = 0.5;
    let mass = 1.0;

    let drone = new Drone(x,y, angle, length, mass);
    drone.set_thrust_left(0);
    drone.set_thrust_right(0);
    controller = new Controller(drone);
    controller.set_setpoint(0, 1);
    frame();
};
runWasm();
