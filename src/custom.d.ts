declare module '*.png' {
  const value: any;
  export default value;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "@smooth-ui/core-sc";
