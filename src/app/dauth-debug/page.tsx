import { decodeDebugPayload, isDauthDebugEnabled } from "@/lib/dauth-debug";

export const dynamic = "force-dynamic";

type DauthDebugPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    result?: string | string[];
  }>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function tryDecodePayload(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return decodeDebugPayload(value);
  } catch {
    return value;
  }
}

export default async function DauthDebugPage({
  searchParams,
}: DauthDebugPageProps) {
  const params = await searchParams;
  const rawError = getSingleParam(params.error);
  const rawResult = getSingleParam(params.result);
  const decodedError = tryDecodePayload(rawError);
  const decodedResult = tryDecodePayload(rawResult);
  const isEnabled = isDauthDebugEnabled();

  return (
    <main className="min-h-[70vh] px-6 py-12">
      <section className="mx-auto flex max-w-4xl flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold">DAuth Debug</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Use this page only while wiring the DAuth provider. It shows the raw
            userinfo response and redacts token values.
          </p>
        </div>

        <div className="rounded-lg border border-white/20 bg-black/80 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/50">
                Status
              </p>
              <p className="mt-1 text-lg font-semibold">
                {isEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            {isEnabled ? (
              <a
                className="inline-flex items-center justify-center border border-white px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black"
                href="/api/dauth-debug/start"
              >
                Start DAuth Debug
              </a>
            ) : (
              <p className="text-sm text-white/70">
                Set DAUTH_DEBUG=true and restart the dev server.
              </p>
            )}
          </div>
        </div>

        {decodedError ? (
          <div className="rounded-lg border border-red-400/50 bg-red-950/30 p-5">
            <h2 className="text-xl font-semibold text-red-200">Error</h2>
            <pre className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap text-sm text-red-100">
              {typeof decodedError === "string"
                ? decodedError
                : JSON.stringify(decodedError, null, 2)}
            </pre>
          </div>
        ) : null}

        {decodedResult ? (
          <div className="rounded-lg border border-emerald-400/50 bg-emerald-950/20 p-5">
            <h2 className="text-xl font-semibold text-emerald-200">
              DAuth Response
            </h2>
            <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap text-sm text-emerald-50">
              {JSON.stringify(decodedResult, null, 2)}
            </pre>
          </div>
        ) : null}
      </section>
    </main>
  );
}
