import { unref } from 'vue';
import { presentationSchema } from '../../types/presentation-schema';
import type { Presentation } from '../../types/presentation-schema';

export function useIo() {
  const load = (file: File): Promise<Presentation> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (ev) => {
        const raw = String(ev.target.result);
        const deserialized = JSON.parse(raw);
        const typed = presentationSchema.parse(deserialized);
        resolve(typed);
      };
      reader.onerror = reject;
      reader.readAsText(file, 'utf-8');
    });
  };

  const save = (name: string, presentation: Presentation) => {
    const unreactive = unref(presentation);
    const serialized = JSON.stringify(unreactive, null, 0);
    const blob = new Blob([serialized], { type: 'application/json' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    setTimeout(() => {
      document.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return { load, save };
}
