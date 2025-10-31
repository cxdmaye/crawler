export default function CopyField({ value }: { value: string }) {
    return (
        <button
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
                navigator.clipboard.writeText(value);
            }}
        >
            复制
        </button>
    );
}