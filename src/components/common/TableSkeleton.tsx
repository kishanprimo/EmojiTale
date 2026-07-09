export default function TableSkeleton({
    rows = 8,
}: {
    rows?: number;
}) {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <tr
                    key={index}
                    className="animate-pulse border-b border-gray-100 h-[76px]"
                >
                    <td className="px-4 py-5">
                        <div className="h-4 w-4 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />

                            <div>
                                <div className="h-4 w-28 rounded bg-gray-200 mb-2" />
                                <div className="h-3 w-40 rounded bg-gray-100" />
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-7 w-16 rounded-full bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-4 w-36 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-4 w-8 rounded bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-7 w-14 rounded-full bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-4 w-24 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-16 rounded bg-gray-100" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-4 w-24 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-16 rounded bg-gray-100" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-7 w-16 rounded-full bg-gray-200" />
                    </td>

                    <td className="px-4 py-5">
                        <div className="h-9 w-9 rounded-lg bg-gray-200" />
                    </td>
                </tr>
            ))}
        </>
    );
}