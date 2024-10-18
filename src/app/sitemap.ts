import { Metadata, MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
        url:  "https://easyjob.com.co",
        lastModified: new Date(),
    },
    {
        url:  "https://easyjob.com.co/register-client",
        lastModified: new Date(),
    },
    {
        url:  "https://easyjob.com.co/register-professional",
        lastModified: new Date(),
    },
    {
        url:  "https://easyjob.com.co/login",
        lastModified: new Date(),
    },
    {
        url:  "https://easyjob.com.co/home",
        lastModified: new Date(),
    }
  ];
}