export default function ForgotPassword(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0A2942]">
          Forgot Password
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your username or email address and we will send you a link to reset your password.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("If an account exists, a reset link will be sent.");
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>

            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0A2942] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#123B5D]"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
