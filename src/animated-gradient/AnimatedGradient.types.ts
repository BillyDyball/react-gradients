import { ComponentPropsWithoutRef } from "react";

export interface AnimatedGradientProps
  extends ComponentPropsWithoutRef<"canvas"> {
  /** Number of moving objects
   * @default 15
   */
  particals?: number;

  /** Array of hex codes
   * @default ["#0051FF", "#00AEFF", "#E600FF"]
   */
  colours?: string[];

  /** Rate that values will accelerate by
   * @default 0.05
   */
  randAcceleration?: number;

  /** Maximum velocity
   * @default 1
   */
  maxVelComp?: number;

  /** Array of hex codes
   * @default 1
   */
  maxSizeComp?: number;

  /** Array of hex codes
   * @default 0.5
   */
  maxRotationComp?: number;

  /** maximum pixel value of object
   * @default 1000
   */
  maxSize?: number;

  /** minimum pixel value of object
   * @default 500
   */
  minSize?: number;
}

export interface Partical {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  dx: number;
  dy: number;
  dSize: number;
  dRotation: number;
}
