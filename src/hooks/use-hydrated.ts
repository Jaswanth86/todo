'use client';

import { useState, useEffect } from 'react';

/**
 * A hook to determine if the component has been hydrated on the client.
 * This is useful to prevent hydration mismatches when using client-side only APIs or libraries.
 * @returns {boolean} - True if the component is hydrated, false otherwise.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
