/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Keep build cache in RAM instead of disk to prevent ENOSPC on drive D
    config.cache = {
      type: "memory",
    };

    config.plugins.push({
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap("CrossDriveFixPlugin", (nmf) => {
          nmf.hooks.beforeResolve.tap("CrossDriveFixPlugin", (resolveData) => {
            if (resolveData && typeof resolveData.request === "string") {
              if (
                resolveData.request.startsWith("./C:") ||
                resolveData.request.startsWith(".\\C:") ||
                resolveData.request.startsWith("./c:") ||
                resolveData.request.startsWith(".\\c:")
              ) {
                resolveData.request = resolveData.request.replace(/^\.[\/\\]/, "");
              }
            }
          });
        });
      },
    });
    return config;
  },
};

module.exports = nextConfig;
