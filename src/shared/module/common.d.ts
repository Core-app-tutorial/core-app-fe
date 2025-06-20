export {};

declare global {
  type Result<T> = {
    isSuccess: boolean;
    message: string;
    value?: T;
  };
}
