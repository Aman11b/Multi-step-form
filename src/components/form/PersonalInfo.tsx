export default function PersonalInfo() {
  return (
    <form>
      <h1 className="font-bold text-blue-950 text-2xl md:text-3xl">
        Personal info
      </h1>
      <p className="mt-3 text-gray-500 text-base leading-6">
        Please provide your name, email address, and phone number.
      </p>

      <div className="space-y-5 mt-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block font-medium text-blue-950 text-sm"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g Stephan King"
            className="personal-info-input personal-info-input-error"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-blue-950 text-sm"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g StephanKing@lorem.com"
            className="personal-info-input personal-info-input-error"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block font-medium text-blue-950 text-sm"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="e.g +1 234 567 890"
            className="personal-info-input personal-info-input-error"
          />
        </div>
        <div className="flex justify-end mt-20">
          <button
            type="submit"
            className="bg-blue-950 hover:opacity-90 px-5 py-3 rounded-md focus-visible:outline-2 focus-visible:outline-purple-600 focus-visible:outline-offset-2 font-medium text-white text-sm"
          >
            Next Step
          </button>
        </div>
      </div>
    </form>
  );
}
