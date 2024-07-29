import { InView } from "react-intersection-observer";

export default function AnimatedSection({ children }) {
  return (
    <InView triggerOnce threshold={0.1}>
      {({ inView, ref }) => (
        <div
          ref={ref}
          className={`transition-transform duration-[2000ms] ease-out ${
            inView
              ? "transform-none opacity-100"
              : "transform translate-y-20 opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </InView>
  );
}
