export default function ReceptionLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <main className="w-full">
        {children}
      </main>
    );
  }