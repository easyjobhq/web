import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
        userAgent: "*",
        allow: "/profile/*",
    },
    sitemap: "https://easyjob.com.co/sitemap.xml",
  };
}