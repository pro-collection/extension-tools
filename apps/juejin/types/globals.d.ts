declare type Noop = () => void;

declare interface Window {
  copy: Noop;
}

declare module "html-to-md";
