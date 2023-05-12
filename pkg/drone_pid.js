let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
* @param {number} val
* @param {number} min
* @param {number} max
* @returns {number}
*/
export function clamp(val, min, max) {
    const ret = wasm.clamp(val, min, max);
    return ret;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*/
export class Controller {

    static __wrap(ptr) {
        const obj = Object.create(Controller.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_controller_free(ptr);
    }
    /**
    * @returns {Drone}
    */
    get drone() {
        const ret = wasm.__wbg_get_controller_drone(this.ptr);
        return Drone.__wrap(ret);
    }
    /**
    * @param {Drone} arg0
    */
    set drone(arg0) {
        _assertClass(arg0, Drone);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_controller_drone(this.ptr, ptr0);
    }
    /**
    * @returns {V2}
    */
    get setpoint() {
        const ret = wasm.__wbg_get_controller_setpoint(this.ptr);
        return V2.__wrap(ret);
    }
    /**
    * @param {V2} arg0
    */
    set setpoint(arg0) {
        _assertClass(arg0, V2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_controller_setpoint(this.ptr, ptr0);
    }
    /**
    * @param {Drone} drone
    */
    constructor(drone) {
        _assertClass(drone, Drone);
        var ptr0 = drone.__destroy_into_raw();
        const ret = wasm.controller_new(ptr0);
        return Controller.__wrap(ret);
    }
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
    change_pid_constants(kx, kdx, kix, ky, kdy, kiy, kq, kdq, kiq) {
        wasm.controller_change_pid_constants(this.ptr, kx, kdx, kix, ky, kdy, kiy, kq, kdq, kiq);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    set_setpoint(x, y) {
        wasm.controller_set_setpoint(this.ptr, x, y);
    }
    /**
    * @returns {number}
    */
    calc_target_angle() {
        const ret = wasm.controller_calc_target_angle(this.ptr);
        return ret;
    }
    /**
    */
    apply_control() {
        wasm.controller_apply_control(this.ptr);
    }
    /**
    * @param {number} dt
    * @param {number} n
    */
    step_n_sim(dt, n) {
        wasm.controller_step_n_sim(this.ptr, dt, n);
    }
}
/**
*/
export class Drone {

    static __wrap(ptr) {
        const obj = Object.create(Drone.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_drone_free(ptr);
    }
    /**
    * @returns {V2}
    */
    get pos() {
        const ret = wasm.__wbg_get_drone_pos(this.ptr);
        return V2.__wrap(ret);
    }
    /**
    * @param {V2} arg0
    */
    set pos(arg0) {
        _assertClass(arg0, V2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_drone_pos(this.ptr, ptr0);
    }
    /**
    * @returns {number}
    */
    get angle() {
        const ret = wasm.__wbg_get_drone_angle(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set angle(arg0) {
        wasm.__wbg_set_drone_angle(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get angular_acc() {
        const ret = wasm.__wbg_get_drone_angular_acc(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set angular_acc(arg0) {
        wasm.__wbg_set_drone_angular_acc(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get thrust_left() {
        const ret = wasm.__wbg_get_drone_thrust_left(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set thrust_left(arg0) {
        wasm.__wbg_set_drone_thrust_left(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get thrust_right() {
        const ret = wasm.__wbg_get_drone_thrust_right(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set thrust_right(arg0) {
        wasm.__wbg_set_drone_thrust_right(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get length() {
        const ret = wasm.__wbg_get_drone_length(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set length(arg0) {
        wasm.__wbg_set_drone_length(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get mass() {
        const ret = wasm.__wbg_get_drone_mass(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set mass(arg0) {
        wasm.__wbg_set_drone_mass(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get inertia() {
        const ret = wasm.__wbg_get_drone_inertia(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set inertia(arg0) {
        wasm.__wbg_set_drone_inertia(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_force() {
        const ret = wasm.__wbg_get_drone_max_force(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_force(arg0) {
        wasm.__wbg_set_drone_max_force(this.ptr, arg0);
    }
    /**
    * @returns {V2}
    */
    get gravity() {
        const ret = wasm.__wbg_get_drone_gravity(this.ptr);
        return V2.__wrap(ret);
    }
    /**
    * @param {V2} arg0
    */
    set gravity(arg0) {
        _assertClass(arg0, V2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_drone_gravity(this.ptr, ptr0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} angle
    * @param {number} length
    * @param {number} mass
    */
    constructor(x, y, angle, length, mass) {
        const ret = wasm.drone_new(x, y, angle, length, mass);
        return Drone.__wrap(ret);
    }
    /**
    * @param {number} force
    */
    set_thrust_right(force) {
        wasm.drone_set_thrust_right(this.ptr, force);
    }
    /**
    * @param {number} force
    */
    set_thrust_left(force) {
        wasm.drone_set_thrust_left(this.ptr, force);
    }
    /**
    */
    calc_acc() {
        wasm.drone_calc_acc(this.ptr);
    }
    /**
    * @param {number} dt
    */
    step_sim(dt) {
        wasm.drone_step_sim(this.ptr, dt);
    }
    /**
    * @param {number} dt
    * @param {number} n
    */
    step_n_sim(dt, n) {
        wasm.drone_step_n_sim(this.ptr, dt, n);
    }
}
/**
*/
export class DronePIDS {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dronepids_free(ptr);
    }
}
/**
*/
export class PID {

    static __wrap(ptr) {
        const obj = Object.create(PID.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pid_free(ptr);
    }
    /**
    * @returns {number}
    */
    get e() {
        const ret = wasm.__wbg_get_pid_e(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set e(arg0) {
        wasm.__wbg_set_pid_e(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get diff_e() {
        const ret = wasm.__wbg_get_pid_diff_e(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set diff_e(arg0) {
        wasm.__wbg_set_pid_diff_e(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get int_e() {
        const ret = wasm.__wbg_get_pid_int_e(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set int_e(arg0) {
        wasm.__wbg_set_pid_int_e(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get kp() {
        const ret = wasm.__wbg_get_pid_kp(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set kp(arg0) {
        wasm.__wbg_set_pid_kp(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get kd() {
        const ret = wasm.__wbg_get_pid_kd(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set kd(arg0) {
        wasm.__wbg_set_pid_kd(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get ki() {
        const ret = wasm.__wbg_get_pid_ki(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set ki(arg0) {
        wasm.__wbg_set_pid_ki(this.ptr, arg0);
    }
    /**
    * @param {number} kp
    * @param {number} kd
    * @param {number} ki
    */
    constructor(kp, kd, ki) {
        const ret = wasm.pid_new(kp, kd, ki);
        return PID.__wrap(ret);
    }
    /**
    * @param {number} kp
    * @param {number} kd
    * @param {number} ki
    */
    set_constants(kp, kd, ki) {
        wasm.pid_set_constants(this.ptr, kp, kd, ki);
    }
    /**
    * @returns {number}
    */
    get() {
        const ret = wasm.pid_get(this.ptr);
        return ret;
    }
    /**
    * @param {number} e
    * @param {number} dt
    */
    update(e, dt) {
        wasm.pid_update(this.ptr, e, dt);
    }
}
/**
*/
export class V2 {

    static __wrap(ptr) {
        const obj = Object.create(V2.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_v2_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_v2_x(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_v2_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_v2_y(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_v2_y(this.ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        const ret = wasm.v2_new(x, y);
        return V2.__wrap(ret);
    }
    /**
    * @param {number} angle
    * @returns {V2}
    */
    rotate(angle) {
        const ret = wasm.v2_rotate(this.ptr, angle);
        return V2.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    modulus() {
        const ret = wasm.v2_modulus(this.ptr);
        return ret;
    }
    /**
    * @returns {V2}
    */
    normalize() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.v2_normalize(ptr);
        return V2.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    angle() {
        const ret = wasm.v2_angle(this.ptr);
        return ret;
    }
    /**
    * @param {V2} other
    * @returns {number}
    */
    dot(other) {
        _assertClass(other, V2);
        var ptr0 = other.__destroy_into_raw();
        const ret = wasm.v2_dot(this.ptr, ptr0);
        return ret;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_log_f4f1eb6498095209 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('drone_pid_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
