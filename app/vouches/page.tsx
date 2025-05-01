import Script from "next/script"
import { StarField } from "@/components/star-field"

export default function VouchesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Customer Vouches</h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              See what our customers have to say about our products and services.
            </p>
          </div>
        </div>
      </section>

      {/* Vouches Section */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          {/* External Vouches Script */}
          <div className="mb-12 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Verified Customer Vouches</h2>
            </div>
            <div className="p-6 bg-black">
              <div id="myvouch-container" className="min-h-[500px]">
                {/* This is where the external vouches script will render */}
                <Script src="https://myvouch.es/storage/assets/vouches.js" strategy="afterInteractive" />
                <Script
                  id="myvouch-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `window.slug = 'desync';`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
