export default function Home() {
  return (
    <main className="bg-white h-screen flex flex-col overflow-x-scroll no-scrollbar">
      {/* 🚪 Rooms  */}
      <div className="flex w-[200vw] h-[80vh] flex-shrink-0">
        {/* Room 2 */}
        <section className="bg-blue-600 h-full w-[100vw] flex-shrink-0"></section>
        {/* Room 2 */}
        <section className="bg-red-600 h-full w-[100vw] flex-shrink-0"></section>
      </div>

      {/* Floor */}
      <section className="bg-green-600 h-[20vh] w-[200vw] flex-shrink-0"></section>
    </main>
  );
}
