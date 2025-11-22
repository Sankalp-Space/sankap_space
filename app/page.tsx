import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full">
        <Hero />
      </section>
      <section className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-3xl p-8 text-center">
          <h2 className="text-4xl font-semibold mb-6">About Sankalp Space</h2>
          <p className="text-lg">
            This is an example of a full-screen section below the hero with some placeholder content.
          </p>
        </div>
      </section>
      <section className="h-screen w-full flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <div className="max-w-3xl p-8 text-center">
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">
            Email: info@sankalpspace.com
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-shadow">
            Get in Touch
          </button>
        </div>
      </section>
    </>
  );
}
