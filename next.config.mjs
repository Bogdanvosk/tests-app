/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
    prependData: `
      @use "sass:color";
      @use "@/styles/variables" as *;
      @use "@/styles/mixins" as *;
		`,
  },
};

export default nextConfig;
