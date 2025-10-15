const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'out/extension.js',
  platform: 'node',
  external: ['vscode'],
  format: 'cjs',
  sourcemap: true,
  minify: false,
  target: ['node18'],
  logLevel: 'info'
}).catch(() => process.exit(1));
