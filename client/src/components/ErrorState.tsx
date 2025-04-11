import errorImage from "@/assets/not_found.jpg";

export const ErrorState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img src={errorImage} alt="No results found" className="p-4 rounded-lg" />
    </div>
  );
};
