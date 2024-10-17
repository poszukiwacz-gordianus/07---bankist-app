function ActionCard({ children, title, className }) {
  return (
    <div className={`${className}`}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function Label({ label }) {
  return <label>{label}</label>;
}

function Input({ type }) {
  return <input type={type} />;
}

function Button({ content }) {
  return <button>{content}</button>;
}

ActionCard.Label = Label;
ActionCard.Input = Input;
ActionCard.Button = Button;

export default ActionCard;
