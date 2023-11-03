interface ModalInterface {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalInterface) {
  return (
    <div className={`modal ${isOpen ? "shown" : ""}`}>
      <div className="modalCard">{children}</div>
    </div>
  );
}
