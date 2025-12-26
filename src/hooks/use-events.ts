// No-op for static deployment
export function useLogEvent() {
  return {
    mutate: () => {
      // Analytics disabled for static site
    }
  };
}
