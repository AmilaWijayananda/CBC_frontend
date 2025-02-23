export default function ImageCard({ image }) {
    if (!image) return null;

    return (
        <div className="w-full h-full">
            <img
                src={image}
                className="w-full h-full object-cover"
                alt="Product"
            />
        </div>
    );
}