
export default function Button({onClick, label, type, center, icon}) {

   center = "center"

  return (
    <div>
      <button onClick={onClick} className={`${type} ctaBtn ${center}`}>{icon} {label}</button>
    </div>
  );
}
