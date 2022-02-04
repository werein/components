import { curveBasis } from "@visx/curve";
import { Drag } from "@visx/drag";
import { LinearGradient } from "@visx/gradient";
import { LinePath } from "@visx/shape";

type Line = { x: number; y: number }[];
type Lines = Line[];

type SetLinesFc = (lines: Lines) => Lines;

export type SignPadProps = {
  width: number;
  height: number;
  lines?: Lines;
  setLines?: (fc: SetLinesFc) => void;
};

export default function SignPad({
  lines = [],
  setLines,
  width,
  height,
}: SignPadProps) {
  return width < 10 ? null : (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <LinearGradient id="stroke" from="#02386E" to="#00172D" />
      {lines.map((line, i) => (
        <LinePath
          key={`line-${i}`}
          fill="transparent"
          stroke="url(#stroke)"
          strokeWidth={3}
          data={line}
          curve={curveBasis}
          x={(d) => d.x}
          y={(d) => d.y}
        />
      ))}
      <Drag
        width={width}
        height={height}
        resetOnStart
        onDragStart={({ x = 0, y = 0 }) => {
          // add the new line with the starting point
          setLines && setLines((currLines) => [...currLines, [{ x, y }]]);
        }}
        onDragMove={({ x = 0, y = 0, dx, dy }) => {
          // add the new point to the current line
          setLines &&
            setLines((currLines) => {
              const nextLines = [...currLines];
              const newPoint = { x: x + dx, y: y + dy };
              const lastIndex = nextLines.length - 1;
              nextLines[lastIndex] = [
                ...(nextLines[lastIndex] || []),
                newPoint,
              ];
              return nextLines;
            });
        }}
      >
        {({
          x = 0,
          y = 0,
          dx,
          dy,
          isDragging,
          dragStart,
          dragEnd,
          dragMove,
        }) => (
          <g>
            {/* decorate the currently drawing line */}
            {isDragging && (
              <g>
                <rect
                  fill="white"
                  width={8}
                  height={8}
                  x={x + dx - 4}
                  y={y + dy - 4}
                  pointerEvents="none"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill="transparent"
                  stroke="white"
                  pointerEvents="none"
                />
              </g>
            )}
            {/* create the drawing area */}
            <rect
              fill="transparent"
              width={width}
              height={height}
              onMouseDown={dragStart}
              onMouseUp={dragEnd}
              onMouseMove={dragMove}
              onTouchStart={dragStart}
              onTouchEnd={dragEnd}
              onTouchMove={dragMove}
            />
          </g>
        )}
      </Drag>
    </svg>
  );
}
