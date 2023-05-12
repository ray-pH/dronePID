use super::{drone, pid::PID};
use super::linear_algebra::{V2, clamp};
use wasm_bindgen::prelude::*;
use std::f64::consts::PI;

const ZERO_V2 : V2 = V2 { x:0.0, y:0.0 };
const KX : f64 = 0.5;
const KY : f64 = 1.0;
const KQ : f64 = 0.05;

const KDX : f64 = 4.0;
const KDY : f64 = 0.8;
const KDQ : f64 = 0.3;

const KIX : f64 = 0.0;
const KIY : f64 = 0.0;
const KIQ : f64 = 0.0;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub struct DronePIDS {
    x : PID,
    y : PID,
    theta : PID,
}

#[wasm_bindgen]
pub struct Controller {
    pub drone : drone::Drone,
    pub setpoint : V2,
    max_angle_dev : f64,
    last_dt : f64,
    pid : DronePIDS,
}

// let max_angle = (gravity.modulus() / 2.0 / mass).acos();
#[wasm_bindgen]
impl Controller {
    #[wasm_bindgen(constructor)]
    pub fn new(drone : drone::Drone) -> Self {
        // let max_angle_dev = (drone.gravity.modulus() / 2.0 / drone.max_force).acos();
        let max_angle_dev = PI/6.0;
        let pid = DronePIDS {
            x : PID::new(KX, KDX, KIX),
            y : PID::new(KY, KDY, KIY),
            theta : PID::new(KQ, KDQ, KIQ),
        };
        Controller { drone, setpoint: ZERO_V2, max_angle_dev, last_dt : 1.0, pid }
    }

    pub fn change_pid_constants(&mut self,
        kx : f64, kdx : f64, kix : f64,
        ky : f64, kdy : f64, kiy : f64,
        kq : f64, kdq : f64, kiq : f64,
    ){
        self.pid.x.set_constants(kx, kdx, kix);
        self.pid.y.set_constants(ky, kdy, kiy);
        self.pid.theta.set_constants(kq, kdq, kiq);
    }

    pub fn set_setpoint(&mut self, x : f64, y : f64){
        self.setpoint.x = x;
        self.setpoint.y = y;
    }

    fn calc_to_setpoint_vector(&self) -> V2 {
        self.setpoint - self.drone.pos
    }


    // Method 1, simple formula
    pub fn calc_target_angle(&self) -> f64 {
        let fx = self.pid.x.get() - self.drone.mass * self.drone.gravity.x;
        let fy = self.pid.y.get() - self.drone.mass * self.drone.gravity.y;
        let theta_t = (-fx/fy).atan();
        clamp(theta_t, -self.max_angle_dev, self.max_angle_dev)
    }

    fn calc_forces(&self) -> (f64,f64) {
        let angle_target  = self.calc_target_angle();
        // let a = (self.calc_pid_y() - self.drone.mass * self.drone.gravity.y)/(angle_target.cos());
        // let a = if angle_target != 0.0 {
        //     (self.pid.x.get() - self.drone.mass *self.drone.gravity.x)/(-angle_target.sin())
        // } else {
        //     (self.pid.y.get() - self.drone.mass * self.drone.gravity.y)/(angle_target.cos())
        // };
        let a = (self.pid.y.get() - self.drone.mass * self.drone.gravity.y)/(angle_target.cos());
        let b = self.pid.theta.get() / self.drone.length;
        ((a-b)/2.0 , (a+b)/2.0) // FL, FR
    }

    // // Method 2, linear
    // pub fn calc_target_angle(&self) -> f64 {
    //     let fx = self.calc_pid_x() - self.drone.mass * self.drone.gravity.x;
    //     clamp(-fx, -self.max_angle_dev, self.max_angle_dev)
    // }

    // fn calc_forces(&self) -> (f64,f64) {
    //     // let angle_target  = self.calc_target_angle();
    //     let a =  self.calc_pid_y() - self.drone.mass * self.drone.gravity.y;
    //     let b =  self.calc_pid_theta() / self.drone.length;
    //     ((a-b)/2.0 , (a+b)/2.0) // FL, FR
    // }

    pub fn apply_control(&mut self) {
        let (fl, fr) = self.calc_forces();
        self.drone.set_thrust_left(fl);
        self.drone.set_thrust_right(fr);
    }

    pub fn step_n_sim(&mut self, dt : f64, n : u32){
        self.last_dt = dt;
        for _ in 0..n { 
            self.apply_control();

            // update PID
            let e_pos = self.calc_to_setpoint_vector();
            let e_angle = self.calc_target_angle() - self.drone.angle;
            self.pid.x.update(e_pos.x, dt);
            self.pid.y.update(e_pos.y, dt);
            self.pid.theta.update(e_angle, dt);

            self.drone.calc_acc();
            self.drone.step_sim(dt);
        }
        // console_log!("{}", self.calc_target_angle());
    }


}
