import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // --- PATH OF EXILE ---
      {
        protocol: 'https',
        hostname: 'web.poecdn.com',
        pathname: '/**',
      },
      // --- GUILD WARS 2 ---
      {
        protocol: 'https',
        hostname: 'www.guildwars2.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3b4yo2b5lbfy.cloudfront.net',
        pathname: '/**',
      },
      // --- STEAM CDNs (Dota 2, Albion, Project Gorgon, etc.) ---
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shared.cloudflare.steamstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'clan.cloudflare.steamstatic.com',
        pathname: '/**',
      },
      // --- O NOVO QUE FALTA (FASTLY) ---
      {
        protocol: 'https',
        hostname: 'clan.fastly.steamstatic.com', // O que causou o erro no seu print
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shared.fastly.steamstatic.com',
        pathname: '/**',
      },
      // --- REDDIT ---
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'b.thumbs.redditmedia.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;