import { useEffect } from 'react';

export function useKeydown(keys: string, callback: () => void) {
  useEffect(() => {
    const keyCombinaison = keys.split('+');
    const hasCtrl =
      keyCombinaison.includes('ctrl') || keyCombinaison.includes('cmd');
    const hasShift = keyCombinaison.includes('shift');
    const hasAlt = keyCombinaison.includes('alt');

    const handleKeydown = (event: KeyboardEvent) => {
      if (
        event.code === keyCombinaison[keyCombinaison.length - 1] &&
        hasAlt === event.altKey &&
        (hasCtrl === event.ctrlKey || hasCtrl === event.metaKey) &&
        hasShift === event.shiftKey
      ) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [keys, callback]);

  return null;
}
