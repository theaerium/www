/**
 * Button label that rolls up on hover, replaced by an identical copy from below.
 * The copy is drawn by CSS from `data-text`, so screen readers hear it once.
 */
export default function RollLabel({ children }: { children: string }) {
  return (
    <span className="b-roll">
      <span className="b-roll-text" data-text={children}>
        {children}
      </span>
    </span>
  );
}
