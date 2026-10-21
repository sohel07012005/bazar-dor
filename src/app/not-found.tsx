import Link from 'next/link'


const NotFound = () => {
    return (

      <div className="flex text-3xl font-bold flex-col items-center justify-center h-screen gap-3">
      <h2>404</h2>
      <h2>Not Found !!</h2>
      <Link href="/"><button className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md">Return Home</button></Link>
    </div>
        
    );
};

export default NotFound;