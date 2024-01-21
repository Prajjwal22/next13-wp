/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        WP_GRAPHQL_ENDPOINT: "https://api.howtoshout.com/graphql"
    },
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'api.howtoshout.com',
              port: '',
            },
          ],
    }
};

export default nextConfig;
