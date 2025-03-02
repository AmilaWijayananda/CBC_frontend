export default function TestNavSlider({ closeSlider }) {
    return (
      <div className="fixed inset-0 bg-red-500 flex items-center justify-center z-50">
        <div className="text-white text-4xl font-bold">Test</div>
        <button
          onClick={closeSlider}
          className="absolute top-4 right-4 bg-white text-red-500 px-4 py-2 rounded-lg shadow-md"
        >
          Close
        </button>
      </div>
    );
  }