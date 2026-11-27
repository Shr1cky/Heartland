import { useEffect, useId, useRef, useState } from "react";

/* Heartland brand primitives: duotone pairs, the heart mark, the 4-fold mirrored
   "5. element" inkblot canvas and the loading screen. */

export type PairKey = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

/* Brand Farver – Duotone kombinationer: [background, ink] */
export const PAIRS: Record<PairKey, [string, string]> = {
  a: ["#275C4C", "#2DEA8B"],
  b: ["#FFC0F0", "#752A64"],
  c: ["#0F216A", "#207DFF"],
  d: ["#FF9FA0", "#801C0D"],
  e: ["#000000", "#EE5BCA"],
  f: ["#B1FFD8", "#275C4C"],
  g: ["#FFFFFF", "#207DFF"],
  h: ["#752A64", "#FFC0F0"],
};

/* Accepts any CSS colour the browser understands (#fff, #ffffff, rgb(), names) → [r, g, b] in 0–1. */
let probe: CanvasRenderingContext2D | null = null;
const rgb = (color: string): [number, number, number] => {
  let hex = color.trim();
  if (!/^#[0-9a-f]{6}$/i.test(hex)) {
    probe ??= document.createElement("canvas").getContext("2d");
    if (probe) {
      probe.fillStyle = "#000";
      probe.fillStyle = hex;
      hex = String(probe.fillStyle);
    }
  }
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
};
const luminance = (hex: string) => {
  const [r, g, b] = rgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/* One SVG filter per pair: photo luminance mapped dark → darker colour, light → lighter colour. */
export function DuotoneFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      {(Object.keys(PAIRS) as PairKey[]).map((key) => {
        const [a, b] = PAIRS[key];
        const [dark, light] = luminance(a) < luminance(b) ? [a, b] : [b, a];
        const d = rgb(dark);
        const l = rgb(light);
        return (
          <filter id={`hl-duo-${key}`} key={key} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values=".2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  .2126 .7152 .0722 0 0  0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={`${d[0]} ${l[0]}`} />
              <feFuncG type="table" tableValues={`${d[1]} ${l[1]}`} />
              <feFuncB type="table" tableValues={`${d[2]} ${l[2]}`} />
            </feComponentTransfer>
          </filter>
        );
      })}
    </svg>
  );
}

/* The heart path, fitted to the logo construction drawing. Tip at (−5.89, 0), mark spans x ±75, y −103…0. */
export const HEART =
  "M-5.89 0.00 L23.56 -61.73 A28.82 28.82 0 1 0 -28.90 -85.57 A28.82 28.82 0 1 0 -62.33 -38.64 Z";

type MarkPose = { lT?: string; rT?: string; joined?: number };

/* The joined mark (or two hearts in motion when lT/rT are given). Uses currentColor. */
export function MarkGroup({ lT = "", rT = "scale(-1 1)", joined = 1 }: MarkPose) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const L = `${id}l`;
  const R = `${id}r`;
  return (
    <>
      <defs>
        <clipPath id={L}>
          <path d={HEART} transform={lT} />
        </clipPath>
        <clipPath id={R}>
          <path d={HEART} transform={rT} />
        </clipPath>
        <clipPath id={`${id}below`}>
          <rect x="-800" y="-85.6" width="1600" height="900" />
        </clipPath>
        <clipPath id={`${id}zl`}>
          <rect x="-28.9" y="-140" width="28.9" height="54.4" />
        </clipPath>
        <clipPath id={`${id}zr`}>
          <rect x="0" y="-140" width="28.9" height="54.4" />
        </clipPath>
        <mask
          id={`${id}gaps`}
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="-800"
          y="-800"
          width="1600"
          height="1600"
        >
          <rect x="-800" y="-800" width="1600" height="1600" fill="#fff" />
          <g opacity={joined}>
            <rect x="-28.9" y="-140" width="57.8" height="54.4" fill="#000" />
            <g clipPath={`url(#${id}zl)`}>
              <path d={HEART} transform={rT} fill="#fff" />
            </g>
            <g clipPath={`url(#${id}zr)`}>
              <path d={HEART} transform={lT} fill="#fff" />
            </g>
          </g>
          <g clipPath={`url(#${id}below)`}>
            <g clipPath={`url(#${R})`}>
              <path d={HEART} transform={lT} fill="none" stroke="#000" strokeWidth="6.4" />
            </g>
            <g clipPath={`url(#${L})`}>
              <path d={HEART} transform={rT} fill="none" stroke="#000" strokeWidth="6.4" />
            </g>
          </g>
        </mask>
      </defs>
      <g fill="currentColor">
        <g mask={`url(#${id}gaps)`}>
          <path d={HEART} transform={lT} />
          <path d={HEART} transform={rT} />
        </g>
        <g clipPath={`url(#${L})`}>
          <path d={HEART} transform={rT} stroke="currentColor" strokeWidth="1.4" />
        </g>
        <g clipPath={`url(#${R})`}>
          <path d={HEART} transform={lT} fill="none" stroke="currentColor" strokeWidth="1.4" />
        </g>
      </g>
    </>
  );
}

export function HeartlandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-78 -106 156 110" className={className} aria-hidden="true">
      <MarkGroup />
    </svg>
  );
}

export function Lockup({ label = "Heartland" }: { label?: string }) {
  return (
    <span className="hl-lockup">
      <HeartlandMark />
      <b>{label}</b>
    </span>
  );
}

/* ---------- "5. element": four-fold mirrored inkblot shapes (WebGL) ---------- */

export type InkParams = {
  /* ellipses kept free of shapes, in CSS px of the canvas box: [cx, cy, rx, ry] */
  clear?: [number, number, number, number][];
  pulse?: number;
  warp?: number;
};

const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uT, uPx, uNorm, uPulse, uWarp, uRot;
uniform vec3 uBg, uInk;
uniform vec4 uC1, uC2;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y) * 2. - 1.;
}
float field(vec2 q){
  vec2 w = vec2(noise(q * 3.1 + vec2(uT * .11, 0.)), noise(q * 3.1 + vec2(5.2, -uT * .09)));
  w += .5 * vec2(noise(q * 6.3 - uT * .07), noise(q * 6.3 + vec2(2.7, uT * .08)));
  q += uWarp * w;
  float f = 0.;
  for (int i = 0; i < 12; i++) {
    float k = float(i);
    vec2 c = vec2(-.03 + .27 * (.5 + .5 * sin(uT * (.13 + .031 * k) + k * 1.7)), -.03 + .5 * (.5 + .5 * sin(uT * (.09 + .023 * k) + k * 2.3)));
    float r = .036 + .026 * (.5 + .5 * sin(uT * .21 + k * .9));
    if (i > 7) r *= .38;
    vec2 d = q - c;
    f += r * r / (dot(d, d) + 1e-5);
  }
  return f;
}
void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uPx;
  vec2 size = uRes / uPx;
  vec2 ctr = size * .5;
  vec2 q = abs(px - ctr) / uNorm;
  float f = field(uRot > .5 ? q.yx : q);
  f *= 1. + .5 * uPulse;
  vec2 m = ctr + abs(px - ctr);
  f *= smoothstep(.78, 1.3, length((m - uC1.xy) / uC1.zw));
  f *= smoothstep(.78, 1.3, length((m - uC2.xy) / uC2.zw));
  float g = log(f + 1e-6);
#ifdef HAS_D
  float aa = max(fwidth(g) * .8, 1e-4);
#else
  float aa = .04;
#endif
  gl_FragColor = vec4(mix(uBg, uInk, smoothstep(-aa, aa, g)), 1.);
}`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function InkblotCanvas({
  colors,
  params,
  seed = 0,
  maxScale = 1.5,
}: {
  colors?: [string, string];
  params?: (t: number) => InkParams;
  seed?: number;
  maxScale?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const maxScaleRef = useRef(maxScale);
  maxScaleRef.current = maxScale;
  const colorsRef = useRef(colors);
  const paramsRef = useRef(params);
  colorsRef.current = colors;
  paramsRef.current = params;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl || gl.isContextLost()) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = sh(gl.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}");
    const ext = gl.getExtension("OES_standard_derivatives");
    const fs = sh(
      gl.FRAGMENT_SHADER,
      (ext ? "#extension GL_OES_standard_derivatives : enable\n#define HAS_D 1\n" : "") + FRAG,
    );
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      res: u("uRes"),
      t: u("uT"),
      px: u("uPx"),
      norm: u("uNorm"),
      pulse: u("uPulse"),
      warp: u("uWarp"),
      rot: u("uRot"),
      bg: u("uBg"),
      ink: u("uInk"),
      c1: u("uC1"),
      c2: u("uC2"),
    };

    let cssColors: [string, string] | null = null;
    const readCss = () => {
      const cs = getComputedStyle(canvas);
      const bg = cs.getPropertyValue("--bg").trim();
      const ink = cs.getPropertyValue("--ink").trim();
      if (bg && ink) cssColors = [bg, ink];
    };
    readCss();

    let w = 0;
    let h = 0;
    let scale = 1;
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      scale = Math.min(window.devicePixelRatio || 1, maxScaleRef.current);
      canvas.width = Math.max(1, Math.round(w * scale));
      canvas.height = Math.max(1, Math.round(h * scale));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      const [bg, ink] = colorsRef.current ?? cssColors ?? ["#000000", "#ffffff"];
      const p = paramsRef.current?.(t) ?? {};
      const far: [number, number, number, number] = [-1e5, -1e5, 1, 1];
      const c1 = p.clear?.[0] ?? far;
      const c2 = p.clear?.[1] ?? far;
      const warp = p.warp ?? 0.03 + 0.13 * (0.5 - 0.5 * Math.cos((t * Math.PI * 2) / 16));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.px, scale);
      // portrait boxes show the pattern upright; wide strips lay it on its side
      const wide = w > h;
      gl.uniform1f(U.rot, wide ? 1 : 0);
      gl.uniform1f(U.norm, wide ? Math.max(w, h * 1.78) : Math.max(h, w * 1.78));
      gl.uniform1f(U.t, t + 40 + seed);
      gl.uniform1f(U.pulse, p.pulse ?? 0);
      gl.uniform1f(U.warp, warp);
      gl.uniform3f(U.bg, ...rgb(bg));
      gl.uniform3f(U.ink, ...rgb(ink));
      gl.uniform4f(U.c1, ...c1);
      gl.uniform4f(U.c2, ...c2);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let frame = 0;
    const start = performance.now();
    if (prefersReducedMotion()) {
      draw(4.2);
    } else {
      const tick = (now: number) => {
        if (++frame % 30 === 0) {
          readCss();
          if (
            Math.abs(
              canvas.width - w * Math.min(window.devicePixelRatio || 1, maxScaleRef.current),
            ) > 2
          )
            resize();
        }
        draw((now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      // free the GPU context once the canvas has really left the page
      // (StrictMode re-runs effects on the same, still-attached canvas)
      window.setTimeout(() => {
        if (!canvas.isConnected) gl.getExtension("WEBGL_lose_context")?.loseContext();
      }, 0);
    };
  }, [seed]);

  return <canvas ref={ref} className="hl-inkblot" aria-hidden="true" />;
}

/* ---------- Loading screen: two hearts click together into the logo ---------- */

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeIn = (x: number) => x * x * x;
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

const CLICK = 1.55;
/* the lockup and 100% land at 3.2 s; hold there for 1 s, then fade */
const LOCKED = 3.2;
export const SPLASH_HOLD = 1;
export const SPLASH_DURATION = LOCKED + SPLASH_HOLD;

function splashFrame(t: number, textWidth: number) {
  const Dmax = 98;
  const tiltMax = 11;
  let D: number;
  let tilt: number;
  let squash = 1;
  let pulse = 0;
  const tau = t - CLICK;
  if (t < CLICK) {
    const k = easeIn(seg(t, 0.25, CLICK));
    D = Dmax * (1 - k);
    tilt = tiltMax * (1 - k);
  } else {
    D = -3.2 * Math.exp(-7 * tau) * Math.sin(22 * tau);
    tilt = -2.2 * Math.exp(-7 * tau) * Math.sin(22 * tau);
    squash = 1 + 0.06 * Math.exp(-6 * tau) * Math.sin(18 * tau + 0.9);
    pulse = Math.exp(-3.2 * tau);
  }
  const bob = Math.sin(t * 2.6) * 5 * clamp(D / Dmax);
  const reveal = ease(seg(t, 2.3, LOCKED));
  const S1 = 1;
  const S0 = 2.6;
  const S = mix(S0, S1, reveal) * squash;
  const gap = 32;
  const lockW = 150 * S1 + gap + textWidth;
  const lockLeft = 540 - lockW / 2;
  const cx = mix(540, lockLeft + 75 * S1, reveal);
  const cy = 960;
  const heroRx = (75 + Math.max(D, 0)) * S0 + 70;
  const heroRy = 52 * S0 + 80;
  const lockRx = lockW / 2 + 90;
  const lockRy = 52 * S1 + 110;
  return {
    clicked: t >= CLICK,
    markT: `translate(${cx.toFixed(2)} ${cy}) scale(${S.toFixed(4)}) translate(0 51.5)`,
    lT: `translate(${(-D).toFixed(2)} ${(-bob).toFixed(2)}) rotate(${(-tilt).toFixed(2)} -5.89 0)`,
    rT: `translate(${D.toFixed(2)} ${bob.toFixed(2)}) scale(-1 1) rotate(${(-tilt).toFixed(2)} -5.89 0)`,
    joined: clamp(1 - (Math.abs(D) - 4) / 8),
    textLeft: lockLeft + 150 * S1 + gap,
    textClip: (1 - reveal) * 104,
    textShift: -(1 - reveal) * 40,
    textOpacity: clamp(reveal * 1.6),
    pct: Math.round(ease(seg(t, 0, LOCKED)) * 100),
    ink: {
      clear: [
        [540, cy, mix(heroRx, lockRx, reveal), mix(heroRy, lockRy, reveal)],
        [540, 1716, 270, 100],
      ] as [number, number, number, number][],
      pulse,
    },
  };
}

export function Splash({
  from,
  to,
  label,
  onDone,
}: {
  from: PairKey;
  to: PairKey;
  label: string;
  onDone: () => void;
}) {
  const reduced = prefersReducedMotion();
  const [t, setT] = useState(reduced ? LOCKED : 0);
  const [out, setOut] = useState(false);
  const [scale, setScale] = useState(1);
  const [textWidth, setTextWidth] = useState(586);
  const textRef = useRef<HTMLParagraphElement>(null);
  const tRef = useRef(t);
  const widthRef = useRef(textWidth);
  widthRef.current = textWidth;

  useEffect(() => {
    const fit = () => setScale(Math.max(window.innerWidth / 1080, window.innerHeight / 1920));
    fit();
    window.addEventListener("resize", fit);
    const measure = () => textRef.current && setTextWidth(textRef.current.offsetWidth);
    measure();
    // Time advances only with frames that are actually drawn, so the full sequence
    // plays even if the page loads in a background tab or behind another panel.
    let raf = 0;
    let last = 0;
    let finished = false;
    let alive = true;
    const finish = () => {
      if (finished || !alive) return;
      finished = true;
      setOut(true);
      window.setTimeout(onDone, 500);
    };
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 0;
      last = now;
      const next = Math.min(tRef.current + dt, SPLASH_DURATION);
      tRef.current = next;
      setT(next);
      if (next >= SPLASH_DURATION) return finish();
      raf = requestAnimationFrame(tick);
    };
    if (reduced) {
      // reduced motion: show the finished logo at 100% for the hold time
      tRef.current = LOCKED;
      setT(LOCKED);
      const id = window.setTimeout(finish, SPLASH_HOLD * 1000);
      return () => {
        window.clearTimeout(id);
        window.removeEventListener("resize", fit);
      };
    }
    // start once the wordmark font is ready (or after 1.5 s at most)
    let started = false;
    const begin = () => {
      if (started || !alive) return;
      started = true;
      measure();
      raf = requestAnimationFrame(tick);
    };
    document.fonts?.ready.then(begin);
    const fallback = window.setTimeout(begin, 1500);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("resize", fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fr = splashFrame(t, textWidth);
  const pair = PAIRS[fr.clicked ? to : from];

  return (
    <div
      className={`hl-splash ${out ? "out" : ""}`}
      style={{ ["--bg" as string]: pair[0], ["--ink" as string]: pair[1], color: pair[1] }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={fr.pct}
    >
      <div
        className="hl-splash-stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <InkblotCanvas
          colors={pair}
          maxScale={Math.min(1, scale * (window.devicePixelRatio || 1))}
          params={() => splashFrame(tRef.current, widthRef.current).ink}
        />
        <svg
          width="1080"
          height="1920"
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
          aria-hidden="true"
        >
          <g transform={fr.markT}>
            <MarkGroup lT={fr.lT} rT={fr.rT} joined={fr.joined} />
          </g>
        </svg>
        <p
          ref={textRef}
          className="hl-splash-word"
          style={{
            left: fr.textLeft,
            top: 960 - 64,
            clipPath: `inset(-20% ${fr.textClip}% -20% -2%)`,
            transform: `translateX(${fr.textShift}px)`,
            opacity: fr.textOpacity,
          }}
        >
          Heartland
        </p>
        <div className="hl-splash-progress">
          <div>
            <span>{label}</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{fr.pct}%</span>
          </div>
          <div>
            <i style={{ width: `${fr.pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* The joined mark as a standalone SVG string (for cheap repeated use as an <img>). */
export function markDataUri(color: string) {
  const H = HEART;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-78 -106 156 110"><defs><clipPath id="l"><path d="${H}"/></clipPath><clipPath id="r"><path d="${H}" transform="scale(-1 1)"/></clipPath><clipPath id="b"><rect x="-100" y="-85.6" width="200" height="200"/></clipPath><clipPath id="zl"><rect x="-28.9" y="-140" width="28.9" height="54.4"/></clipPath><clipPath id="zr"><rect x="0" y="-140" width="28.9" height="54.4"/></clipPath><mask id="g" maskUnits="userSpaceOnUse" x="-100" y="-150" width="200" height="200"><rect x="-100" y="-150" width="200" height="200" fill="#fff"/><rect x="-28.9" y="-140" width="57.8" height="54.4" fill="#000"/><g clip-path="url(#zl)"><path d="${H}" transform="scale(-1 1)" fill="#fff"/></g><g clip-path="url(#zr)"><path d="${H}" fill="#fff"/></g><g clip-path="url(#b)"><g clip-path="url(#r)"><path d="${H}" fill="none" stroke="#000" stroke-width="6.4"/></g><g clip-path="url(#l)"><path d="${H}" transform="scale(-1 1)" fill="none" stroke="#000" stroke-width="6.4"/></g></g></mask></defs><g fill="${color}"><g mask="url(#g)"><path d="${H}"/><path d="${H}" transform="scale(-1 1)"/></g><g clip-path="url(#l)"><path d="${H}" transform="scale(-1 1)" stroke="${color}" stroke-width="1.4"/></g><g clip-path="url(#r)"><path d="${H}" fill="none" stroke="${color}" stroke-width="1.4"/></g></g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* Stand-in for a photo that fails to load: brand tint with the mark in the deep colour. */
export function photoPlaceholder(bg: string, ink: string) {
  const mark = markDataUri(ink);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/><image href="${mark}" xlink:href="${mark}" x="160" y="122" width="80" height="56"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* Scrolling band of festival lines separated by the heart mark. */
export function Ticker({ items, color }: { items: string[]; color: string }) {
  const mark = markDataUri(color);
  const row = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...row, ...row].map((text, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span>{text}</span>
            <img src={mark} alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}
