export default function Page() {
  return (
    <section className="mx-auto max-w-screen-sm px-12 py-6">
      <h1 className="mb-12 text-2xl">Welcome to Bankist App!</h1>
      <div className="flex flex-col gap-4">
        <p>
          This is a recreation of{" "}
          <a
            href="https://www.udemy.com/user/jonasschmedtmann/"
            target="_blank"
            className="text-blue-600 underline"
          >
            Jonas Schmedtmann&apos;s
          </a>{" "}
          <a
            href="https://bankist.netlify.app/"
            target="_blank"
            className="text-blue-600 underline"
          >
            Bankist App
          </a>{" "}
          from{" "}
          <a
            href="https://www.udemy.com/course/the-complete-javascript-course/"
            target="_blank"
            className="text-blue-600 underline"
          >
            The Complete JavaScript Course
          </a>
          , written from scratch using Next.js and Tailwind CSS.
        </p>

        <h2>The app features two accounts:</h2>
        <ul>
          <li>User: gtf, Pin: 1111</li>
          <li> User: jd, Pin: 2222</li>
        </ul>
        <p>
          You can login to the app and perform various operations, including
          transferring money between accounts, sorting operations by date, and
          more.
        </p>
        <p>Website includes 📱 Responsive Design 😁</p>
      </div>
    </section>
  );
}
