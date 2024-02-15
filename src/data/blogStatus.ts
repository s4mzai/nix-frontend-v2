/** should be same as backend BlogStatus enum
 * https://github.com/dtutimes/Backend_v2/blob/main/src/api/models/blogModel.ts#L4-L10
 */
export enum BlogStatus {
  Pending = 0,
  Published = 1,
  Approved = 2,
  Draft = 3,
}

export const blogStatusColor = [
  { bgClass: "bg-red-200", textClass: "text-red-800" },
  { bgClass: "bg-green-200", textClass: "text-green-800" },
  { bgClass: "bg-yellow-200", textClass: "text-yellow-800" },
  { bgClass: "bg-blue-200", textClass: "text-blue-800" }
];
