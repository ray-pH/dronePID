use std::ops;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct V2 {
    pub x : f32, 
    pub y : f32,
}

#[wasm_bindgen]
impl V2 {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32) -> Self {
        Self { x, y }
    }

    pub fn rotate(&self, angle : f32) -> Self {
        let xnew = self.x * angle.cos() - self.y * angle.sin();
        let ynew = self.x * angle.sin() + self.y * angle.cos();
        Self { x:xnew, y:ynew }
    }
}

impl ops::Add for V2 {
    type Output = Self;
    fn add(self, other: Self) -> Self::Output {
        V2 { x:self.x + other.x, y:self.y + other.y}
    }
}
impl ops::Sub for V2 {
    type Output = Self;
    fn sub(self, other: Self) -> Self::Output {
        V2 { x:self.x - other.x, y:self.y - other.y}
    }
}
impl ops::Mul<f32> for V2 {
    type Output = Self;
    fn mul(self, scalar: f32) -> Self::Output {
        V2 { x:self.x * scalar, y:self.y * scalar}
    }
}

impl ops::AddAssign for V2 {
    fn add_assign(&mut self, other : Self) {
        self.x += other.x;
        self.y += other.y;
    }
}
