use super::linear_algebra::V2;
use wasm_bindgen::prelude::*;

const ZERO_V2 : V2 = V2 { x:0.0, y:0.0 };

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub struct Drone {
    pub pos : V2,
    vel     : V2,
    acc     : V2,
    pub angle   : f64,
    angular_vel : f64,
    pub angular_acc : f64,
    thrust_left : f64,
    thrust_right: f64,
    pub length  : f64,
    pub mass    : f64,
    pub inertia : f64,
    pub max_force : f64,
    pub gravity : V2,
}

#[wasm_bindgen]
impl Drone {
    #[wasm_bindgen(constructor)]
    pub fn new(x : f64, y : f64, angle : f64, length : f64, mass : f64) -> Self {
        let pos = V2 { x, y };
        let inertia : f64 = mass * length * length;
        let max_force : f64 = 10.0;
        let gravity   = V2 { x:0.0, y:-9.81 };
        return Drone { pos, angle, length, mass, inertia,
            vel     : ZERO_V2,
            acc     : ZERO_V2,
            angular_vel : 0.0,
            angular_acc : 0.0,
            thrust_left  : 0.0,
            thrust_right : 0.0,
            max_force,
            gravity,
        };
    }

    pub fn set_thrust_right(&mut self, force : f64) {
        self.thrust_right = if force > self.max_force { self.max_force } else { force };
    }
    pub fn set_thrust_left(&mut self, force : f64) {
        self.thrust_left = if force > self.max_force { self.max_force } else { force };
    }
    pub fn calc_acc(&mut self){
        // linear
        let fx_right = - self.thrust_right * self.angle.sin();
        let fy_right =   self.thrust_right * self.angle.cos();
        let fx_left  = - self.thrust_left * self.angle.sin();
        let fy_left  =   self.thrust_left * self.angle.cos();
        self.acc.x   =   (fx_left + fx_right) / self.mass;
        self.acc.y   =   (fy_left + fy_right) / self.mass;
        self.acc    +=   self.gravity;
        // rotational
        let torque_right  =   fy_right * self.length * 0.5;
        let torque_left   = - fy_left  * self.length * 0.5;
        self.angular_acc  =   (torque_right + torque_left) / self.inertia;
        // console_log!("{} {} {}", torque_left, torque_right, self.angular_acc);
    }
    pub fn step_sim(&mut self, dt : f64){
        self.vel += self.acc * dt;
        self.pos += self.vel * dt;
        self.angular_vel += self.angular_acc * dt;
        self.angle       += self.angular_vel * dt;
    }
    pub fn step_n_sim(&mut self, dt : f64, n : u32){
        for _ in 0..n { self.step_sim(dt); }
    }
}
