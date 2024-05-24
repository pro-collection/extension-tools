export interface UseMountInitOptions {
  setLoading: (loading: boolean) => void;
  setUrls: (urls: string[]) => void;
  setUser: (user: { userName: string; id: string }) => void;
}
