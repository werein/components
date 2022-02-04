import { Helmet } from "react-helmet";
import { useLanguage } from "./utils/language";

interface SEOProps {
  title?: string;
  pathname?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  description?: string;
  keywords?: string[];
  canonical?: string | null;
}

export default function SEO({
  description = "Půjčovna a pronájem campervanů, obytných vozů, karavanů a dodávek.",
  image,
  title = undefined,
  pathname,
  keywords = [],
  canonical,
}: SEOProps) {
  const { lang, host } = useLanguage();
  const pageName = "Campervan";

  const canonicalUrl =
    canonical || (pathname ? `${host}${pathname}` : undefined);
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${pageName}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonicalUrl,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: "keywords",
          content: keywords.join(","),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(
        image
          ? [
              {
                property: "og:image",
                content: image.src,
              },
              {
                property: "og:image:width",
                content: `${image.width}px`,
              },
              {
                property: "og:image:height",
                content: `${image.height}px`,
              },
              {
                name: "twitter:card",
                content: "summary_large_image",
              },
            ]
          : [
              {
                name: "twitter:card",
                content: "summary",
              },
            ]
      )}
    />
  );
}
