/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";


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
            {
              protocol: 'https',
              hostname: 'secure.gravatar.com',
              port: '',
            },
          ],
    }
};

export default withPlaiceholder(nextConfig);


