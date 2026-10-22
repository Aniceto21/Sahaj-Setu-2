export interface OCRResult {
  extractedText: string;
  detectedLanguage: string;
  detectedScript?: string;
  confidence: string;
  noticeCategory?: string;
  unclearSections?: string[];
}

export class OCRService {
  // Client-side image compression / canvas pre-processing
  public async prepareImage(file: File): Promise<{ base64: string; mimeType: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1600;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({ base64: reader.result as string, mimeType: file.type || 'image/jpeg' });
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          resolve({ base64: compressed, mimeType: 'image/jpeg' });
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  public async extractTextFromImage(base64: string, mimeType: string = 'image/jpeg'): Promise<OCRResult> {
    if (!navigator.onLine) {
      throw new Error('Device is offline. Remote OCR analysis requires an internet connection.');
    }

    const res = await fetch('/api/ocr-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: base64, mimeType }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `OCR failed with status ${res.status}`);
    }

    return await res.json();
  }
}

export const ocrService = new OCRService();
