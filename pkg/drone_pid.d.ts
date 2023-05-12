/* tslint:disable */
/* eslint-disable */
/**
* @param {number} val
* @param {number} min
* @param {number} max
* @returns {number}
*/
export function clamp(val: number, min: number, max: number): number;
/**
*/
export class Controller {
  free(): void;
/**
* @param {Drone} drone
*/
  constructor(drone: Drone);
/**
* @param {number} kx
* @param {number} kdx
* @param {number} kix
* @param {number} ky
* @param {number} kdy
* @param {number} kiy
* @param {number} kq
* @param {number} kdq
* @param {number} kiq
*/
  change_pid_constants(kx: number, kdx: number, kix: number, ky: number, kdy: number, kiy: number, kq: number, kdq: number, kiq: number): void;
/**
* @param {number} x
* @param {number} y
*/
  set_setpoint(x: number, y: number): void;
/**
* @returns {number}
*/
  calc_target_angle(): number;
/**
*/
  apply_control(): void;
/**
* @param {number} dt
* @param {number} n
*/
  step_n_sim(dt: number, n: number): void;
/**
*/
  drone: Drone;
/**
*/
  setpoint: V2;
}
/**
*/
export class Drone {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @param {number} angle
* @param {number} length
* @param {number} mass
*/
  constructor(x: number, y: number, angle: number, length: number, mass: number);
/**
* @param {number} force
*/
  set_thrust_right(force: number): void;
/**
* @param {number} force
*/
  set_thrust_left(force: number): void;
/**
*/
  calc_acc(): void;
/**
* @param {number} dt
*/
  step_sim(dt: number): void;
/**
* @param {number} dt
* @param {number} n
*/
  step_n_sim(dt: number, n: number): void;
/**
*/
  angle: number;
/**
*/
  angular_acc: number;
/**
*/
  gravity: V2;
/**
*/
  inertia: number;
/**
*/
  length: number;
/**
*/
  mass: number;
/**
*/
  max_force: number;
/**
*/
  pos: V2;
/**
*/
  thrust_left: number;
/**
*/
  thrust_right: number;
}
/**
*/
export class DronePIDS {
  free(): void;
}
/**
*/
export class PID {
  free(): void;
/**
* @param {number} kp
* @param {number} kd
* @param {number} ki
*/
  constructor(kp: number, kd: number, ki: number);
/**
* @param {number} kp
* @param {number} kd
* @param {number} ki
*/
  set_constants(kp: number, kd: number, ki: number): void;
/**
* @returns {number}
*/
  get(): number;
/**
* @param {number} e
* @param {number} dt
*/
  update(e: number, dt: number): void;
/**
*/
  diff_e: number;
/**
*/
  e: number;
/**
*/
  int_e: number;
/**
*/
  kd: number;
/**
*/
  ki: number;
/**
*/
  kp: number;
}
/**
*/
export class V2 {
  free(): void;
/**
* @param {number} x
* @param {number} y
*/
  constructor(x: number, y: number);
/**
* @param {number} angle
* @returns {V2}
*/
  rotate(angle: number): V2;
/**
* @returns {number}
*/
  modulus(): number;
/**
* @returns {V2}
*/
  normalize(): V2;
/**
* @returns {number}
*/
  angle(): number;
/**
* @param {V2} other
* @returns {number}
*/
  dot(other: V2): number;
/**
*/
  x: number;
/**
*/
  y: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_pid_free: (a: number) => void;
  readonly __wbg_get_pid_e: (a: number) => number;
  readonly __wbg_set_pid_e: (a: number, b: number) => void;
  readonly __wbg_get_pid_diff_e: (a: number) => number;
  readonly __wbg_set_pid_diff_e: (a: number, b: number) => void;
  readonly __wbg_get_pid_int_e: (a: number) => number;
  readonly __wbg_set_pid_int_e: (a: number, b: number) => void;
  readonly __wbg_get_pid_kp: (a: number) => number;
  readonly __wbg_set_pid_kp: (a: number, b: number) => void;
  readonly __wbg_get_pid_kd: (a: number) => number;
  readonly __wbg_set_pid_kd: (a: number, b: number) => void;
  readonly __wbg_get_pid_ki: (a: number) => number;
  readonly __wbg_set_pid_ki: (a: number, b: number) => void;
  readonly pid_new: (a: number, b: number, c: number) => number;
  readonly pid_set_constants: (a: number, b: number, c: number, d: number) => void;
  readonly pid_get: (a: number) => number;
  readonly pid_update: (a: number, b: number, c: number) => void;
  readonly __wbg_v2_free: (a: number) => void;
  readonly __wbg_get_v2_x: (a: number) => number;
  readonly __wbg_set_v2_x: (a: number, b: number) => void;
  readonly __wbg_get_v2_y: (a: number) => number;
  readonly __wbg_set_v2_y: (a: number, b: number) => void;
  readonly v2_rotate: (a: number, b: number) => number;
  readonly v2_modulus: (a: number) => number;
  readonly v2_normalize: (a: number) => number;
  readonly v2_angle: (a: number) => number;
  readonly v2_dot: (a: number, b: number) => number;
  readonly v2_new: (a: number, b: number) => number;
  readonly clamp: (a: number, b: number, c: number) => number;
  readonly __wbg_drone_free: (a: number) => void;
  readonly __wbg_get_drone_pos: (a: number) => number;
  readonly __wbg_set_drone_pos: (a: number, b: number) => void;
  readonly __wbg_get_drone_angle: (a: number) => number;
  readonly __wbg_set_drone_angle: (a: number, b: number) => void;
  readonly __wbg_get_drone_angular_acc: (a: number) => number;
  readonly __wbg_set_drone_angular_acc: (a: number, b: number) => void;
  readonly __wbg_get_drone_thrust_left: (a: number) => number;
  readonly __wbg_set_drone_thrust_left: (a: number, b: number) => void;
  readonly __wbg_get_drone_thrust_right: (a: number) => number;
  readonly __wbg_set_drone_thrust_right: (a: number, b: number) => void;
  readonly __wbg_get_drone_length: (a: number) => number;
  readonly __wbg_set_drone_length: (a: number, b: number) => void;
  readonly __wbg_get_drone_mass: (a: number) => number;
  readonly __wbg_set_drone_mass: (a: number, b: number) => void;
  readonly __wbg_get_drone_inertia: (a: number) => number;
  readonly __wbg_set_drone_inertia: (a: number, b: number) => void;
  readonly __wbg_get_drone_max_force: (a: number) => number;
  readonly __wbg_set_drone_max_force: (a: number, b: number) => void;
  readonly __wbg_get_drone_gravity: (a: number) => number;
  readonly __wbg_set_drone_gravity: (a: number, b: number) => void;
  readonly drone_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly drone_set_thrust_right: (a: number, b: number) => void;
  readonly drone_set_thrust_left: (a: number, b: number) => void;
  readonly drone_calc_acc: (a: number) => void;
  readonly drone_step_sim: (a: number, b: number) => void;
  readonly drone_step_n_sim: (a: number, b: number, c: number) => void;
  readonly __wbg_dronepids_free: (a: number) => void;
  readonly __wbg_controller_free: (a: number) => void;
  readonly __wbg_get_controller_drone: (a: number) => number;
  readonly __wbg_set_controller_drone: (a: number, b: number) => void;
  readonly __wbg_get_controller_setpoint: (a: number) => number;
  readonly __wbg_set_controller_setpoint: (a: number, b: number) => void;
  readonly controller_new: (a: number) => number;
  readonly controller_change_pid_constants: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly controller_set_setpoint: (a: number, b: number, c: number) => void;
  readonly controller_calc_target_angle: (a: number) => number;
  readonly controller_apply_control: (a: number) => void;
  readonly controller_step_n_sim: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
