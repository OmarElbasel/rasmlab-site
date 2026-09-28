"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Domain-warped fbm "ink in water", tinted with the brand accents and pushed
// around by the pointer. uProgress drives the intro bloom, uScroll the exit.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uProgress;
  uniform float uScroll;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m; m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
  float fbm(vec2 p){
    float f=0.0; float a=0.5;
    for(int i=0;i<4;i++){ f+=a*snoise(p); p=p*2.02+vec2(1.7,9.2); a*=0.5; }
    return f;
  }

  void main(){
    vec2 uv=vUv;
    vec2 p=(uv-0.5)*vec2(uRes.x/uRes.y,1.0);
    vec2 m=(uMouse-0.5)*vec2(uRes.x/uRes.y,1.0);

    float t=uTime*0.06;
    float d=length(p-m);
    // swirl around the pointer
    float ang=0.9*exp(-d*3.0);
    p=mat2(cos(ang),-sin(ang),sin(ang),cos(ang))*(p-m)+m;

    vec2 q=vec2(fbm(p*1.4+t), fbm(p*1.4-t+3.1));
    vec2 r=vec2(fbm(p*1.6+2.0*q+vec2(1.7,9.2)+t*1.3), fbm(p*1.6+2.0*q+vec2(8.3,2.8)-t));
    float f=fbm(p*1.2+2.4*r);

    vec3 ink=vec3(0.043,0.043,0.047);
    vec3 accent=vec3(1.0,0.30,0.12);
    vec3 violet=vec3(0.49,0.36,1.0);
    vec3 paper=vec3(0.925,0.91,0.875);

    vec3 col=ink;
    col=mix(col, violet*0.55, smoothstep(0.0,0.9,length(q))*0.55);
    col=mix(col, accent, smoothstep(0.15,1.1,f+0.35*r.x)*0.8);
    col=mix(col, paper, smoothstep(0.75,1.25,f+r.y*0.4)*0.35);

    // vignette + intro bloom from the centre
    float vig=smoothstep(1.25,0.2,length((uv-0.5)*vec2(1.3,1.0)));
    float bloom=smoothstep(uProgress*1.6, uProgress*1.6-0.6, length(uv-0.5)*1.4);
    col*=vig*bloom;
    col=mix(col, ink, clamp(uScroll*1.2,0.0,1.0));

    // subtle dithering to avoid banding
    col+= (fract(sin(dot(uv*uTime,vec2(12.9898,78.233)))*43758.5453)-0.5)/255.0;
    gl_FragColor=vec4(col,1.0);
  }
`;

type Props = { progress: { current: number }; scroll: { current: number } };

function Plane({ progress, scroll }: Props) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    target.current.set(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5);
    mouse.current.lerp(target.current, Math.min(1, delta * 2.5));
    u.uTime.value += delta;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.copy(mouse.current);
    u.uProgress.value = progress.current;
    u.uScroll.value = scroll.current;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function HeroCanvas(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Plane {...props} />
    </Canvas>
  );
}
