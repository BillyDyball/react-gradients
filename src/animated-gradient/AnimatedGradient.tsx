import { useEffect, useRef } from "react";
import { AnimatedGradientProps, Partical } from "./AnimatedGradient.types";

const AnimatedGradient = ({
  particals = 15,
  colours = ["#0051FF", "#00AEFF", "#E600FF"],
  randAcceleration = 0.02,
  maxVelComp = 0.5,
  maxSizeComp = 1,
  maxRotationComp = 0.5,
  maxSize = 300,
  minSize = 150,
  style = {},
  ...canvasProps
}: AnimatedGradientProps) => {
  // #region functions
  const generateParticals = (count: number): Partical[] => {
    const { width, height } = canvasRef.current ?? { width: 0, height: 0 };
    console.log(width, height);
    const particals: Partical[] = [];

    for (let i = 0; i < count; i++) {
      const rand = Math.random();

      const size = (maxSize - minSize) * Math.random() + minSize;
      console.log("size", size);

      let x = Math.random() * width;
      if (x < size) {
        x = size + 1;
      } else if (width - (x + size) < 0) {
        x = width - size - 1;
      }

      let y = Math.random() * height;
      if (y < size) {
        y = size + 1;
      } else if (height - (y + size) < 0) {
        y = height - size - 1;
      }

      particals.push({
        x,
        y,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        size,
        dSize: (Math.random() - 0.5) * 2,
        color:
          rand <= 0.5 ? colours[0] : rand <= 0.75 ? colours[1] : colours[2],
        rotation: (Math.PI / 180) * (360 * Math.random()),
        dRotation: (Math.random() - 0.5) * 2,
      });
    }
    return particals;
  };

  const getSize = (
    canvas: HTMLCanvasElement | null
  ): { width: number; height: number } => {
    const { clientWidth: width, clientHeight: height } = canvas ?? {
      clientWidth: 0,
      clientHeight: 0,
    };

    return { width, height };
  };

  const updateParticals = (particals: Partical[]) => {
    const { width, height } = getSize(canvasRef.current);
    // console.log(particals[0]);

    for (const p of particals) {
      // Random accleration
      p.dx += (1 - 2 * Math.random()) * randAcceleration;
      p.dy += (1 - 2 * Math.random()) * randAcceleration;
      p.dSize += (1 - 2 * Math.random()) * randAcceleration;
      p.dRotation += (1 - 2 * Math.random()) * randAcceleration;

      // Don't let velocity get too large
      if (p.dx > maxVelComp) {
        p.dx = maxVelComp;
      } else if (p.dx < -maxVelComp) {
        p.dx = -maxVelComp;
      }

      if (p.dy > maxVelComp) {
        p.dy = maxVelComp;
      } else if (p.dy < -maxVelComp) {
        p.dy = -maxVelComp;
      }

      if (p.dSize > maxSizeComp) {
        p.dSize = maxSizeComp;
      } else if (p.dSize < -maxSizeComp) {
        p.dSize = -maxSizeComp;
      }

      if (p.dRotation > maxRotationComp) {
        p.dRotation = maxRotationComp;
      } else if (p.dRotation < -maxRotationComp) {
        p.dRotation = -maxRotationComp;
      }

      // Change direction if collision
      if (p.x > width || p.x < 0) {
        p.dx = -p.dx;
      }

      if (p.y > height || p.y < 0) {
        p.dy = -p.dy;
      }

      if (p.size + p.dSize > maxSize || p.size - p.dSize < minSize) {
        p.dSize = -p.dSize;
      }

      if (p.rotation + p.dRotation > 360 || p.rotation + p.dRotation < 0) {
        p.dRotation = -p.dRotation;
      }

      // Update values
      p.x += p.dx;
      p.y += p.dy;
      p.size += p.dSize;
      p.rotation += p.dRotation;
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, particals: Partical[]) => {
    const { width, height } = getSize(canvasRef.current);

    // Clear screen
    ctx.fillStyle = "rgba(0, 20, 60, .015)";
    ctx.fillRect(0, 0, width, height);

    // Draw circles
    for (const { x, y, rotation, size, color } of particals) {
      ctx.save();

      ctx.translate(x, y);
      ctx.rotate((Math.PI / 180) * rotation);

      ctx.beginPath();

      // Triangle
      const path = new Path2D();
      path.moveTo(size / 2, 0);
      path.lineTo(0, -size);
      path.lineTo(-size / 2, 0);

      ctx.fillStyle = color;
      ctx.fill(path);

      ctx.translate(-x, -y);
      ctx.closePath();

      ctx.restore();
    }
  };
  // #endregion

  // #region refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // #endregion

  // #region hooks
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrameId = 0;

    const renderedParticals = generateParticals(particals);
    console.log(renderedParticals);

    //Our draw came here
    const render = () => {
      updateParticals(renderedParticals);
      draw(context, renderedParticals);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      console.log(context);
    }
  }, [canvasRef]);
  // #endregion

  return (
    <canvas
      style={{ mixBlendMode: "hard-light", filter: "blur(80px)", ...style }}
      ref={canvasRef}
      {...canvasProps}
    />
  );
};

export default AnimatedGradient;
