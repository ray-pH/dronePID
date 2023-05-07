pub type DiffFun = fn(t : f32, y : &Vec<f32>) -> Vec<f32>;

pub fn euler(f : DiffFun, t0 : f32, y0 : &Vec<f32>, dt : f32) -> Vec<f32> {
// dy/dt = f -> y' = y + f dt
    let mut result : Vec<f32> = Vec::with_capacity(y0.len());
    let n = y0.len();
    let f_vec  : Vec<f32> = f(t0, &y0);
    for i in 0..n {
        result[i] = y0[i] + f_vec[i] * dt;
    }
    return result;
}
