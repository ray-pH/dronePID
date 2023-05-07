mod drone;
mod linear_algebra;

use wasm_bindgen::prelude::*;
// use linear_algebra::V2;

#[wasm_bindgen]
pub fn create_drone(x : f32, y : f32, angle : f32) -> drone::Drone{
    return drone::Drone::new(x, y, angle, 1.0, 1.0);
}
// #[wasm_bindgen]
// pub fn drone_get_angle(drone : drone::Drone) -> f32{
//     return drone.angle;
// }
