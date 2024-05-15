export type Compare<A, B> = A extends B ? B extends A ? "identical"
  : "left in right"
  : B extends A ? "right in left"
  : "none";
