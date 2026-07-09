// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { getUsers } from "@/store/slices/UserSlice/userThunk";
// import Tags from "@/components/common/Tag";

// const DashboardUsers = () => {
//     const dispatch = useAppDispatch();
//     const router = useRouter();

//     const { users, loading } = useAppSelector((state) => state.users);

//     useEffect(() => {
//         dispatch(
//             getUsers({
//                 page: 1,
//                 limit: 5,
//                 search: "",
//             })
//         );
//     }, [dispatch]);

//     const formatDomain = (domain: string) => {
//         if (!domain) return "-";

//         return domain
//             .replace(/^https?:\/\//, "")
//             .replace(/^www\./, "")
//             .replace(/\/$/, "");
//     };

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

//             {/* Header */}
//             <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-gray-200">
//                 <h2 className="text-xl sm:text-2xl font-semibold text-[#101828]">
//                     Recent Users
//                 </h2>

//                 <button
//                     onClick={() => router.push("/users")}
//                     className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
//                 >
//                     View All →
//                 </button>
//             </div>

//             {/* Responsive Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-[900px]">

//                     <thead className="bg-white border-b border-gray-200">
//                         <tr>

//                             <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-[#344054]">
//                                 User
//                             </th>

//                             <th className="px-4 py-4 text-left text-sm font-semibold text-[#344054]">
//                                 Role
//                             </th>

//                             <th className="px-4 py-4 text-left text-sm font-semibold text-[#344054]">
//                                 Domain
//                             </th>
//                             <th className="px-4 py-4 text-left text-sm font-semibold text-[#344054]">
//                                 City, Country
//                             </th>
//                             <th className="px-4 py-4 text-center text-sm font-semibold text-[#344054]">
//                                 Conversation
//                             </th>

//                             <th className="px-4 py-4 text-center text-sm font-semibold text-[#344054]">
//                                 Plan
//                             </th>

//                             <th className="px-4 py-4 text-left text-sm font-semibold text-[#344054]">
//                                 Created
//                             </th>
//                             <th className="px-4 py-4 text-center text-sm font-semibold text-[#344054]">
//                                 Status
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         {loading ? (

//                             [...Array(5)].map((_, index) => (
//                                 <tr
//                                     key={index}
//                                     className="border-b border-gray-100 animate-pulse"
//                                 >
//                                     {/* User */}
//                                     <td className="px-4 lg:px-6 py-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-full bg-gray-200" />

//                                             <div className="space-y-2">
//                                                 <div className="h-4 w-28 bg-gray-200 rounded" />
//                                                 <div className="h-3 w-40 bg-gray-100 rounded" />
//                                             </div>
//                                         </div>
//                                     </td>

//                                     {/* Role */}
//                                     <td className="px-4 py-4">
//                                         <div className="h-6 w-16 bg-gray-200 rounded-full" />
//                                     </td>

//                                     {/* Domain */}
//                                     <td className="px-4 py-4">
//                                         <div className="h-4 w-28 bg-gray-200 rounded" />
//                                     </td>

//                                     {/* City */}
//                                     <td className="px-4 py-4">
//                                         <div className="h-4 w-24 bg-gray-200 rounded" />
//                                     </td>

//                                     {/* Conversation */}
//                                     <td className="px-4 py-4">
//                                         <div className="mx-auto h-4 w-10 bg-gray-200 rounded" />
//                                     </td>

//                                     {/* Plan */}
//                                     <td className="px-4 py-4">
//                                         <div className="mx-auto h-6 w-14 bg-gray-200 rounded-full" />
//                                     </td>

//                                     {/* Created */}
//                                     <td className="px-4 py-4">
//                                         <div className="h-4 w-24 bg-gray-200 rounded" />
//                                     </td>

//                                     {/* Status */}
//                                     <td className="px-4 py-4">
//                                         <div className="mx-auto h-6 w-16 bg-gray-200 rounded-full" />
//                                     </td>

//                                 </tr>
//                             ))

//                         ) : (

//                             users.map((user) => (

//                                 <tr
//                                     key={user.id}
//                                     className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                                 >

//                                     {/* User */}
//                                     <td className="px-4 lg:px-6 py-4">

//                                         <div className="flex items-center gap-3 min-w-0">

//                                             {user.profile_pic ? (

//                                                 <img
//                                                     src={user.profile_pic}
//                                                     alt={user.name}
//                                                     className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
//                                                 />

//                                             ) : (

//                                                 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
//                                                     {user.name
//                                                         ?.split(" ")
//                                                         .map((x) => x[0])
//                                                         .join("")
//                                                         .slice(0, 2)
//                                                         .toUpperCase()}
//                                                 </div>

//                                             )}

//                                             <div className="min-w-0">

//                                                 <p className="text-sm font-semibold text-[#101828] truncate">
//                                                     {user.name}
//                                                 </p>

//                                                 <p className="text-xs text-[#667085] truncate">
//                                                     {user.email}
//                                                 </p>

//                                             </div>

//                                         </div>

//                                     </td>

//                                     {/* Role */}
//                                     <td className="px-4 py-4">
//                                         <Tags
//                                             text={user.role}
//                                             variant={
//                                                 user.role === "owner"
//                                                     ? "purple"
//                                                     : "blue"
//                                             }
//                                         />
//                                     </td>

//                                     {/* Domain */}
//                                     <td className="px-4 py-4">
//                                         <p
//                                             className="text-sm text-[#344054] truncate max-w-[180px]"
//                                             title={user.domain}
//                                         >
//                                             {formatDomain(user.domain)}
//                                         </p>
//                                     </td>
//                                     {/* City, Country */}
//                                     <td className="px-4 py-4">
//                                         <p
//                                             className="text-sm text-[#344054] whitespace-nowrap"
//                                         >
//                                             {(() => {
//                                                 if (
//                                                     !user.city ||
//                                                     user.city.trim() === "" ||
//                                                     user.city === "null,null"
//                                                 ) {
//                                                     return "N/A";
//                                                 }

//                                                 const [city, country] = user.city.split(",");

//                                                 return `${city.trim()}, ${country.trim()}`;
//                                             })()}
//                                         </p>
//                                     </td>
//                                     {/* Conversation */}
//                                     <td className="px-4 py-4 text-center">
//                                         <span className="text-sm font-semibold text-[#101828]">
//                                             {user.conversation.toLocaleString()}
//                                         </span>
//                                     </td>

//                                     {/* Plan */}
//                                     <td className="px-4 py-4 text-center">
//                                         <Tags
//                                             text={user.plan}
//                                             variant={
//                                                 user.plan === "Free"
//                                                     ? "blue"
//                                                     : "emerald"
//                                             }
//                                         />
//                                     </td>

//                                     {/* Created */}
//                                     <td className="px-4 py-4">
//                                         <span className="text-sm text-[#344054] whitespace-nowrap">
//                                             {user.createdAt
//                                                 ? new Date(user.createdAt).toLocaleDateString(
//                                                     "en-US",
//                                                     {
//                                                         month: "short",
//                                                         day: "2-digit",
//                                                         year: "numeric",
//                                                     }
//                                                 )
//                                                 : "-"}
//                                         </span>
//                                     </td>
//                                     {/* Status */}
//                                     <td className="px-4 py-4 text-center">
//                                         <Tags
//                                             text={user.is_online ? "Active" : "Inactive"}
//                                             variant={user.is_online ? "green" : "gray"}
//                                         />
//                                     </td>
//                                 </tr>

//                             ))

//                         )}

//                     </tbody>

//                 </table>
//             </div>

//         </div>
//     );
// };

// export default DashboardUsers;