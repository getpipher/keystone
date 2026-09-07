// Type declarations for engine/host.mjs.

export interface HostIdentity {
  argv0?: string
  entry?: string
}

export declare function isOmpRuntime(identity?: HostIdentity): boolean
