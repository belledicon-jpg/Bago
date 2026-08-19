export default function Signup(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0A2942]">
          Sign Up
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new staff account for the Health & Sanitation Management System.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Account creation is not available in this demo.");
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0A2942] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#123B5D]"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
