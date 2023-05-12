use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PID {
    pub e : f64,
    pub diff_e : f64,
    pub int_e  : f64,
    pub kp : f64,
    pub kd : f64,
    pub ki : f64,
}


#[wasm_bindgen]
impl PID {
    #[wasm_bindgen(constructor)]
    pub fn new(kp : f64, kd : f64, ki : f64) -> Self {
        PID { e: 0.0, diff_e : 0.0, int_e: 0.0, kp, kd, ki }
    }

    pub fn set_constants(&mut self, kp : f64, kd : f64, ki : f64) {
        self.kp = kp; self.kd = kd; self.ki = ki;
    }

    pub fn get(&self) -> f64 {
        self.kp*self.e + self.kd*self.diff_e + self.ki*self.int_e
    }

    pub fn update(&mut self, e : f64, dt : f64){
        self.diff_e = (e - self.e)/dt;
        self.int_e += e * dt;
        self.e = e;
    }
}
