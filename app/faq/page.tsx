import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StarField } from "@/components/star-field"

// Placeholder FAQ data
const faqs = [
  {
    question: "What is SkyFall?",
    answer:
      "SkyFall is a premium software provider specializing in gaming enhancement tools. Our products are designed to give you an edge in competitive gaming with features like aimbots, ESP, and more.",
  },
  {
    question: "Are your products safe to use?",
    answer:
      "Yes, our products are designed with safety as a top priority. We use advanced techniques to ensure our software remains undetected. However, we always recommend following our usage guidelines to minimize any risks.",
  },
  {
    question: "How do I install your products?",
    answer:
      "After purchasing, you'll receive detailed installation instructions. Our software typically comes with an easy-to-use installer that guides you through the process. If you encounter any issues, our support team is available to help.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer refunds within 24 hours of purchase if the product doesn't work as described. Please contact our support team with your order details to process a refund request.",
  },
  {
    question: "How often do you update your products?",
    answer:
      "We regularly update our products to ensure compatibility with game updates and to improve features. The frequency depends on the specific product and game, but we aim to provide updates as quickly as possible after game patches.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we provide 24/7 customer support through our Discord server and email. Our team is always ready to assist with any questions or issues you might have.",
  },
  {
    question: "Can I use multiple products at once?",
    answer:
      "Yes, our products are designed to work together seamlessly. You can use multiple features simultaneously for an enhanced gaming experience.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards, PayPal, cryptocurrency, and more. All transactions are secure and encrypted.",
  },
]

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>
        <div className="container relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Find answers to common questions about our products and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 bg-black">
        <div className="container">
          <div className="border border-zinc-800 rounded-lg overflow-hidden">
            <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white">Common Questions</h2>
            </div>
            <div className="p-6 bg-black">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-zinc-800 py-2">
                    <AccordionTrigger className="text-left font-medium text-white hover:text-[#6074f4]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-400">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
