const LeftSection = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(270deg,#EAF2FF_0%,#F5F8FF_45%,#FFFFFF_100%)] p-10">
      <div className="flex h-full w-full items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="text-center px-8">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#2563EB]/10">
            <span className="text-5xl">💬</span>
          </div>

          <h2 className="text-5xl font-extrabold text-gray-900">
            Emotale Poster
          </h2>

          <p className="mx-auto mt-5 max-w-sm text-lg leading-8 text-gray-600">
            Your promotional banner, illustration or marketing artwork will be
            displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;