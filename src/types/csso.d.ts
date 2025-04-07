declare module 'csso' {
  interface MinifyResult {
    css: string;
    map?: object;
  }

  interface MinifyOptions {
    filename?: string;
    sourceMap?: boolean;
    debug?: boolean;
    usage?: object;
    logger?: object;
  }

  export function minify(source: string, options?: MinifyOptions): MinifyResult;
}
