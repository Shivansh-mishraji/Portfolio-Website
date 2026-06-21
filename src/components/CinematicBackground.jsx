// CinematicBackground — pure CSS gradient, zero Three.js / WebGL overhead
// Replaced heavy particle system with GPU-composited CSS animations
export default function CinematicBackground() {
  const base = {
    position: 'fixed', inset: 0, zIndex: 0,
    background: '#02020a', pointerEvents: 'none', overflow: 'hidden'
  };
  const blob = (extra) => ({
    position: 'absolute', borderRadius: '50%',
    filter: 'blur(80px)', willChange: 'transform', ...extra
  });
  return (
    <div style={base}>
      <div style={blob({ width:'55vw', height:'55vw', top:'-10%', left:'15%',
        background:'rgba(124,58,237,0.22)', animation:'bgBlob1 18s ease-in-out infinite' })} />
      <div style={blob({ width:'40vw', height:'40vw', bottom:'-5%', right:'10%',
        background:'rgba(6,182,212,0.16)', animation:'bgBlob2 22s ease-in-out infinite' })} />
      <div style={blob({ width:'30vw', height:'30vw', top:'40%', left:'-5%',
        background:'rgba(236,72,153,0.10)', animation:'bgBlob3 26s ease-in-out infinite' })} />
      <style>{`
        @keyframes bgBlob1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(3%,4%) scale(1.05)}66%{transform:translate(-2%,2%) scale(0.97)}}
        @keyframes bgBlob2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-4%,-3%) scale(1.08)}}
        @keyframes bgBlob3{0%,100%{transform:translate(0,0)}40%{transform:translate(4%,-5%)}80%{transform:translate(-3%,3%)}}
      `}</style>
    </div>
  );
}
