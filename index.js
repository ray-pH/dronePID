var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import init from "./pkg/drone_pid.js";
import { Drone, Controller } from "./pkg/drone_pid.js";
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
const world_scale = 100;
function draw(controller) {
    let drone = controller.drone;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    let droneheight = 20;
    let dronewidth = drone.length * world_scale;
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.translate(drone.pos.x * world_scale, -drone.pos.y * world_scale);
    // draw target angle
    ctx.moveTo(0, 0);
    let angle = Math.PI / 2.0 + controller.calc_target_angle();
    ctx.strokeStyle = 'white';
    ctx.lineTo(100 * Math.cos(-angle), 100 * Math.sin(-angle));
    ctx.stroke();
    // draw target angle
    ctx.rotate(-drone.angle);
    ctx.fillRect(-dronewidth / 2, -droneheight / 2, dronewidth, droneheight);
    ctx.restore();
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(controller.setpoint.x * world_scale, -controller.setpoint.y * world_scale, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
}
let controller;
let i_frame = 0;
function frame() {
    // console.log(controller.drone.thrust_left, controller.drone.thrust_right);
    // controller.apply_control();
    controller.step_n_sim(0.005, 10);
    draw(controller);
    // if (i_frame > 10000) return;
    i_frame += 1;
    requestAnimationFrame(frame);
}
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //debug
    let inp = document.getElementById('text-input');
    let butt = document.getElementById('button');
    butt.onclick = () => {
        let textinp = inp.value;
        let parsed = textinp.replace(/;/g, ',').split(',').map(parseFloat);
        console.log(parsed);
        if (parsed.length == 9)
            controller.change_pid_constants(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4], parsed[5], parsed[6], parsed[7], parsed[8]);
    };
}
function xcoord_pixelToWorld(x) {
    return (x - canvas.width * 0.5) / world_scale;
}
function ycoord_pixelToWorld(y) {
    return -(y - canvas.height * 0.5) / world_scale;
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: xcoord_pixelToWorld(evt.clientX - rect.left),
        y: ycoord_pixelToWorld(evt.clientY - rect.top),
    };
}
canvas.addEventListener('click', function (evt) {
    if (controller == null || controller == undefined)
        return;
    var mousePos = getMousePos(canvas, evt);
    // console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
    controller.set_setpoint(mousePos.x, mousePos.y);
}, false);
const runWasm = () => __awaiter(void 0, void 0, void 0, function* () {
    initCanvas();
    const drone_wasm = yield init("./pkg/drone_pid_bg.wasm");
    let x = 0.0;
    let y = 0.0;
    let angle = 0.0;
    let length = 0.5;
    let mass = 1.0;
    let drone = new Drone(x, y, angle, length, mass);
    drone.set_thrust_left(0);
    drone.set_thrust_right(0);
    controller = new Controller(drone);
    controller.set_setpoint(1, 1);
    frame();
});
runWasm();
