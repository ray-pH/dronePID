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
import { Drone } from "./pkg/drone_pid.js";
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
function draw_drone(drone) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    let droneheight = 50;
    let dronewidth = drone.length;
    ctx.translate(canvas.width * 0.5, canvas.width * 0.5);
    ctx.translate(drone.pos.x, -drone.pos.y);
    ctx.rotate(-drone.angle);
    ctx.fillRect(-dronewidth / 2, -droneheight / 2, dronewidth, droneheight);
    ctx.restore();
}
let drone;
let i_frame = 0;
function frame() {
    drone.calc_acc();
    drone.step_n_sim(0.01, 10);
    draw_drone(drone);
    if (i_frame > 500)
        return;
    i_frame += 1;
    requestAnimationFrame(frame);
}
const runWasm = () => __awaiter(void 0, void 0, void 0, function* () {
    const drone_wasm = yield init("./pkg/drone_pid_bg.wasm");
    drone = new Drone(0, 0, 0, 100.0, 1.0);
    drone.set_thrust_left(9.81 / 2);
    drone.set_thrust_right(9.81 / 2 + 1);
    // console.log(drone.pos.y);
    // drone.calc_acc();
    // drone.step_n_sim(0.01, 100);
    // console.log(drone.pos.y);
    frame();
});
runWasm();
