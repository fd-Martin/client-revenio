import notfound from "../assets/image.png";

const PageNotFound = () => {
  return (
    <div className="min-h-[60vh] md:min-h-screen md:col-span-11 flex flex-col justify-center items-center px-4 text-center">
      <img src={notfound} alt="Not Found" className="w-full max-w-lg mb-8" />
      <div className="flex items-center justify-center gap-3 text-gray-500">
        <p className="text-lg md:text-xl font-semibold">
          The name you searched for could not be found.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
