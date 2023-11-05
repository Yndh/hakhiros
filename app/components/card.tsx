import { Suspense } from "react";
import CardLoader from "./cardLoader";

interface CardInterface {
  children: React.ReactNode;
  classes?: string;
  color?: string;
}

export default function Card({ children, classes, color }: CardInterface) {
  return (
    <Suspense fallback={<CardLoader />}>
      <div
        className={`card ${classes ? classes : ""}`}
        style={color ? { background: color } : {}}
      >
        {children}
      </div>
    </Suspense>
  );
}
