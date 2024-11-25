let maindiv = (document.getElementById('pannelcreate'));
let act1_div;
function activity1() {
    let text = `
    <div class='divide'>
        <div style='margin-top: 2vw;'>
            <br>
            <h4 class="center-text fs-20px fw-600">Forced and Natural Convection (Heat & Mass Transfer): Thermal Boundary Layer</h4>
            <br>
            <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
        </div>
    </div>`;
    maindiv.innerHTML = text;
    setTimeout(() => {
        MathJax.typeset();
    }, 300);
    internal_calculation1();
}
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text('Activity 1', 'act1-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' style='margin-top: 2vw; margin: auto;' id='act1-div'>
      <h3>Activity 1</h3>
      <br>
      <br>

      <p style="text-align:left">
         The air has viscosity ${mu_a1 / Math.pow(10, -5)}&times;10<sup>-5</sup> kg/m-s at ${T_inf_a1}&deg;C at 1atm. <br>
         Its heat capacity is ${Cp_a1} J/kg-K , K = ${K_a1} W/m-K and &rho; = ${rho_a1} kg/m<sup>3</sup> <br>
         Air is flowing over a falt plate at ${Tw_a1}&deg;C with an approach velocity of ${v_a1}m/s.<br>
      </p>
      <ol type="i" style="text-align:left">
            Find :
            <li>the distance from the leading edge where the velocity is ${Ux_a1}m/s at a height of ${del_a1}m above the plate</li>
            <li>the height above the plate where temperature is ${Th_a1}&deg;C</li>
         </ol>
      <br>

      <div class="row justify-content-center">
         <div class="col-sm-3">T<sub>w</sub> = ${Tw_a1}&deg;C</div>
         <div class="col-sm-3">T<sub>h</sub> = ${Th_a1}&deg;C</div>
         <div class="col-sm-3">T<sub>&#8734;</sub> = ${T_inf_a1}&deg;C</div>
      </div>
      <br>

      <p class="fs-24px fb-600" style="text-align:left;">
         Velocity Boundary Layer
      </p>

      <div id="act1-u-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-1">
               $$\\frac{U_x}{U_{\∞}} =  $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input type='text' style="margin:0 2%; width:70%" id='act1-u-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_u();' id='act1-vf-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
    act1_div = document.getElementById('act1-div');
}
function internal_calculation1() {
    Tw_a1 = random1(55, 61);
    Ux_a1 = parseFloat(random(2.95, 2.98).toFixed(2));
    Th_a1 = parseFloat(random(27.2, 27.4).toFixed(1));
    U_a1 = Ux_a1 / v_a1;
    Rex_a1 = (rho_a1 * v_a1) / mu_a1;
    x_a1 = 1;
    for (let i = 1; i <= 100; i++) {
        x_a1 = (del_a1 * Math.sqrt(Rex_a1 * x_a1)) / 4.64;
    }
    T_a1 = (Tw_a1 - Th_a1) / (Tw_a1 - T_inf_a1);
    Pr_a1 = (mu_a1 * Cp_a1) / K_a1;
    del_t_a1 = del_a1 / (1.026 * Math.pow(Pr_a1, (1 / 3)));
    console.log('Tw_a1', Tw_a1);
    console.log('Ux_a1', Ux_a1);
    console.log('Th_a1', Th_a1);
    console.log('U_a1', U_a1);
    console.log('Rex_a1', Rex_a1);
    console.log('x_a1', x_a1);
    console.log('T_a1', T_a1);
    console.log('Pr_a1', Pr_a1);
    console.log('del_t_a1', del_t_a1);
}
function a1_verify_u() {
    let inp = (document.getElementById('act1-u-inp'));
    console.log(U_a1);
    if (!verify_values(parseFloat(inp.value), U_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-u-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$\\frac{U_x}{U_{\∞}} = ${parseFloat(U_a1.toFixed(2))} $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p>
         $$
            \∴ \δ = ${del_a1}\\ m
         $$
      </p>

      <div id="act1-Rex-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$Re_x = \\frac{\ρvx}{\μ} = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-Rex-inp' class='form-control fs-16px' /><span style="display:contents;"> $$x$$</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_Rex();' id='act1-vf-btn2'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_Rex() {
    let inp = (document.getElementById('act1-Rex-inp'));
    console.log(Rex_a1);
    if (!verify_values(parseFloat(inp.value), Rex_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-Rex-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Re_x = \\frac{\ρvx}{\μ} =  ${parseFloat(Rex_a1.toFixed(2))}x $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p class="fs-24px fb-600" style="text-align:left;">
         Now
      </p>
      <p>
         $$
            \δ = \\frac{4.64x}{\\sqrt{Rex}}
         $$
      </p>
      <div id="act1-x-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-1">
               $$x = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-x-inp' class='form-control fs-16px' /><span style="display:contents;">m</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_x();' id='act1-vf-btn3'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_x() {
    let inp = (document.getElementById('act1-x-inp'));
    console.log(x_a1);
    if (!verify_values(parseFloat(inp.value), x_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-x-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$x =  ${parseFloat(x_a1.toFixed(2))} \\ m $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p class="fs-24px fb-600" style="text-align:left;">
         Thermal Boundary Layer
      </p>
      <div id="act1-T-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$\\frac{T_w - T_h}{T_w - T_{\∞}} = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:90%" id='act1-T-inp' class='form-control fs-16px' />
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_T();' id='act1-vf-btn4'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_T() {
    let inp = (document.getElementById('act1-T-inp'));
    console.log(T_a1);
    if (!verify_values(parseFloat(inp.value), T_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-T-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$\\frac{T_w - T_h}{T_w - T_{\∞}} =  ${parseFloat(T_a1.toFixed(2))} $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p class="fs-24px fb-600" style="text-align:left;">
         Now, Prandtl number
      </p>
      <div id="act1-Pr-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$Pr = \\frac{\μC_p}{K} = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-Pr-inp' class='form-control fs-16px' />
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_Pr();' id='act1-vf-btn5'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_Pr() {
    let inp = (document.getElementById('act1-Pr-inp'));
    console.log(Pr_a1);
    if (!verify_values(parseFloat(inp.value), Pr_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-Pr-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Pr = \\frac{\μC_p}{K} =  ${parseFloat(Pr_a1.toFixed(3))} $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      <p>
         $$
            \\frac{\δ_t}{\δ} = \\frac{1}{1.026 \× Pr^{1/3}}
         $$
      </p>
      <div id="act1-del-t-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-1">
               $$\δ_t = $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act1-del-t-inp' class='form-control fs-16px' /><span style="display:contents;">m</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a1_verify_del_t();' id='act1-vf-btn6'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a1_verify_del_t() {
    let inp = (document.getElementById('act1-del-t-inp'));
    console.log(del_t_a1);
    if (!verify_values(parseFloat(inp.value), del_t_a1)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act1-del-t-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$\δ_t =  ${parseFloat(del_t_a1.toFixed(4))} \\ m $$
      </p>
      <br>
   `;
    act1_div.innerHTML += `
      
         <button class='btn btn-info btn-sm std-btn' onclick='activity2(this);' id='act1-btn1'>Next</button>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function activity_completed(btn) {
    btn && btn.remove();
    alert('Experiment Completed');
}
activity1();
//# sourceMappingURL=activity1.js.map