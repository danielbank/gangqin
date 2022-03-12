import react from "react";

const freqs = [
  440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99,
  783.99, 830.61, 880,
];

const black_keys = [1, 4, 6, 9, 11];

const Note = ({ freq, isBlackKey, ...props }) => {
  const playNote = (freq, offset = 1) => {
    console.log(freq);
    var context = new AudioContext();
    var o = context.createOscillator();
    var g = context.createGain();
    o.connect(g);
    o.frequency.value = freq;
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + offset);
    g.connect(context.destination);
    o.start(0);
  };

  return (
    <div
      className={`${isBlackKey ? "bg-black" : "bg-white"} h-24 m-1 w-8`}
      onClick={() => playNote(freq)}
      {...props}
    />
  );
};

const Piano = () => {
  return (
    <div className="flex">
      {freqs.map((freq, i) => {
        return (
          <Note
            key={freq}
            id={`freq-${freq}`}
            freq={freq}
            isBlackKey={black_keys.includes(i) ? true : false}
          />
        );
      })}
    </div>
  );
};

export default Piano;
