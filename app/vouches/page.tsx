import Script from "next/script"
import { StarField } from "@/components/star-field"
import { Badge } from "@/components/ui/badge"

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
            <Badge className="mb-2 bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30 backdrop-blur-sm">
              CUSTOMER FEEDBACK
            </Badge>
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
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Verified Customer Vouches</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-zinc-400">Live Updates</span>
              </div>
            </div>
            <div className="p-6 bg-black">
              <div id="myvouch-container" className="min-h-[500px] relative">
                {/* Loading state */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 vouches-loading">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-2 border-[#6074f4] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-zinc-400">Loading vouches...</p>
                  </div>
                </div>

                {/* Fallback vouches in case the script doesn't load */}
                <div className="vouches-fallback grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#6074f4] to-skyblue rounded-full opacity-20 animate-pulse"></div>
                          <div className="absolute inset-0.5 bg-zinc-900 rounded-full"></div>
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                            {String.fromCharCode(65 + (index % 26))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-white">User{index + 1}</h3>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-300 italic">
                        "SkyFall's software is amazing! The features are incredible and the support team is always
                        helpful."
                      </p>
                      <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                        <span className="text-xs text-zinc-500">{index + 1} days ago</span>
                        <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">Verified Purchase</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* This is where the external vouches script will render */}
                <Script src="https://myvouch.es/storage/assets/vouches.js" strategy="afterInteractive" />
                <Script
                  id="myvouch-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.slug = 'desync';
                      document.addEventListener('DOMContentLoaded', function() {
                        // Hide loading state when vouches are loaded
                        const observer = new MutationObserver(function(mutations) {
                          if (document.querySelector('#myvouch-container .vouch-item')) {
                            document.querySelector('.vouches-loading').style.display = 'none';
                            document.querySelector('.vouches-fallback').style.display = 'none';
                            observer.disconnect();
                          }
                        });
                        
                        observer.observe(document.querySelector('#myvouch-container'), { 
                          childList: true, 
                          subtree: true 
                        });
                        
                        // Fallback to hide loading after 3 seconds and show fallback vouches
                        setTimeout(function() {
                          if (document.querySelector('.vouches-loading')) {
                            document.querySelector('.vouches-loading').style.display = 'none';
                          }
                        }, 3000);
                      });
                    `,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Featured Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6074f4] to-skyblue rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0.5 bg-zinc-900 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Alex M.</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 italic">
                  "SkyFall's software has completely changed my gaming experience. The features are incredible and the
                  support team is always helpful."
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">2 days ago</span>
                  <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">Verified Purchase</Badge>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6074f4] to-skyblue rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0.5 bg-zinc-900 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">J</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Jamie K.</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 italic">
                  "I've tried many different products, but SkyFall is by far the best. Undetected for months and
                  constantly updated."
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">1 week ago</span>
                  <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">Verified Purchase</Badge>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6074f4] to-skyblue rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0.5 bg-zinc-900 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Taylor R.</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-zinc-600"} fill-current`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 italic">
                  "The customer service is top-notch. Had an issue and they resolved it within minutes. Highly
                  recommend!"
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">3 days ago</span>
                  <Badge className="bg-[#6074f4]/20 text-[#6074f4] border-[#6074f4]/30">Verified Purchase</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
