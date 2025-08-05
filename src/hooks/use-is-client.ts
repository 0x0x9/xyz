
'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook to determine if the component is being rendered on the client.
 * This is useful to prevent hydration mismatches when using client-side only APIs
 * like localStorage or when dealing with theme changes from `next-themes`.
 *
 * @returns {boolean} `true` if the component is mounted on the client, otherwise `false`.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
