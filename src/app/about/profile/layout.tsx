export default function ProfileLayout({ 
    children,
    analityc,
    notif
    }: {
     children: React.ReactNode,
     analityc: React.ReactNode,
     notif: React.ReactNode
     }) {
    return (
        <div className="p-4 w-full h-screen">
          
          <div className="flex items-center gap-4 ">
            {children}
            {notif}
          </div>
          <div className="mt-4">
            {analityc}
          </div>
        </div>
    )
}