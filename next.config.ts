import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  // Add any custom Next.js config here
};

export default withNextIntl(nextConfig);
