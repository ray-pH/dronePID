mod pid;
mod drone;
mod linear_algebra;
mod drone_controller;

// use wasm_bindgen::prelude::*;
// use linear_algebra::V2;

// #[wasm_bindgen]
// pub fn create_controller(x : f64, y : f64, angle : f64, length : f64, mass : f64) -> drone_controller::Controller{
//     let drone : drone::Drone = drone::Drone::new(x, y, angle, length, mass);
//     drone_controller::Controller { drone, setpoint: V2 { x: 0.0, y: 0.0 }, max_angle_dev : 0.0}
// }
// #[wasm_bindgen]
// pub fn drone_get_angle(drone : drone::Drone) -> f64{
//     return drone.angle;
// }
