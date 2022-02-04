import { renderToString } from "react-dom/server";

// export const imageUrl = (src: string) => `${src}=w600-h500-n`;
export const blob = (svg: any) => new Blob([svg], { type: "image/svg+xml" });
export const blobUrl = (svg: any) => URL.createObjectURL(blob(svg));
export const iconUrl = (icon: any) => blobUrl(renderToString(icon));

export const imageUrlFull = (src: string) => `${src}=w1200`;
export const thumbnailUrl = (src: string) => `${src}=w300-h200-n`;

export function firstImage(images: any = []) {
  if (images[0]) {
    return images[0];
  }

  return null;
}

export function imageUrl(img: string, w: number = 800, h: number = 800) {
  return `${img}=w${w}-h${h}-n`;
}

export function avatarUrl(img: string, w: number, h: number) {
  if (img.includes("googleusercontent.com")) {
    return imageUrl(img, w, h);
  }

  return img;
}
