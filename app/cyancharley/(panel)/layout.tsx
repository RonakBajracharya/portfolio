import AdminGuard from "@/components/admin-guard"
import AdminSidebar from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="sticky h-full min-h-screen bg-slate-900 text-white flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminGuard>
  )
}