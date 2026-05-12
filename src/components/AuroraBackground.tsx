import { useEffect, useRef } from 'react';

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vert = `attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }`;

    const frag = `
precision mediump float;
uniform float t;
uniform vec2 r;

vec3 hsv(float h,float s,float v){
  vec4 K=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(vec3(h)+K.xyz)*6.-K.www);
  return v*mix(K.xxx,clamp(p-K.xxx,0.,1.),s);
}

void main(){
  vec2 uv=gl_FragCoord.xy/r;
  uv.y=1.-uv.y;

  float speed=t*0.12;

  // layer 1 — wide purple sweep
  float w1=0.18*sin(uv.x*3.14+speed)*exp(-4.*pow(uv.y-0.25,2.));
  // layer 2 — pink counter wave
  float w2=0.14*sin(uv.x*4.71-speed*0.8+1.2)*exp(-5.*pow(uv.y-0.55,2.));
  // layer 3 — indigo shimmer
  float w3=0.10*sin(uv.x*6.28+speed*1.3+2.4)*exp(-7.*pow(uv.y-0.42,2.));
  // layer 4 — wide base glow
  float w4=0.08*cos(uv.x*2.0-speed*0.5)*exp(-3.*pow(uv.y-0.7,2.));

  float aurora=w1+w2+w3+w4;

  // base dark purple
  vec3 base=vec3(0.07,0.04,0.15);

  // aurora colors
  vec3 c1=hsv(0.75+0.05*sin(speed),0.9,aurora*2.5); // purple
  vec3 c2=hsv(0.90+0.04*cos(speed*0.7),0.85,aurora*2.0); // pink
  vec3 c3=hsv(0.68,0.8,aurora*1.5); // indigo

  vec3 col=base+c1*step(0.,w1)+c2*step(0.,w2)+c3*step(0.,w3);

  // vignette
  float vig=uv.x*uv.y*(1.-uv.x)*(1.-uv.y)*16.;
  col*=0.8+0.2*vig;

  gl_FragColor=vec4(col,1.0);
}`;

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tLoc = gl.getUniformLocation(prog, 't');
    const rLoc = gl.getUniformLocation(prog, 'r');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(rLoc, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    const t0 = performance.now();
    const draw = () => {
      gl.uniform1f(tLoc, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, width: '100%', height: '100%' }}
    />
  );
}
