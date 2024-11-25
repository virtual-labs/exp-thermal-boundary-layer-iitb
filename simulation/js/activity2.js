let act2_div;
function activity2(btn) {
    btn && btn.remove();
    internal_calculation2();
    let btn_text = get_collapse_btn_text('Activity 2', 'act2-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' style='margin-top: 2vw; margin: auto;' id='act2-div'>
      <h3>Activity 2</h3>
      <br>
      <br>
      <p style="text-align:left;">
         Air at ${T_air_a2}&deg;C and 1bar flows over a flat plate at ${v_a2}m/s. The plate is maintained at ${Tp_a2}&deg;C. <br>
         Calculate the heat transfer between ${x1_cm_a2}cm and ${x2_cm_a2}cm from the leading edge. <br>
         Assume width = unity. <br><br>
         The properties of air at mean temperature:
      </p>
      <div class='row justify-content-center'>
         <div class="col-md-3">
            &nu; = ${nu_a2 / Math.pow(10, -6)}&times;10<sup>-6</sup> m<sup>2</sup>/s
         </div>
         <div class="col-md-3">K = ${K_a2} W/m-K</div>
         <div class="col-md-3">Pr = ${Pr_a2}</div>
         <div class="col-md-3">C<sub>p</sub> = ${Cp_a2} J/kg-K</div>
      </div>
      <br>
      <p class="fs-24px fb-600" style="text-align:left;">
         ${x1_cm_a2}cm from leading edge
      </p>
      <div id="act2-Re-x1-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$ Re = \\frac{vx}{\\nu} =  $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act2-Re-x1-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_Re_x1();' id='act2-vf-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act2-div');
    }, 150);
    act2_div = document.getElementById('act2-div');
}
function internal_calculation2() {
    v_a2 = random1(1, 9);
    x1_cm_a2 = random1(10, 21);
    x1_m_a2 = x1_cm_a2 / 100;
    x2_cm_a2 = random1(30, 41);
    x2_m_a2 = x2_cm_a2 / 100;
    Re_x1_a2 = (v_a2 * x1_m_a2) / nu_a2;
    hx_x1_a2 = (0.332 * Math.pow(Re_x1_a2, 0.5) * Math.pow(Pr_a2, (1 / 2)) * K_a2) / x1_m_a2;
    h_avg_x1_a2 = 2 * hx_x1_a2;
    Q_x1_a2 = h_avg_x1_a2 * (x1_m_a2 * w_a2) * (Tp_a2 - T_air_a2);
    Re_x2_a2 = (v_a2 * x2_m_a2) / nu_a2;
    hx_x2_a2 = (0.332 * Math.pow(Re_x2_a2, 0.5) * Math.pow(Pr_a2, (1 / 2)) * K_a2) / x2_m_a2;
    h_avg_x2_a2 = 2 * hx_x2_a2;
    Q_x2_a2 = h_avg_x2_a2 * (x2_m_a2 * w_a2) * (Tp_a2 - T_air_a2);
    Q_a2 = Q_x2_a2 - Q_x1_a2;
    console.log('v_a2', v_a2);
    console.log('x1_cm_a2', x1_cm_a2);
    console.log('x1_m_a2', x1_m_a2);
    console.log('x2_cm_a2', x2_cm_a2);
    console.log('x2_m_a2', x2_m_a2);
    console.log('Re_x1_a2', Re_x1_a2);
    console.log('hx_x1_a2', hx_x1_a2);
    console.log('h_avg_x1_a2', h_avg_x1_a2);
    console.log('Q_x1_a2', Q_x1_a2);
    console.log('Re_x2_a2', Re_x2_a2);
    console.log('hx_x2_a2', hx_x2_a2);
    console.log('h_avg_x2_a2', h_avg_x2_a2);
    console.log('Q_x2_a2', Q_x2_a2);
    console.log('Q_a2', Q_a2);
}
function a2_verify_Re_x1() {
    let inp = (document.getElementById('act2-Re-x1-inp'));
    console.log(Re_x1_a2);
    if (!verify_values(parseFloat(inp.value), Re_x1_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-Re-x1-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Re = \\frac{vx}{\\nu} = ${parseFloat(Re_x1_a2.toFixed(2))} $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      <div>
         $$
            \∴ Re \\lt 3\×10^5
         $$
         $$
            NU_x = 0.332Re^{0.5}Pr^{1/3}
         $$
         <p style="text-align:left">
            Now
         </p>
         $$
            NU_x = \\frac{h_x \× x}{K}
         $$
         <p style="text-align:left">
            Local heat transfer coefficient
         </p>
      </div>

      <div id="act2-hx-x1-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-5">
               $$
            \∴ \\ h_x = 0.332 Re^{0.5}Pr^{1/3} \× \\frac{K}{x} = 
         $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-hx-x1-inp' class='form-control fs-16px' /><span style="display:contents;"> W/m<sup>2</sup>-K</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_hx_x1();' id='act2-vf-btn2'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_hx_x1() {
    let inp = (document.getElementById('act2-hx-x1-inp'));
    console.log(hx_x1_a2);
    if (!verify_values(parseFloat(inp.value), hx_x1_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-hx-x1-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$\∴ \\ h_x = 0.332 Re^{0.5}Pr^{1/3} \× \\frac{K}{x} = ${parseFloat(hx_x1_a2.toFixed(2))} \\ W/m^2-K $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p style="text-align:left">
         Average heat transfer coefficient
      </p>
      
      <div id="act2-h-avg-x1-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$
                  h_{avg} = 2h_x =  
               $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-h-avg-x1-inp' class='form-control fs-16px' /><span style="display:contents;"> W/m<sup>2</sup>-K</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_h_avg_x1();' id='act2-vf-btn3'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_h_avg_x1() {
    let inp = (document.getElementById('act2-h-avg-x1-inp'));
    console.log(h_avg_x1_a2);
    if (!verify_values(parseFloat(inp.value), h_avg_x1_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-h-avg-x1-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$h_{avg} = 2h_x = ${parseFloat(h_avg_x1_a2.toFixed(2))} \\ W/m^2-K $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p style="text-align:left">
         Heat transfer from ${x1_cm_a2}cm portion
      </p>
      
      <div id="act2-Q-x1-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$
                  Q_{${x1_cm_a2}} = h_{avg}\× A \× \ΔT =
               $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-Q-x1-inp' class='form-control fs-16px' /><span style="display:contents;"> W</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_Q_x1();' id='act2-vf-btn4'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_Q_x1() {
    let inp = (document.getElementById('act2-Q-x1-inp'));
    console.log(Q_x1_a2);
    if (!verify_values(parseFloat(inp.value), Q_x1_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-Q-x1-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q_{${x1_cm_a2}} = h_{avg}\× A \× \ΔT = ${parseFloat(Q_x1_a2.toFixed(2))} \\ W$$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p class="fs-24px fb-600" style="text-align:left;">
         ${x2_cm_a2}cm from leading edge
      </p>
      <div id="act2-Re-x2-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$ Re = \\frac{vx}{\\nu} =  $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act2-Re-x2-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_Re_x2();' id='act2-vf-btn5'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_Re_x2() {
    let inp = (document.getElementById('act2-Re-x2-inp'));
    console.log(Re_x2_a2);
    if (!verify_values(parseFloat(inp.value), Re_x2_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-Re-x2-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Re = \\frac{vx}{\\nu} = ${parseFloat(Re_x2_a2.toFixed(2))} $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      <div>
         $$
            \∴ Re \\lt 3\×10^5
         $$
         $$
            NU_x = 0.332Re^{0.5}Pr^{1/3}
         $$
         <p style="text-align:left">
            Now
         </p>
         $$
            NU_x = \\frac{h_x \× x}{K}
         $$
         <p style="text-align:left">
            Local heat transfer coefficient
         </p>
      </div>

      <div id="act2-hx-x2-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-5">
               $$
            \∴ \\ h_x = 0.332 Re^{0.5}Pr^{1/3} \× \\frac{K}{x} = 
         $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-hx-x2-inp' class='form-control fs-16px' /><span style="display:contents;"> W/m<sup>2</sup>-K</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_hx_x2();' id='act2-vf-btn6'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_hx_x2() {
    let inp = (document.getElementById('act2-hx-x2-inp'));
    console.log(hx_x2_a2);
    if (!verify_values(parseFloat(inp.value), hx_x2_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-hx-x2-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$\∴ \\ h_x = 0.332 Re^{0.5}Pr^{1/3} \× \\frac{K}{x} = ${parseFloat(hx_x2_a2.toFixed(2))} \\ W/m^2-K $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p style="text-align:left">
         Average heat transfer coefficient
      </p>
      
      <div id="act2-h-avg-x2-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$
                  h_{avg} = 2h_x =  
               $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-h-avg-x2-inp' class='form-control fs-16px' /><span style="display:contents;"> W/m<sup>2</sup>-K</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_h_avg_x2();' id='act2-vf-btn7'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_h_avg_x2() {
    let inp = (document.getElementById('act2-h-avg-x2-inp'));
    console.log(h_avg_x2_a2);
    if (!verify_values(parseFloat(inp.value), h_avg_x2_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-h-avg-x2-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$h_{avg} = 2h_x = ${parseFloat(h_avg_x2_a2.toFixed(2))} \\ W/m^2-K $$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p style="text-align:left">
         Heat transfer from ${x2_cm_a2}cm portion
      </p>
      
      <div id="act2-Q-x2-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$
                  Q_{${x2_cm_a2}} = h_{avg}\× A \× \ΔT =
               $$
            </div>
            <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:50%" id='act2-Q-x2-inp' class='form-control fs-16px' /><span style="display:contents;"> W</span>
            </div>

         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_Q_x2();' id='act2-vf-btn8'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_Q_x2() {
    let inp = (document.getElementById('act2-Q-x2-inp'));
    console.log(Q_x2_a2);
    if (!verify_values(parseFloat(inp.value), Q_x2_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-Q-x2-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q_{${x2_cm_a2}} = h_{avg}\× A \× \ΔT = ${parseFloat(Q_x2_a2.toFixed(2))} \\ W$$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      <p class="fs-24px fb-600" style="text-align:left;">
         Heat transfer between ${x1_cm_a2}cm and ${x2_cm_a2}cm portion
      </p>
      <div id="act2-Q-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$ Q = Q_{${x2_cm_a2}} - Q_{${x1_cm_a2}} =  $$
            </div>
            <div class="row justify-content-center col-md-3" style="flex-wrap:nowrap; align-items:center;">
               <input  type='number' style="margin:0 5px; width:70%" id='act2-Q-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='a2_verify_Q();' id='act2-vf-btn9'>Verify</button>
      </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function a2_verify_Q() {
    let inp = (document.getElementById('act2-Q-inp'));
    console.log(Q_a2);
    if (!verify_values(parseFloat(inp.value), Q_a2)) {
        inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('act2-Q-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$Q = Q_{${x2_cm_a2}} - Q_{${x1_cm_a2}}  = ${parseFloat(Q_a2.toFixed(2))} \\ W$$
      </p>
      <br>
   `;
    act2_div.innerHTML += `
      
      
         <button class='btn btn-info btn-sm std-btn' onclick='activity_completed(this);' id='act2-btn1'>Next</button>
      
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
// activity2();
//# sourceMappingURL=activity2.js.map