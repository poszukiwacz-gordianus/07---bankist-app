export default function Page() {
  return (
    <section className="mx-auto max-w-screen-sm px-12 py-6">
      <h1 className="mb-12 text-2xl">Welcome to Bankist App!</h1>
      <div className="flex flex-col gap-4 text-xl">
        <p>
          This is a recreation of{" "}
          <a
            target="_blank"
            href="https://www.udemy.com/user/jonasschmedtmann/"
          >
            Jonas Schmedtmann
          </a>{" "}
          <a target="_blank" href="https://bankist.netlify.app/">
            Bankist App
          </a>{" "}
          from{" "}
          <a
            target="_blank"
            href="https://www.udemy.com/course/the-complete-javascript-course/"
          >
            The Complete Javascript Course.
          </a>
        </p>
        <p>My Bankist App is written using Next.js and Tailwind CSS.</p>
      </div>
    </section>
  );
}
